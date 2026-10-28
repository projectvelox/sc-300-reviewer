/* Dashboard, results and history pages, plus the router. */
(function () {
  "use strict";

  const App = window.App;
  const { h, clear, fmt, icon, dialog, formatSpan, formatDate, percent, store, uid } = App;
  const E = App.engine;
  const D = E.data;

  const COUNT_OPTIONS = [10, 30, 50, 100, "all"];
  const DEFAULT_PREFS = { mode: "exam", count: 50, pool: "all", shuffle: true, timed: true, noReturn: true };

  /* ---------- Page chrome ---------- */

  function page(active, ...content) {
    const link = (hash, label, key) => h("a", { href: hash, class: "site-nav__link" + (active === key ? " is-active" : ""), "aria-current": active === key ? "page" : null }, label);
    return h("div", { class: "site" },
      h("header", { class: "site-header" },
        h("div", { class: "site-header__inner" },
          h("a", { href: "#/", class: "brand" }, h("strong", null, D.exam.code), h("span", null, "Practice Exam")),
          h("nav", { class: "site-nav", "aria-label": "Main" }, link("#/", "Dashboard", "home"), link("#/history", "History", "history")))),
      h("main", { class: "page", id: "page-main", tabindex: "-1" }, content),
      h("footer", { class: "site-footer" },
        h("p", null, "Unofficial practice reviewer for exam " + D.exam.code + ". Not affiliated with or endorsed by Microsoft. Questions and answer keys are taken from the reference material supplied with this reviewer.")));
  }

  function modeLabel(mode) { return mode === "exam" ? "Exam mode" : "Reviewer mode"; }
  function perQuestionText() {
    const sec = D.exam.secondsPerQuestion;
    if (sec % 60 !== 0) return sec + " seconds";
    return sec / 60 === 1 ? "One minute" : sec / 60 === 2 ? "Two minutes" : sec / 60 + " minutes";
  }
  function sizeLabel(a) { return a.size + (a.size === 1 ? " question" : " questions"); }

  /** Horizontal accuracy meter: the fill is the value, the track is a lighter step of the same hue. */
  function meter(pct, label) {
    return h("div", { class: "meter", role: "img", "aria-label": label + ": " + pct + " percent" },
      h("div", { class: "meter__fill", style: "width:" + Math.max(0, Math.min(100, pct)) + "%" }),
      h("div", { class: "meter__pass", style: "left:" + D.exam.passPercent + "%" }));
  }

  function bucketTable(rows, firstHeading) {
    return h("div", { class: "table-wrap" },
      h("table", { class: "data-table data-table--rows" },
        h("thead", null, h("tr", null,
          h("th", { scope: "col" }, firstHeading), h("th", { scope: "col", class: "is-num" }, "Correct"),
          h("th", { scope: "col", class: "is-num" }, "Accuracy"), h("th", { scope: "col", class: "col-meter" }, h("span", { class: "sr-only" }, "Accuracy bar")))),
        h("tbody", null, rows.map((r) => h("tr", null,
          h("th", { scope: "row", class: "row-head" }, r.label),
          h("td", { class: "is-num" }, r.correct + " / " + r.total),
          h("td", { class: "is-num" }, r.percent + "%"),
          h("td", { class: "col-meter" }, meter(r.percent, r.label)))))));
  }

  /* ---------- Dashboard ---------- */

  function dashboard(mount) {
    const prefs = Object.assign({}, DEFAULT_PREFS, store.get("prefs", {}));
    const active = E.loadSession();
    const summary = E.historySummary();
    const pools = E.poolCounts();
    const formId = uid("setup");

    const info = h("p", { class: "banner banner--info", role: "status", hidden: true });
    const outline = h("p", { class: "setup__outline" });
    const startBtn = h("button", { type: "submit", class: "btn btn--primary btn--large" }, "Start");

    function refresh() {
      const available = E.availableCount(prefs.pool);
      const size = prefs.count === "all" ? available : Math.min(prefs.count, available);
      clear(info);
      info.hidden = true;
      if (available === 0) {
        info.hidden = false;
        info.append(icon("info"), prefs.pool === "missed"
          ? "There are no questions that you missed on your last attempt. Choose another question pool."
          : "You have attempted every question in the bank. Choose another question pool.");
      } else if (prefs.count !== "all" && prefs.count > available) {
        info.hidden = false;
        info.append(icon("info"), "The " + (prefs.pool === "all" ? "question bank" : "selected pool") + " contains " + available + " questions. A " + prefs.count + "-question session will include all " + available + ". No question is repeated.");
      }
      startBtn.disabled = available === 0;
      startBtn.textContent = prefs.mode === "exam" ? "Start exam" : "Start reviewer session";
      const parts = [size + (size === 1 ? " question" : " questions"), modeLabel(prefs.mode)];
      if (prefs.mode === "exam") parts.push(prefs.timed ? "Time limit " + formatSpan(size * D.exam.secondsPerQuestion) : "Not timed");
      outline.textContent = available === 0 ? "" : parts.join(" · ");
      form.querySelectorAll("[data-exam-only]").forEach((el) => {
        el.classList.toggle("is-disabled", prefs.mode !== "exam");
        el.querySelector("input").disabled = prefs.mode !== "exam";
      });
    }

    const set = (key, value) => { prefs[key] = value; store.set("prefs", prefs); refresh(); };

    const radioCard = (name, value, title, text) => {
      const id = uid("r");
      const input = h("input", { type: "radio", name, id, value: String(value), checked: prefs[name] === value });
      input.addEventListener("change", () => set(name, value));
      return h("label", { class: "option-card", for: id }, input,
        h("span", { class: "option-card__body" }, h("span", { class: "option-card__title" }, title), text ? h("span", { class: "option-card__text" }, text) : null));
    };

    const check = (key, title, text, examOnly) => {
      const id = uid("c");
      const input = h("input", { type: "checkbox", id, checked: !!prefs[key] });
      input.addEventListener("change", () => set(key, input.checked));
      return h("label", { class: "check-row", for: id, "data-exam-only": examOnly ? "1" : null }, input,
        h("span", null, h("span", { class: "check-row__title" }, title), text ? h("span", { class: "check-row__text" }, text) : null));
    };

    const poolId = uid("pool");
    const poolSelect = h("select", { class: "select", id: poolId },
      h("option", { value: "all" }, "All questions (" + pools.all + ")"),
      h("option", { value: "unseen" }, "Not yet attempted (" + pools.unseen + ")"),
      h("option", { value: "missed" }, "Missed on last attempt (" + pools.missed + ")"));
    poolSelect.value = prefs.pool;
    poolSelect.addEventListener("change", () => set("pool", poolSelect.value));

    const form = h("form", { class: "setup", id: formId, "aria-labelledby": formId + "-title" },
      h("h2", { class: "section-title", id: formId + "-title" }, "Start a session"),
      h("fieldset", { class: "field" }, h("legend", { class: "field__label" }, "Mode"),
        h("div", { class: "option-grid option-grid--two" },
          radioCard("mode", "exam", "Exam mode", "Simulates the exam. No feedback until you submit. Results and explanations follow submission."),
          radioCard("mode", "review", "Reviewer mode", "Check each answer as you go. Shows the correct answer and a full explanation after every question."))),
      h("fieldset", { class: "field" }, h("legend", { class: "field__label" }, "Number of questions"),
        h("div", { class: "option-grid option-grid--five" }, COUNT_OPTIONS.map((c) =>
          radioCard("count", c, c === "all" ? "All (" + pools.all + ")" : String(c)))),
        info),
      h("div", { class: "field" }, h("label", { class: "field__label", for: poolId }, "Question pool"), poolSelect,
        h("p", { class: "field__help" }, "Pools use your question history on this device. A missed question is one that was incorrect or unanswered the last time it was scored. Scenario sets are always kept together.")),
      h("fieldset", { class: "field" }, h("legend", { class: "field__label" }, "Options"),
        check("shuffle", "Randomize question order", "Scenario sets stay together and in their original order. Answer choices are never reordered."),
        check("timed", "Timed exam", perQuestionText() + " per question. The exam is submitted when time runs out.", true),
        check("noReturn", "Enforce the no-return rule on scenario sets", "As stated in the exam, you cannot go back to a scenario-set question after leaving it.", true)),
      h("div", { class: "setup__actions" }, startBtn, outline));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (E.loadSession()) {
        const ok = await dialog({
          title: "Replace the session in progress?",
          body: "You have a session in progress. Starting a new one discards it without saving a score.",
          actions: [{ label: "Cancel", value: false, kind: "secondary" }, { label: "Discard and start new", value: true, kind: "danger" }]
        });
        if (!ok) return;
        E.clearSession();
      }
      const session = E.createSession(prefs);
      if (!session.order.length) return;
      E.saveSession(session);
      App.go("#/exam");
    });

    let resume = null;
    if (active) {
      const done = active.order.filter((id) => E.answerState(E.byId.get(id), active.answers[id]) === "complete").length;
      resume = h("section", { class: "notice", "aria-label": "Session in progress" },
        h("div", null,
          h("h2", { class: "notice__title" }, "Session in progress"),
          h("p", null, modeLabel(active.mode) + " · " + active.order.length + " questions · " + done + " answered · " +
            (active.begun ? formatSpan(active.elapsedSec) + " elapsed" : "not started"))),
        h("div", { class: "notice__actions" },
          h("button", { type: "button", class: "btn btn--primary", onclick: () => App.go("#/exam") }, "Resume"),
          h("button", { type: "button", class: "btn btn--secondary", onclick: async () => {
            const ok = await dialog({
              title: "Discard this session?",
              body: "The session is removed and no score is saved.",
              actions: [{ label: "Cancel", value: false, kind: "secondary" }, { label: "Discard", value: true, kind: "danger" }]
            });
            if (ok) { E.clearSession(); App.route(); }
          } }, "Discard")));
    }

    const stat = (label, value) => h("div", null, h("dt", null, label), h("dd", null, value));
    const perf = h("section", { class: "panel", "aria-labelledby": "perf-title" },
      h("h2", { class: "section-title", id: "perf-title" }, "Your performance"),
      summary.count
        ? [h("dl", { class: "stat-grid" },
            stat("Attempts", String(summary.count)),
            stat("Average score", summary.average + "%"),
            stat("Best score", summary.best + "%"),
            stat("Most recent", summary.latest.percent + "%")),
          h("p", { class: "muted" }, "Most recent: " + formatDate(summary.latest.finishedAt) + ", " + modeLabel(summary.latest.mode) + ", " + summary.latest.correct + " / " + summary.latest.size + "."),
          h("a", { class: "btn btn--secondary", href: "#/history" }, "View history")]
        : h("p", { class: "muted" }, "No completed sessions yet. Your scores, accuracy by skill area and question history appear here after your first session."));

    const typeCounts = {};
    D.questions.forEach((q) => { typeCounts[q.type] = (typeCounts[q.type] || 0) + 1; });
    const bank = h("section", { class: "panel", "aria-labelledby": "bank-title" },
      h("h2", { class: "section-title", id: "bank-title" }, "Question bank"),
      h("dl", { class: "kv" },
        h("div", null, h("dt", null, "Questions"), h("dd", null, String(D.questions.length))),
        Object.keys(E.TYPE_LABELS).filter((t) => typeCounts[t]).map((t) => h("div", null, h("dt", null, E.TYPE_LABELS[t]), h("dd", null, String(typeCounts[t])))),
        h("div", null, h("dt", null, "Scenario sets"), h("dd", null, String(Object.keys(D.cases).length)))),
      store.available() ? null : h("p", { class: "banner banner--warn" }, icon("warn"), "This browser is blocking local storage. Sessions will work, but history cannot be saved."));

    mount.appendChild(page("home",
      h("div", { class: "page__head" },
        h("p", { class: "page__kicker" }, "Exam " + D.exam.code),
        h("h1", { class: "page__title" }, D.exam.title)),
      resume,
      h("div", { class: "columns" }, h("div", { class: "columns__main" }, form), h("div", { class: "columns__side" }, perf, bank))));
    refresh();
  }

  /* ---------- Results ---------- */

  function results(mount, attemptId) {
    const a = E.getAttempt(attemptId);
    if (!a) { App.go("#/history"); return; }
    const passed = a.percent >= D.exam.passPercent;
    const isExam = a.mode === "exam";
    const domains = E.rankBuckets(a.domains, D.domains).sort((x, y) => y.total - x.total);
    const topics = E.rankBuckets(a.topics);

    const retake = () => {
      const session = E.createSession(a.config || { mode: a.mode, count: a.requested, pool: "all", shuffle: false, timed: !!a.timeLimitSec, noReturn: true }, a.order);
      E.saveSession(session);
      App.go("#/exam");
    };
    const guarded = (fn) => async () => {
      if (E.loadSession()) {
        const ok = await dialog({
          title: "Replace the session in progress?",
          body: "You have a session in progress. Starting a new one discards it without saving a score.",
          actions: [{ label: "Cancel", value: false, kind: "secondary" }, { label: "Discard and continue", value: true, kind: "danger" }]
        });
        if (!ok) return;
        E.clearSession();
      }
      fn();
    };

    const stat = (label, value) => h("div", null, h("dt", null, label), h("dd", null, value));
    const statusNote = a.status === "Timed out" ? "Submitted automatically when time expired."
      : a.status === "Abandoned" ? "This session was ended without submitting. It does not count toward your average." : null;

    const rows = a.order.map((id, i) => {
      const q = E.byId.get(id);
      const r = a.results[id];
      const text = r.status === "correct" ? "Correct" : r.status === "incorrect" ? "Incorrect" : "Unanswered";
      return h("tr", null,
        h("td", { class: "col-num" }, String(i + 1)),
        h("td", null, h("a", { href: "#/review/" + a.id + "/all/" + (i + 1) }, E.summaryLine(q))),
        h("td", null, q.topic),
        h("td", null, h("span", { class: "status status--" + r.status }, icon(r.status === "correct" ? "check" : r.status === "incorrect" ? "close" : "dash", { size: 14 }), text)),
        h("td", { class: "is-num" }, r.points + " / " + r.max),
        h("td", null, a.flags && a.flags[id] ? h("span", { class: "status status--flag" }, icon("flag", { size: 14 }), "Marked") : h("span", { class: "muted" }, "—")));
    });

    mount.appendChild(page(null,
      h("div", { class: "page__head" },
        h("p", { class: "page__kicker" }, modeLabel(a.mode) + " · " + formatDate(a.finishedAt)),
        h("h1", { class: "page__title" }, isExam ? "Exam results" : "Session results")),
      h("section", { class: "score", "aria-label": "Score summary" },
        h("div", { class: "score__main" },
          h("p", { class: "score__value" }, a.percent + "%"),
          h("p", { class: "score__count" }, a.correct + " of " + a.size + " questions correct"),
          a.status === "Abandoned" ? null : h("p", { class: "score__verdict score__verdict--" + (passed ? "pass" : "fail") },
            icon(passed ? "check" : "close", { size: 18 }),
            passed ? "At or above the " + D.exam.passPercent + "% pass mark" : "Below the " + D.exam.passPercent + "% pass mark"),
          statusNote ? h("p", { class: "muted" }, statusNote) : null),
        h("dl", { class: "stat-grid stat-grid--wide" },
          stat("Correct", String(a.correct)),
          stat("Incorrect", String(a.incorrect)),
          stat("Unanswered", String(a.unanswered)),
          stat("Time spent", formatSpan(a.durationSec)),
          stat("Points", a.points + " / " + a.maxPoints),
          stat("Status", a.status))),
      h("p", { class: "muted score__footnote" }, "The pass mark is a practice target. Microsoft reports a scaled score from 1 to 1,000 with 700 required to pass, which is not a simple percentage. Points count one for each correct selection, as stated on the questions."),
      h("div", { class: "action-row" },
        h("a", { class: "btn btn--primary", href: "#/review/" + a.id + "/all" }, "Review answers"),
        a.incorrect + a.unanswered > 0 ? h("a", { class: "btn btn--secondary", href: "#/review/" + a.id + "/" + (a.incorrect ? "incorrect" : "unanswered") }, a.incorrect ? "Review incorrect (" + a.incorrect + ")" : "Review unanswered (" + a.unanswered + ")") : null,
        h("button", { type: "button", class: "btn btn--secondary", onclick: guarded(retake) }, isExam ? "Retake exam" : "Retake session"),
        h("a", { class: "btn btn--secondary", href: "#/" }, isExam ? "Start new exam" : "Start new session"),
        h("a", { class: "btn btn--subtle", href: "#/" }, "Return to dashboard")),
      h("section", { class: "panel", "aria-labelledby": "res-domain" },
        h("h2", { class: "section-title", id: "res-domain" }, "Performance by skill area"),
        bucketTable(domains, "Skill area")),
      h("section", { class: "panel", "aria-labelledby": "res-topic" },
        h("h2", { class: "section-title", id: "res-topic" }, "Performance by topic"),
        bucketTable(topics, "Topic")),
      h("section", { class: "panel", "aria-labelledby": "res-questions" },
        h("h2", { class: "section-title", id: "res-questions" }, "Questions"),
        h("div", { class: "table-wrap" },
          h("table", { class: "data-table data-table--rows" },
            h("thead", null, h("tr", null,
              h("th", { scope: "col", class: "col-num" }, "No."), h("th", { scope: "col" }, "Question"), h("th", { scope: "col" }, "Topic"),
              h("th", { scope: "col" }, "Result"), h("th", { scope: "col", class: "is-num" }, "Points"), h("th", { scope: "col" }, "Marked"))),
            h("tbody", null, rows))))));
  }

  /* ---------- History ---------- */

  function trendChart(container, attempts) {
    const data = attempts.slice(-20);
    const tip = h("div", { class: "chart-tip", hidden: true });
    const holder = h("div", { class: "chart__plot" });
    container.append(holder, tip);

    function draw() {
      const width = Math.max(260, holder.clientWidth);
      const height = 220;
      const m = { top: 16, right: 48, bottom: 30, left: 40 };
      const iw = width - m.left - m.right;
      const ih = height - m.top - m.bottom;
      const x = (i) => m.left + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
      const y = (v) => m.top + ih - (v / 100) * ih;
      const ns = "http://www.w3.org/2000/svg";
      const el = (name, attrs, text) => {
        const node = document.createElementNS(ns, name);
        Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
        if (text !== undefined) node.textContent = text;
        return node;
      };
      const svg = el("svg", { width, height, viewBox: "0 0 " + width + " " + height, role: "img", "aria-label": "Score for each of the last " + data.length + " completed sessions, oldest to newest. Values are listed in the Previous attempts table." });

      [0, 25, 50, 75, 100].forEach((v) => {
        svg.appendChild(el("line", { x1: m.left, x2: width - m.right, y1: y(v), y2: y(v), class: "chart__grid" }));
        svg.appendChild(el("text", { x: m.left - 8, y: y(v) + 4, "text-anchor": "end", class: "chart__tick" }, v + "%"));
      });
      const passY = y(D.exam.passPercent);
      svg.appendChild(el("line", { x1: m.left, x2: width - m.right, y1: passY, y2: passY, class: "chart__pass" }));
      svg.appendChild(el("text", { x: width - m.right + 6, y: passY + 4, class: "chart__tick" }, "Pass"));

      svg.appendChild(el("text", { x: x(0), y: height - 8, "text-anchor": data.length === 1 ? "middle" : "start", class: "chart__tick" }, formatDate(data[0].finishedAt, false)));
      if (data.length > 1) svg.appendChild(el("text", { x: x(data.length - 1), y: height - 8, "text-anchor": "end", class: "chart__tick" }, formatDate(data[data.length - 1].finishedAt, false)));

      if (data.length > 1) {
        svg.appendChild(el("path", { d: data.map((a, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(a.percent).toFixed(1)).join(" "), class: "chart__line" }));
      }
      data.forEach((a, i) => {
        svg.appendChild(el("circle", { cx: x(i), cy: y(a.percent), r: 5, class: "chart__dot" }));
      });
      // Label only the latest point, in the right margin so it never sits on the line.
      const last = data[data.length - 1];
      let labelY = y(last.percent) + 4;
      if (Math.abs(labelY - (passY + 4)) < 14) labelY = passY + 4 + (last.percent >= D.exam.passPercent ? -14 : 14);
      svg.appendChild(el("text", { x: x(data.length - 1) + 9, y: labelY, class: "chart__label" }, last.percent + "%"));

      // Hit targets larger than the marks, with a tooltip on hover and focus.
      data.forEach((a, i) => {
        const hit = el("circle", { cx: x(i), cy: y(a.percent), r: 14, class: "chart__hit", tabindex: "0", role: "img",
          "aria-label": formatDate(a.finishedAt) + ", " + modeLabel(a.mode) + ", " + a.percent + " percent, " + a.correct + " of " + a.size + " correct" });
        const show = () => {
          clear(tip);
          tip.append(h("strong", null, a.percent + "% (" + a.correct + " / " + a.size + ")"), h("span", null, formatDate(a.finishedAt)), h("span", null, modeLabel(a.mode)));
          tip.hidden = false;
          const left = Math.max(4, Math.min(width - tip.offsetWidth - 4, x(i) - tip.offsetWidth / 2));
          tip.style.left = left + "px";
          tip.style.top = Math.max(0, y(a.percent) - tip.offsetHeight - 12) + "px";
        };
        const hide = () => { tip.hidden = true; };
        hit.addEventListener("pointerenter", show);
        hit.addEventListener("pointerleave", hide);
        hit.addEventListener("focus", show);
        hit.addEventListener("blur", hide);
        svg.appendChild(hit);
      });

      clear(holder).appendChild(svg);
    }

    draw();
    if (window.ResizeObserver) {
      let lastWidth = holder.clientWidth;
      const ro = new ResizeObserver(() => {
        if (Math.abs(holder.clientWidth - lastWidth) < 2) return;
        lastWidth = holder.clientWidth;
        draw();
      });
      ro.observe(holder);
      App.onDispose(() => ro.disconnect());
    }
  }

  function history(mount) {
    const s = E.historySummary();
    const stats = E.loadStats();
    const stat = (label, value) => h("div", null, h("dt", null, label), h("dd", null, value));

    if (!s.attempts.length) {
      mount.appendChild(page("history",
        h("div", { class: "page__head" }, h("h1", { class: "page__title" }, "Performance history")),
        h("section", { class: "panel" },
          h("p", null, "No sessions have been recorded on this device yet."),
          h("p", { class: "muted" }, "Complete an exam or reviewer session to see your scores, your accuracy by skill area and topic, and the questions you have missed."),
          h("a", { class: "btn btn--primary", href: "#/" }, "Start a session"))));
      return;
    }

    const domains = E.rankBuckets(s.domains, D.domains);
    const topics = E.rankBuckets(s.topics);
    const ranked = topics.filter((t) => t.total >= 3);
    const weakest = ranked.slice(0, 3);
    const strongest = ranked.slice().reverse().slice(0, 3).filter((t) => !weakest.includes(t));

    const chartBox = h("div", { class: "chart" });
    const trendPanel = h("section", { class: "panel", "aria-labelledby": "h-trend" },
      h("h2", { class: "section-title", id: "h-trend" }, "Score trend"),
      s.count >= 2
        ? [h("p", { class: "muted" }, "Score for each of your last " + Math.min(20, s.count) + " completed sessions, oldest to newest."), chartBox]
        : h("p", { class: "muted" }, "Complete at least two sessions to see a trend."));

    const attemptsRows = s.attempts.slice().reverse().map((a) => h("tr", null,
      h("td", null, formatDate(a.finishedAt)),
      h("td", null, modeLabel(a.mode)),
      h("td", { class: "is-num" }, String(a.size)),
      h("td", { class: "is-num" }, a.correct + " / " + a.size),
      h("td", { class: "is-num" }, a.percent + "%"),
      h("td", { class: "is-num" }, String(a.correct)),
      h("td", { class: "is-num" }, String(a.incorrect)),
      h("td", { class: "is-num" }, String(a.unanswered)),
      h("td", { class: "is-num" }, formatSpan(a.durationSec)),
      h("td", null, a.status),
      h("td", null, h("a", { href: "#/results/" + a.id }, "View"))));

    const attempted = D.questions.filter((q) => stats[q.id] && stats[q.id].attempts);
    const lastMissed = attempted.filter((q) => stats[q.id].lastStatus !== "correct");
    const lastRight = attempted.filter((q) => stats[q.id].lastStatus === "correct");
    const questionRows = attempted
      .slice().sort((a, b) => (stats[b.id].incorrect || 0) - (stats[a.id].incorrect || 0) || a.source - b.source)
      .map((q) => {
        const st = stats[q.id];
        const last = st.lastStatus === "correct" ? "Correct" : st.lastStatus === "incorrect" ? "Incorrect" : "Unanswered";
        return h("tr", null,
          h("td", { class: "col-num" }, String(q.source)),
          h("td", null, E.summaryLine(q)),
          h("td", null, q.topic),
          h("td", { class: "is-num" }, String(st.attempts)),
          h("td", { class: "is-num" }, String(st.correct || 0)),
          h("td", { class: "is-num" }, String(st.incorrect || 0)),
          h("td", null, h("span", { class: "status status--" + st.lastStatus }, icon(st.lastStatus === "correct" ? "check" : st.lastStatus === "incorrect" ? "close" : "dash", { size: 14 }), last)),
          h("td", null, st.reviewed ? "Yes" : "No"));
      });

    const focusList = (items) => h("ul", { class: "plain-list" }, items.map((t) => h("li", null, t.label + " — " + t.percent + "% (" + t.correct + " / " + t.total + ")")));

    mount.appendChild(page("history",
      h("div", { class: "page__head" }, h("h1", { class: "page__title" }, "Performance history")),
      h("section", { class: "panel", "aria-label": "Summary" },
        h("dl", { class: "stat-grid stat-grid--wide" },
          stat("Completed attempts", String(s.count)),
          stat("Average score", s.average === null ? "—" : s.average + "%"),
          stat("Best score", s.best === null ? "—" : s.best + "%"),
          stat("Most recent score", s.latest ? s.latest.percent + "%" : "—"),
          stat("Questions answered", String(s.answered)),
          stat("Bank coverage", attempted.length + " / " + D.questions.length))),
      trendPanel,
      s.count ? h("section", { class: "panel", "aria-labelledby": "h-domain" },
        h("h2", { class: "section-title", id: "h-domain" }, "Accuracy by skill area"),
        h("p", { class: "muted" }, "All completed sessions combined. The marker on each bar is the " + D.exam.passPercent + "% pass mark."),
        bucketTable(domains.slice().sort((a, b) => b.total - a.total), "Skill area")) : null,
      s.count ? h("section", { class: "panel", "aria-labelledby": "h-topic" },
        h("h2", { class: "section-title", id: "h-topic" }, "Accuracy by topic"),
        weakest.length ? h("div", { class: "columns columns--even" },
          h("div", null, h("h3", { class: "sub-title" }, "Weakest topics"), focusList(weakest)),
          strongest.length ? h("div", null, h("h3", { class: "sub-title" }, "Strongest topics"), focusList(strongest)) : null) : null,
        bucketTable(topics, "Topic")) : null,
      h("section", { class: "panel", "aria-labelledby": "h-attempts" },
        h("h2", { class: "section-title", id: "h-attempts" }, "Previous attempts"),
        h("div", { class: "table-wrap", tabindex: "0", role: "region", "aria-label": "Previous attempts" },
          h("table", { class: "data-table data-table--rows" },
            h("thead", null, h("tr", null,
              h("th", { scope: "col" }, "Date"), h("th", { scope: "col" }, "Mode"), h("th", { scope: "col", class: "is-num" }, "Questions"),
              h("th", { scope: "col", class: "is-num" }, "Score"), h("th", { scope: "col", class: "is-num" }, "Percent"),
              h("th", { scope: "col", class: "is-num" }, "Correct"), h("th", { scope: "col", class: "is-num" }, "Incorrect"),
              h("th", { scope: "col", class: "is-num" }, "Unanswered"), h("th", { scope: "col", class: "is-num" }, "Time"),
              h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, h("span", { class: "sr-only" }, "Open")))),
            h("tbody", null, attemptsRows)))),
      h("section", { class: "panel", "aria-labelledby": "h-questions" },
        h("h2", { class: "section-title", id: "h-questions" }, "Question history"),
        h("dl", { class: "stat-grid stat-grid--wide" },
          stat("Attempted", attempted.length + " / " + D.questions.length),
          stat("Correct on last attempt", String(lastRight.length)),
          stat("Missed on last attempt", String(lastMissed.length)),
          stat("Not yet attempted", String(D.questions.length - attempted.length))),
        questionRows.length ? h("details", { class: "disclosure" },
          h("summary", null, "Show all attempted questions (" + questionRows.length + ")"),
          h("div", { class: "table-wrap", tabindex: "0", role: "region", "aria-label": "Question history" },
            h("table", { class: "data-table data-table--rows" },
              h("thead", null, h("tr", null,
                h("th", { scope: "col", class: "col-num" }, "Source"), h("th", { scope: "col" }, "Question"), h("th", { scope: "col" }, "Topic"),
                h("th", { scope: "col", class: "is-num" }, "Attempts"), h("th", { scope: "col", class: "is-num" }, "Correct"),
                h("th", { scope: "col", class: "is-num" }, "Incorrect"), h("th", { scope: "col" }, "Last result"), h("th", { scope: "col" }, "Reviewed"))),
              h("tbody", null, questionRows)))) : null),
      h("div", { class: "action-row" },
        h("button", { type: "button", class: "btn btn--secondary", onclick: async () => {
          const ok = await dialog({
            title: "Clear all history?",
            body: "This permanently removes every recorded attempt and all question history from this device. A session in progress is not affected.",
            actions: [{ label: "Cancel", value: false, kind: "secondary" }, { label: "Clear history", value: true, kind: "danger" }]
          });
          if (ok) { E.clearHistory(); App.route(); }
        } }, "Clear history"))));

    if (s.count >= 2) trendChart(chartBox, s.completed);
  }

  /* ---------- Router ---------- */

  let disposers = [];
  App.onDispose = (fn) => disposers.push(fn);

  function route() {
    disposers.forEach((fn) => { try { fn(); } catch (e) { /* view already gone */ } });
    disposers = [];
    document.querySelectorAll("dialog[open]").forEach((d) => { d.close(); d.remove(); });

    const mount = clear(document.getElementById("app"));
    const parts = (window.location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
    const view = parts[0] || "home";
    document.body.classList.toggle("is-exam", view === "exam" || view === "review");

    if (view === "exam") { document.title = D.exam.shortTitle; App.exam.liveExam(mount); }
    else if (view === "review" && parts[1]) { document.title = "Answer review — " + D.exam.code; App.exam.answerReview(mount, parts[1], parts[2], Number(parts[3]) || 0); }
    else if (view === "results" && parts[1]) { document.title = "Results — " + D.exam.code; results(mount, parts[1]); }
    else if (view === "history") { document.title = "History — " + D.exam.code; history(mount); }
    else { document.title = D.exam.shortTitle; dashboard(mount); }

    if (view !== "exam" && view !== "review") window.scrollTo(0, 0);
  }

  App.route = route;
  App.go = (hash) => { if (window.location.hash === hash) route(); else window.location.hash = hash; };

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", () => {
    // The skip link must not change the hash, which is the router's state.
    const skip = document.querySelector(".skip-link");
    if (skip) {
      skip.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("exam-main") || document.getElementById("page-main");
        if (target) target.focus();
      });
    }
    route();
  });
})();
