/* Question bank access, session building, grading and history. No DOM here. */
(function () {
  "use strict";

  const App = window.App;
  const D = window.EXAM;
  const { store, plain, percent } = App;

  const byId = new Map(D.questions.map((q) => [q.id, q]));
  const MAX_ATTEMPTS_STORED = 200;

  /* ---------- Answer key ---------- */

  /** The answer key is always the one printed in the reference PDF. */
  function keyOf(q) {
    return q.answer;
  }

  /** A simulation has no selectable answer. The user records one of these. */
  const SIM_CHOICES = [["can", "I can complete this task"], ["cannot", "I cannot complete this task"]];

  /* ---------- Answer state ---------- */

  function emptyAnswer(q) {
    switch (q.type) {
      case "single": case "multi": case "order": case "simulation": return [];
      case "yesno": return q.statements.map(() => null);
      default: return {};
    }
  }

  function slotIds(q) {
    return q.type === "dropdown" ? q.fields.map((f) => f.id) : q.targets.map((t) => t.id);
  }

  /** "none" | "partial" | "complete" */
  function answerState(q, a) {
    if (a === undefined || a === null) return "none";
    let filled = 0;
    let needed = 1;
    switch (q.type) {
      case "single": filled = a.length; needed = 1; break;
      case "multi": filled = a.length; needed = keyOf(q).length; break;
      case "order": filled = a.length; needed = keyOf(q).length; break;
      case "simulation": filled = a.length; needed = 1; break;
      case "yesno": filled = a.filter((v) => v !== null && v !== undefined).length; needed = q.statements.length; break;
      default: {
        const ids = slotIds(q);
        filled = ids.filter((id) => a[id] !== undefined && a[id] !== null).length;
        needed = ids.length;
      }
    }
    if (filled === 0) return "none";
    return filled >= needed ? "complete" : "partial";
  }

  /* ---------- Grading ---------- */

  /**
   * Returns { status, points, max, parts }.
   * status: "correct" | "incorrect" | "unanswered".
   * points follow the exam rule printed on the questions: one point per
   * correct selection where the question says so, otherwise one point.
   */
  function grade(q, a, keyOverride) {
    const key = keyOverride || keyOf(q);
    const state = answerState(q, a);
    let parts = [];
    let max = 1;
    let points = 0;

    switch (q.type) {
      case "single":
        parts = [state !== "none" && a[0] === key[0]];
        points = parts[0] ? 1 : 0;
        break;
      case "multi": {
        max = key.length;
        const chosen = state === "none" ? [] : a;
        parts = key.map((k) => chosen.includes(k));
        points = chosen.filter((k) => key.includes(k)).length;
        if (chosen.length !== key.length) parts.push(false);
        break;
      }
      case "order": {
        const same = state !== "none" && a.length === key.length && a.every((v, i) => v === key[i]);
        parts = [same];
        points = same ? 1 : 0;
        break;
      }
      case "simulation":
        // A lab task cannot be checked here. It is scored from the user's own assessment.
        parts = [state !== "none" && a[0] === "can"];
        points = parts[0] ? 1 : 0;
        break;
      case "yesno":
        max = key.length;
        parts = key.map((k, i) => state !== "none" && a[i] === k);
        points = parts.filter(Boolean).length;
        break;
      default: {
        const ids = slotIds(q);
        max = ids.length;
        parts = ids.map((id) => state !== "none" && a[id] === key[id]);
        points = parts.filter(Boolean).length;
      }
    }

    const allRight = parts.length > 0 && parts.every(Boolean);
    const status = state === "none" ? "unanswered" : allRight ? "correct" : "incorrect";
    return { status, points, max, parts };
  }

  /* ---------- Human-readable answers ---------- */

  function labelled(label, value) {
    const text = plain(label);
    if (text.includes("[answer choice]")) return text.replace("[answer choice]", value);
    return text.replace(/:\s*$/, "") + ": " + value;
  }

  function describe(q, a, useKey) {
    const value = useKey ? keyOf(q) : a;
    if (!useKey && answerState(q, a) === "none") return [];
    if (q.type === "simulation") {
      if (useKey) return ["See the reference solution."];
      const choice = SIM_CHOICES.find((c) => c[0] === a[0]);
      return choice ? [choice[1]] : [];
    }
    switch (q.type) {
      case "single": case "multi":
        return value.slice().sort().map((k) => {
          const opt = q.options.find((o) => o.key === k);
          return k + (opt && opt.text ? ". " + plain(opt.text) : "");
        });
      case "order":
        return value.map((idx, i) => (i + 1) + ". " + plain(q.items[idx]));
      case "yesno":
        return q.statements.map((s, i) => {
          const v = value[i];
          return "Statement " + (i + 1) + ": " + (v === true ? "Yes" : v === false ? "No" : "Not answered");
        });
      case "dropdown":
        return q.fields.map((f) => labelled(f.label, value[f.id] === undefined || value[f.id] === null ? "Not answered" : f.options[value[f.id]]));
      default:
        return q.targets.map((t) => labelled(t.label, value[t.id] === undefined || value[t.id] === null ? "Not answered" : q.sources[value[t.id]]));
    }
  }

  /** Short one-line label for lists and tables. */
  function summaryLine(q) {
    const firstText = q.stem.find((b) => typeof b === "string") || "";
    const base = q.caseId ? D.cases[q.caseId].shortTitle + " — " + plain(firstText) : plain(firstText);
    return base.length > 150 ? base.slice(0, 147).trimEnd() + "…" : base;
  }

  const TYPE_LABELS = {
    single: "Multiple choice",
    multi: "Multiple response",
    yesno: "Hotspot (Yes/No)",
    dropdown: "Hotspot (drop-down)",
    order: "Drag and drop (sequence)",
    dragdrop: "Drag and drop (match)",
    simulation: "Simulation (lab task)"
  };

  /* ---------- Question-level history ---------- */

  function loadStats() { return store.get("qstats", {}); }

  function poolIds(pool) {
    const stats = loadStats();
    return D.questions.filter((q) => {
      const s = stats[q.id];
      if (pool === "unseen") return !s || !s.attempts;
      if (pool === "missed") return !!s && !!s.attempts && s.lastStatus !== "correct";
      return true;
    }).map((q) => q.id);
  }

  function poolCounts() {
    return { all: D.questions.length, unseen: poolIds("unseen").length, missed: poolIds("missed").length };
  }

  /* ---------- Session building ---------- */

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Groups questions into units. A stand-alone question is a unit of one.
   * A scenario set is one unit containing all of its questions in case order,
   * so randomization can never separate a set or reorder it.
   */
  function buildUnits(eligibleIds) {
    const eligible = new Set(eligibleIds);
    const units = [];
    const seenCases = new Set();
    D.questions.forEach((q) => {
      if (!q.caseId) {
        if (eligible.has(q.id)) units.push([q.id]);
        return;
      }
      if (seenCases.has(q.caseId)) return;
      seenCases.add(q.caseId);
      const members = D.questions.filter((x) => x.caseId === q.caseId).sort((x, y) => x.caseOrder - y.caseOrder);
      if (members.some((m) => eligible.has(m.id))) units.push(members.map((m) => m.id));
    });
    return units;
  }

  function availableCount(pool) {
    return buildUnits(poolIds(pool)).reduce((n, u) => n + u.length, 0);
  }

  function selectOrder(config) {
    let units = buildUnits(poolIds(config.pool));
    if (config.shuffle) units = shuffle(units);
    const available = units.reduce((n, u) => n + u.length, 0);
    const target = config.count === "all" ? available : Math.min(config.count, available);
    const order = [];
    const skipped = [];
    units.forEach((unit) => {
      if (order.length + unit.length <= target) order.push(...unit);
      else skipped.push(unit);
    });
    // A set that did not fit whole is never split; top up with single questions only.
    skipped.forEach((unit) => { if (unit.length === 1 && order.length < target) order.push(...unit); });
    return order;
  }

  function createSession(config, fixedOrder) {
    const order = fixedOrder ? fixedOrder.slice() : selectOrder(config);
    const exam = D.exam;
    const timed = config.mode === "exam" && config.timed;
    return {
      id: "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      mode: config.mode,
      requested: config.count,
      pool: config.pool,
      shuffle: !!config.shuffle,
      timed,
      noReturn: config.mode === "exam" && !!config.noReturn,
      timeLimitSec: timed ? order.length * exam.secondsPerQuestion : null,
      order,
      answers: {},
      flags: {},
      checked: {},
      locked: {},
      visited: {},
      caseTab: {},
      index: 0,
      begun: false,
      createdAt: Date.now(),
      startedAt: null,
      elapsedSec: 0,
      keySource: "reference"
    };
  }

  function saveSession(session) { store.set("session", session); }
  function loadSession() {
    const s = store.get("session", null);
    if (!s || !Array.isArray(s.order) || !s.order.every((id) => byId.has(id))) return null;
    return s;
  }
  function clearSession() { store.remove("session"); }

  /* ---------- Attempts ---------- */

  function loadAttempts() {
    return store.get("attempts", [])
      .filter((a) => a && Array.isArray(a.order) && a.order.every((id) => byId.has(id)))
      .sort((a, b) => a.finishedAt - b.finishedAt);
  }

  function tally(order, answers) {
    const results = {};
    const totals = { correct: 0, incorrect: 0, unanswered: 0, points: 0, maxPoints: 0 };
    const domains = {};
    const topics = {};
    order.forEach((id) => {
      const q = byId.get(id);
      const g = grade(q, answers[id]);
      results[id] = { status: g.status, points: g.points, max: g.max };
      totals[g.status] += 1;
      totals.points += g.points;
      totals.maxPoints += g.max;
      [[domains, q.domain], [topics, q.topic]].forEach(([bucket, name]) => {
        if (!bucket[name]) bucket[name] = { correct: 0, total: 0 };
        bucket[name].total += 1;
        if (g.status === "correct") bucket[name].correct += 1;
      });
    });
    return { results, totals, domains, topics };
  }

  /**
   * Closes a session and stores it as an attempt.
   * status: "Completed" | "Timed out" | "Abandoned"
   */
  function finishSession(session, status) {
    const { results, totals, domains, topics } = tally(session.order, session.answers);
    const attempt = {
      id: session.id,
      mode: session.mode,
      requested: session.requested,
      pool: session.pool,
      size: session.order.length,
      startedAt: session.startedAt || session.createdAt,
      finishedAt: Date.now(),
      durationSec: session.elapsedSec,
      timeLimitSec: session.timeLimitSec,
      status,
      correct: totals.correct,
      incorrect: totals.incorrect,
      unanswered: totals.unanswered,
      percent: percent(totals.correct, session.order.length),
      points: totals.points,
      maxPoints: totals.maxPoints,
      domains,
      topics,
      order: session.order.slice(),
      answers: session.answers,
      flags: session.flags,
      results,
      config: { mode: session.mode, count: session.requested, pool: session.pool, shuffle: session.shuffle, timed: session.timed, noReturn: session.noReturn },
      keySource: session.keySource
    };

    const attempts = loadAttempts();
    attempts.push(attempt);
    while (attempts.length > MAX_ATTEMPTS_STORED) attempts.shift();
    store.set("attempts", attempts);

    // Question-level history. For an abandoned session only answered questions count.
    const stats = loadStats();
    session.order.forEach((id) => {
      const r = results[id];
      if (r.status === "unanswered" && status === "Abandoned") return;
      const s = stats[id] || { attempts: 0, correct: 0, incorrect: 0, unanswered: 0, reviewed: false };
      s.attempts += 1;
      s[r.status] = (s[r.status] || 0) + 1;
      s.lastStatus = r.status;
      s.lastAnswer = session.answers[id] === undefined ? null : session.answers[id];
      s.lastAt = attempt.finishedAt;
      if (session.checked[id]) s.reviewed = true;
      stats[id] = s;
    });
    store.set("qstats", stats);
    clearSession();
    return attempt;
  }

  function markReviewed(ids) {
    const stats = loadStats();
    let changed = false;
    ids.forEach((id) => {
      if (stats[id] && !stats[id].reviewed) { stats[id].reviewed = true; changed = true; }
    });
    if (changed) store.set("qstats", stats);
  }

  function getAttempt(id) { return loadAttempts().find((a) => a.id === id) || null; }

  function clearHistory() {
    store.remove("attempts");
    store.remove("qstats");
  }

  /* ---------- History aggregates ---------- */

  function historySummary() {
    const attempts = loadAttempts();
    const completed = attempts.filter((a) => a.status !== "Abandoned");
    const domains = {};
    const topics = {};
    let answered = 0;
    completed.forEach((a) => {
      answered += a.correct + a.incorrect;
      [[domains, a.domains], [topics, a.topics]].forEach(([bucket, src]) => {
        Object.keys(src || {}).forEach((name) => {
          if (!bucket[name]) bucket[name] = { correct: 0, total: 0 };
          bucket[name].correct += src[name].correct;
          bucket[name].total += src[name].total;
        });
      });
    });
    const scores = completed.map((a) => a.percent);
    return {
      attempts,
      completed,
      count: completed.length,
      average: scores.length ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length) : null,
      best: scores.length ? Math.max(...scores) : null,
      latest: completed.length ? completed[completed.length - 1] : null,
      answered,
      domains,
      topics
    };
  }

  function rankBuckets(bucket, labels) {
    return Object.keys(bucket)
      .map((name) => ({ key: name, label: labels ? labels[name] || name : name, correct: bucket[name].correct, total: bucket[name].total, percent: percent(bucket[name].correct, bucket[name].total) }))
      .sort((a, b) => a.percent - b.percent || b.total - a.total);
  }

  App.engine = {
    data: D, byId, keyOf, emptyAnswer, slotIds, answerState, grade, describe, summaryLine, TYPE_LABELS, SIM_CHOICES,
    loadStats, poolCounts, availableCount, createSession, saveSession, loadSession, clearSession,
    loadAttempts, getAttempt, tally, finishSession, markReviewed, clearHistory, historySummary, rankBuckets
  };
})();
