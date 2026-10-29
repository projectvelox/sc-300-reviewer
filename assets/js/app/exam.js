/* The exam shell: live sessions (Exam mode and Reviewer mode) and post-exam answer review. */
(function () {
  "use strict";

  const App = window.App;
  const { h, clear, fmt, icon, dialog, announce, formatDuration, formatSpan, store, uid } = App;
  const E = App.engine;
  const W = App.widgets;
  const D = E.data;

  const WIDE = "(min-width: 900px)";

  /* ---------- Scenario (case) pane ---------- */

  function buildCasePane(caseDef, activeId, onSelect) {
    const panelId = uid("case-panel");
    const tablist = h("div", { class: "tabs", role: "tablist", "aria-label": "Scenario sections" });
    const panel = h("div", { class: "case__panel", role: "tabpanel", id: panelId, tabindex: "0" });
    let current = caseDef.sections.find((s) => s.id === activeId) || caseDef.sections[0];

    function select(section, focus) {
      current = section;
      clear(tablist);
      caseDef.sections.forEach((s, i) => {
        const on = s === current;
        const tab = h("button", {
          type: "button", class: "tab" + (on ? " is-active" : ""), role: "tab", id: panelId + "-tab-" + s.id,
          "aria-selected": on ? "true" : "false", "aria-controls": panelId, tabindex: on ? "0" : "-1"
        }, s.title);
        tab.addEventListener("click", () => select(s, true));
        tab.addEventListener("keydown", (e) => {
          const n = caseDef.sections.length;
          let to = null;
          if (e.key === "ArrowRight") to = (i + 1) % n;
          else if (e.key === "ArrowLeft") to = (i - 1 + n) % n;
          else if (e.key === "Home") to = 0;
          else if (e.key === "End") to = n - 1;
          if (to !== null) { e.preventDefault(); select(caseDef.sections[to], true); }
        });
        tablist.appendChild(tab);
        if (on && focus) tab.focus();
      });
      panel.setAttribute("aria-labelledby", panelId + "-tab-" + current.id);
      clear(panel).appendChild(W.renderBlocks(current.blocks));
      panel.scrollTop = 0;
      onSelect(current.id);
    }

    select(current, false);
    return h("section", { class: "case", "aria-label": "Scenario information" },
      h("div", { class: "case__head" },
        h("p", { class: "case__kicker" }, "Scenario set"),
        h("h2", { class: "case__title" }, caseDef.title.replace(/^Scenario set:\s*/, ""))),
      tablist, panel);
  }

  /**
   * Builds the content of the main area for one question.
   * opts: { number, total, answer, readOnly, reveal, onChange, flagged,
   *         caseTab, onCaseTab, pane, onPane, caseProgress, locked }
   */
  function buildQuestionLayout(q, opts) {
    const typeLabel = { single: "", multi: "Multiple response", yesno: "Hotspot", dropdown: "Hotspot", order: "Drag and drop", dragdrop: "Drag and drop", simulation: "Simulation" }[q.type];
    const article = h("article", { class: "question", "aria-labelledby": "question-title" },
      h("header", { class: "question__head" },
        h("h1", { class: "question__title", id: "question-title", tabindex: "-1" }, "Question " + opts.number),
        typeLabel ? h("span", { class: "question__type" }, typeLabel) : null,
        opts.caseProgress ? h("span", { class: "question__type" }, opts.caseProgress) : null),
      opts.locked ? h("p", { class: "banner banner--info" }, icon("lock"), "This question belongs to a scenario set and is locked. It cannot be changed.") : null,
      W.renderBlocks(q.stem),
      // The verdict sits directly above the options so both are seen together.
      h("div", { class: "answer-block" },
        opts.reveal ? W.renderResult(q, opts.answer, { flagged: opts.flagged }) : null,
        W.createWidget(q, { answer: opts.answer, readOnly: opts.readOnly, reveal: opts.reveal, onChange: opts.onChange })),
      opts.reveal ? W.renderFeedback(q, opts.answer) : null);

    if (!q.caseId) return h("div", { class: "layout layout--single" }, article);

    const caseDef = D.cases[q.caseId];
    const layout = h("div", { class: "layout layout--case", "data-pane": opts.pane || "question" });
    const width = store.get("prefs.split", 42);
    layout.style.setProperty("--case-width", width + "%");

    const paneSwitch = h("div", { class: "pane-switch", role: "group", "aria-label": "Show scenario or question" });
    const setPane = (name) => {
      layout.dataset.pane = name;
      paneSwitch.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.name === name ? "true" : "false"));
      opts.onPane(name);
    };
    [["scenario", "Scenario set"], ["question", "Question " + opts.number]].forEach(([name, label]) => {
      paneSwitch.appendChild(h("button", { type: "button", class: "pane-switch__btn", "data-name": name, "aria-pressed": (opts.pane || "question") === name ? "true" : "false", onclick: () => setPane(name) }, label));
    });

    // Split bar between the scenario and the question (desktop).
    const splitter = h("div", {
      class: "splitter", role: "separator", "aria-orientation": "vertical", tabindex: "0",
      "aria-label": "Resize scenario and question panes", "aria-valuemin": "25", "aria-valuemax": "65", "aria-valuenow": String(width)
    });
    const applyWidth = (pct) => {
      const w = Math.max(25, Math.min(65, Math.round(pct)));
      layout.style.setProperty("--case-width", w + "%");
      splitter.setAttribute("aria-valuenow", String(w));
      store.set("prefs.split", w);
    };
    splitter.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      splitter.setPointerCapture(e.pointerId);
      const rect = layout.getBoundingClientRect();
      const onMove = (ev) => applyWidth(((ev.clientX - rect.left) / rect.width) * 100);
      const onUp = () => { splitter.removeEventListener("pointermove", onMove); splitter.removeEventListener("pointerup", onUp); splitter.removeEventListener("pointercancel", onUp); };
      splitter.addEventListener("pointermove", onMove);
      splitter.addEventListener("pointerup", onUp);
      splitter.addEventListener("pointercancel", onUp);
    });
    splitter.addEventListener("keydown", (e) => {
      const now = Number(splitter.getAttribute("aria-valuenow"));
      if (e.key === "ArrowLeft") { e.preventDefault(); applyWidth(now - 3); }
      else if (e.key === "ArrowRight") { e.preventDefault(); applyWidth(now + 3); }
    });

    layout.appendChild(paneSwitch);
    layout.appendChild(h("div", { class: "layout__pane layout__pane--case" }, buildCasePane(caseDef, opts.caseTab, opts.onCaseTab)));
    layout.appendChild(splitter);
    layout.appendChild(h("div", { class: "layout__pane layout__pane--question" }, article));
    return layout;
  }

  function caseProgressLabel(q, order) {
    if (!q.caseId) return null;
    const members = order.filter((id) => E.byId.get(id).caseId === q.caseId);
    return "Solution " + (members.indexOf(q.id) + 1) + " of " + members.length;
  }

  /* ---------- Navigator ---------- */

  /**
   * cfg: { count, current, info(i) -> { label, classes[], icons[], disabled },
   *        legend [{ classes, icon, text }], onPick(i), actions [{ label, kind, run }] }
   */
  function openNavigator(cfg) {
    const titleId = uid("nav-title");
    const dlg = h("dialog", { class: "drawer", "aria-labelledby": titleId });
    const close = () => { if (dlg.open) dlg.close(); dlg.remove(); };
    const grid = h("div", { class: "nav-grid", role: "list" });

    for (let i = 0; i < cfg.count; i += 1) {
      const info = cfg.info(i);
      const cell = h("button", {
        type: "button", class: "nav-cell " + info.classes.join(" ") + (i === cfg.current ? " is-current" : ""),
        "aria-label": info.label, "aria-current": i === cfg.current ? "true" : null, disabled: info.disabled
      }, h("span", { class: "nav-cell__num" }, String(i + 1)), info.icons.map((name) => icon(name, { size: 11, class: "nav-cell__icon nav-cell__icon--" + name })));
      cell.addEventListener("click", () => { close(); cfg.onPick(i); });
      grid.appendChild(h("div", { role: "listitem" }, cell));
    }

    dlg.appendChild(h("div", { class: "drawer__head" },
      h("h2", { class: "drawer__title", id: titleId }, "Question navigator"),
      h("button", { type: "button", class: "icon-btn icon-btn--plain", "aria-label": "Close navigator", onclick: close }, icon("close"))));
    dlg.appendChild(h("div", { class: "drawer__body" },
      cfg.summary ? h("p", { class: "drawer__summary" }, cfg.summary) : null,
      grid,
      h("ul", { class: "legend" }, cfg.legend.map((item) =>
        h("li", null, h("span", { class: "nav-cell nav-cell--sample " + item.classes, "aria-hidden": "true" },
          h("span", { class: "nav-cell__num" }, item.icon ? "" : "1"), item.icon ? icon(item.icon, { size: 11, class: "nav-cell__icon nav-cell__icon--" + item.icon }) : null), item.text)))));
    dlg.appendChild(h("div", { class: "drawer__foot" }, cfg.actions.map((a) =>
      h("button", { type: "button", class: "btn btn--" + (a.kind || "secondary"), onclick: () => { close(); a.run(); } }, a.label))));

    dlg.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) close(); });
    document.body.appendChild(dlg);
    dlg.showModal();
    const cur = dlg.querySelector(".nav-cell.is-current") || dlg.querySelector(".nav-cell");
    if (cur) { cur.focus(); cur.scrollIntoView({ block: "center" }); }
    return close;
  }

  /* ---------- Live session ---------- */

  function liveExam(mount) {
    const session = E.loadSession();
    if (!session) { App.go("#/"); return; }

    const isExam = session.mode === "exam";
    const total = session.order.length;
    const qAt = (i) => E.byId.get(session.order[i]);
    const cur = () => qAt(session.index);
    const save = () => E.saveSession(session);

    let screen = "question";
    let filter = "all";
    let ticker = null;
    let closeNav = null;
    let finished = false;

    const counter = h("div", { class: "exam-bar__count" });
    const timerValue = h("span", { class: "timer__value" });
    const timer = h("div", { class: "timer", role: "timer" },
      icon("clock"), h("span", { class: "timer__label" }, session.timeLimitSec ? "Time remaining" : "Time elapsed"), timerValue);
    const navButton = h("button", { type: "button", class: "bar-btn", "aria-label": "Question navigator", onclick: showNavigator }, icon("grid"), h("span", { class: "bar-btn__text" }, "Navigator"));
    const bar = h("header", { class: "exam-bar" },
      h("div", { class: "exam-bar__title" }, h("strong", null, D.exam.code), h("span", null, isExam ? "Exam mode" : "Reviewer mode")),
      counter,
      h("div", { class: "exam-bar__right" }, timer, navButton));
    const progressFill = h("div", { class: "progress__fill" });
    const progress = h("div", { class: "progress", role: "progressbar", "aria-label": "Questions answered", "aria-valuemin": "0", "aria-valuemax": String(total) }, progressFill);
    const tools = h("div", { class: "exam-tools" });
    const main = h("main", { class: "exam-main", id: "exam-main", tabindex: "-1" });
    const foot = h("footer", { class: "exam-foot" });
    mount.appendChild(h("div", { class: "exam" }, bar, progress, tools, main, foot));

    /* --- state helpers --- */

    const stateOf = (i) => E.answerState(qAt(i), session.answers[session.order[i]]);
    const isLocked = (i) => !!session.locked[session.order[i]];
    const counts = () => {
      const c = { complete: 0, partial: 0, none: 0, flagged: 0 };
      session.order.forEach((id, i) => { c[stateOf(i)] += 1; if (session.flags[id]) c.flagged += 1; });
      return c;
    };

    function prevIndex() { for (let i = session.index - 1; i >= 0; i -= 1) if (!isLocked(i)) return i; return -1; }
    function nextIndex() { for (let i = session.index + 1; i < total; i += 1) if (!isLocked(i)) return i; return -1; }

    function updateProgress() {
      const c = counts();
      progress.setAttribute("aria-valuenow", String(c.complete));
      progress.setAttribute("aria-valuetext", c.complete + " of " + total + " answered");
      progressFill.style.width = (total ? (c.complete / total) * 100 : 0) + "%";
      const el = tools.querySelector("[data-progress]");
      if (el) el.textContent = "Answered " + c.complete + " of " + total + (c.flagged ? " · Marked " + c.flagged : "");
    }

    function updateTimer() {
      if (session.timeLimitSec) {
        const left = Math.max(0, session.timeLimitSec - session.elapsedSec);
        timerValue.textContent = formatDuration(left);
        timer.classList.toggle("is-low", left <= 300);
        if (left === 300) announce("Five minutes remaining.");
        if (left === 60) announce("One minute remaining.");
      } else {
        timerValue.textContent = formatDuration(session.elapsedSec);
      }
    }

    function startTicker() {
      if (ticker) return;
      ticker = window.setInterval(() => {
        session.elapsedSec += 1;
        updateTimer();
        if (session.elapsedSec % 5 === 0) save();
        if (session.timeLimitSec && session.elapsedSec >= session.timeLimitSec) timeUp();
      }, 1000);
    }
    function stopTicker() { window.clearInterval(ticker); ticker = null; }

    App.onDispose(() => { stopTicker(); if (closeNav) closeNav(); if (!finished) save(); });

    /* --- finishing --- */

    function complete(status) {
      finished = true;
      stopTicker();
      if (closeNav) closeNav();
      const attempt = E.finishSession(session, status);
      return attempt;
    }

    async function timeUp() {
      if (finished) return;
      document.querySelectorAll("dialog[open]").forEach((d) => { d.close(); d.remove(); });
      const attempt = complete("Timed out");
      await dialog({
        title: "Time has expired",
        body: "The time allowed for this exam has ended. Your answers have been submitted.",
        actions: [{ label: "View results", value: true, kind: "primary" }],
        dismissible: false
      });
      App.go("#/results/" + attempt.id);
    }

    async function submit() {
      const c = counts();
      const open = c.none + c.partial;
      const lines = [];
      if (open) lines.push("**" + open + (open === 1 ? " question is" : " questions are") + " unanswered or incomplete.** Unanswered questions are scored as incorrect.");
      if (c.flagged) lines.push(c.flagged + (c.flagged === 1 ? " question is" : " questions are") + " still marked for review.");
      lines.push(isExam ? "After you submit, you cannot change your answers. Your results are shown immediately." : "This ends the session and saves your score to your history.");
      const ok = await dialog({
        title: isExam ? "Submit exam?" : "Finish session?",
        body: lines,
        actions: [
          { label: isExam ? "Return to exam" : "Return to session", value: false, kind: "secondary" },
          { label: isExam ? "Submit exam" : "Finish session", value: true, kind: "primary" }
        ]
      });
      if (!ok) return;
      const attempt = complete("Completed");
      App.go("#/results/" + attempt.id);
    }

    async function saveAndExit() {
      save();
      App.go("#/");
    }

    async function abandon() {
      const ok = await dialog({
        title: "End session without submitting?",
        body: ["The session will be closed and recorded in your history as abandoned. It does not count toward your average score.", "To keep your place and continue later, choose Save and exit instead."],
        actions: [{ label: "Cancel", value: false, kind: "secondary" }, { label: "End session", value: true, kind: "danger" }]
      });
      if (!ok) return;
      complete("Abandoned");
      App.go("#/");
    }

    /* --- navigation --- */

    async function confirmLeave() {
      const q = cur();
      const noReturn = isExam && session.noReturn && q.caseId && D.cases[q.caseId].noReturn && !session.locked[q.id];
      if (!noReturn) return true;
      const answered = E.answerState(q, session.answers[q.id]) === "complete";
      const ok = await dialog({
        title: "Leave this question?",
        body: [
          "This question is part of a scenario set. After you leave it, you will NOT be able to return to it, and it will not appear on the review screen.",
          answered ? null : "**You have not answered this question.**"
        ],
        actions: [{ label: "Stay on this question", value: false, kind: "secondary" }, { label: "Continue", value: true, kind: "primary" }]
      });
      if (!ok) return false;
      session.locked[q.id] = true;
      delete session.flags[q.id];
      return true;
    }

    async function goTo(index) {
      if (index < 0 || index >= total) return;
      if (screen === "question" && index !== session.index && !(await confirmLeave())) return;
      session.index = index;
      screen = "question";
      save();
      renderQuestion(true);
    }

    async function goNext() {
      const next = nextIndex();
      if (next === -1) { if (await confirmLeave()) { save(); showReview(); } return; }
      goTo(next);
    }

    async function showReview() {
      if (screen === "question" && !(await confirmLeave())) return;
      screen = "review";
      save();
      renderReview();
    }

    /* --- question screen --- */

    function renderTools(q) {
      clear(tools);
      const locked = !!session.locked[q.id];
      const flagId = uid("flag");
      const flag = h("input", { type: "checkbox", id: flagId, checked: !!session.flags[q.id], disabled: locked });
      flag.addEventListener("change", () => {
        if (flag.checked) session.flags[q.id] = true; else delete session.flags[q.id];
        save();
        updateProgress();
        announce(flag.checked ? "Question marked for review." : "Mark for review removed.");
      });
      tools.appendChild(h("div", { class: "exam-tools__left" }, h("span", { "data-progress": "1" })));
      tools.appendChild(h("label", { class: "flag-toggle", for: flagId }, flag, icon("flag"), h("span", null, "Mark for review")));
    }

    function renderFoot(q) {
      clear(foot);
      const locked = !!session.locked[q.id];
      const checked = !!session.checked[q.id];
      const prev = prevIndex();
      const last = nextIndex() === -1;
      const hasAnswer = E.answerState(q, session.answers[q.id]) !== "none";

      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--secondary", disabled: prev === -1, onclick: () => goTo(prev) }, icon("left"), "Previous"),
        h("button", { type: "button", class: "btn btn--subtle exam-foot__review", onclick: showReview }, "Review screen")));

      const right = h("div", { class: "exam-foot__group" });
      if (!isExam && !checked && !locked) {
        right.appendChild(h("button", { type: "button", class: "btn btn--primary", "data-check": "1", onclick: checkAnswer }, hasAnswer ? "Check answer" : "Show answer"));
      }
      const nextKind = !isExam && !checked ? "secondary" : "primary";
      right.appendChild(h("button", { type: "button", class: "btn btn--" + nextKind, onclick: goNext }, last ? "Review screen" : "Next", icon("right")));
      foot.appendChild(right);
    }

    function renderQuestion(focus) {
      const q = cur();
      const index = session.index;
      const firstVisit = q.caseId && !session.caseTab[q.caseId];
      session.visited[q.id] = true;
      counter.textContent = "Question " + (index + 1) + " of " + total;
      renderTools(q);

      const locked = !!session.locked[q.id];
      const checked = !isExam && !!session.checked[q.id];
      clear(main).appendChild(buildQuestionLayout(q, {
        number: index + 1,
        total,
        answer: session.answers[q.id],
        readOnly: locked || checked,
        reveal: checked,
        locked,
        flagged: !!session.flags[q.id],
        caseTab: session.caseTab[q.caseId],
        onCaseTab: (id) => { session.caseTab[q.caseId] = id; save(); },
        // On a narrow screen, open the scenario first the first time a set is entered.
        pane: firstVisit ? "scenario" : "question",
        onPane: () => {},
        caseProgress: caseProgressLabel(q, session.order),
        onChange: (value) => {
          if (E.answerState(q, value) === "none") delete session.answers[q.id]; else session.answers[q.id] = value;
          save();
          updateProgress();
          const check = foot.querySelector("[data-check]");
          if (check) check.textContent = E.answerState(q, value) !== "none" ? "Check answer" : "Show answer";
        }
      }));
      renderFoot(q);
      updateProgress();
      save();
      main.scrollTop = 0;
      main.querySelectorAll(".layout__pane").forEach((p) => { p.scrollTop = 0; });
      if (focus) {
        const title = main.querySelector("#question-title");
        if (title) title.focus({ preventScroll: true });
      }
    }

    function checkAnswer() {
      const q = cur();
      session.checked[q.id] = true;
      save();
      renderQuestion(false);
      const g = E.grade(q, session.answers[q.id]);
      announce(q.type === "simulation" ? "The reference solution is shown."
        : g.status === "correct" ? "Correct." : g.status === "unanswered" ? "Not answered. The correct answer is shown." : "Incorrect. The correct answer is shown.");
      // Keep the verdict and the marked options on screen; the explanation follows below.
      const result = main.querySelector(".result");
      const block = main.querySelector(".answer-block");
      if (result) result.focus({ preventScroll: true });
      if (block) block.scrollIntoView({ block: "nearest", behavior: "auto" });
    }

    /* --- review screen --- */

    function statusLabel(i) {
      if (isLocked(i)) return "Locked";
      const s = stateOf(i);
      return s === "complete" ? "Answered" : s === "partial" ? "Incomplete" : "Unanswered";
    }

    function renderReview() {
      counter.textContent = "Review screen";
      clear(tools);
      tools.appendChild(h("div", { class: "exam-tools__left" }, h("span", { "data-progress": "1" })));
      updateProgress();

      const c = counts();
      const filters = [
        ["all", "All questions", total],
        ["open", "Unanswered or incomplete", c.none + c.partial],
        ["flagged", "Marked for review", c.flagged]
      ];
      const rows = [];
      session.order.forEach((id, i) => {
        const s = stateOf(i);
        if (filter === "open" && s === "complete") return;
        if (filter === "flagged" && !session.flags[id]) return;
        rows.push(i);
      });

      const table = h("table", { class: "data-table data-table--rows" },
        h("thead", null, h("tr", null,
          h("th", { scope: "col", class: "col-num" }, "No."), h("th", { scope: "col" }, "Question"),
          h("th", { scope: "col" }, "Status"), h("th", { scope: "col" }, "Marked"))),
        h("tbody", null, rows.map((i) => {
          const q = qAt(i);
          const locked = isLocked(i);
          const s = stateOf(i);
          const checkedHere = !isExam && session.checked[q.id];
          const result = checkedHere ? E.grade(q, session.answers[q.id]).status : null;
          return h("tr", null,
            h("td", { class: "col-num" }, String(i + 1)),
            h("td", null, locked
              ? h("span", { class: "muted" }, E.summaryLine(q))
              : h("button", { type: "button", class: "link-btn", onclick: () => goTo(i) }, E.summaryLine(q))),
            h("td", null, h("span", { class: "status status--" + (locked ? "locked" : s) },
              icon(locked ? "lock" : s === "complete" ? "check" : s === "partial" ? "dash" : "warn", { size: 14 }), statusLabel(i)),
              result ? h("span", { class: "status status--" + result }, result === "correct" ? "Checked: correct" : result === "incorrect" ? "Checked: incorrect" : "Checked") : null),
            h("td", null, session.flags[q.id] ? h("span", { class: "status status--flag" }, icon("flag", { size: 14 }), "Marked") : h("span", { class: "muted" }, "—")));
        })));

      clear(main).appendChild(h("div", { class: "layout layout--single" },
        h("div", { class: "review-screen" },
          h("h1", { class: "question__title", id: "question-title", tabindex: "-1" }, "Review screen"),
          h("p", null, isExam
            ? "Review your answers before you submit. Select a question to return to it. Questions from scenario sets that you have left are locked and cannot be reopened."
            : "Select a question to return to it. When you are done, finish the session to save your score."),
          h("dl", { class: "stat-row" },
            h("div", null, h("dt", null, "Answered"), h("dd", null, String(c.complete))),
            h("div", null, h("dt", null, "Incomplete"), h("dd", null, String(c.partial))),
            h("div", null, h("dt", null, "Unanswered"), h("dd", null, String(c.none))),
            h("div", null, h("dt", null, "Marked for review"), h("dd", null, String(c.flagged)))),
          h("div", { class: "filter-row", role: "group", "aria-label": "Filter questions" }, filters.map(([name, label, n]) =>
            h("button", { type: "button", class: "chip-btn", "aria-pressed": filter === name ? "true" : "false", onclick: () => { filter = name; renderReview(); } }, label + " (" + n + ")"))),
          rows.length ? h("div", { class: "table-wrap" }, table) : h("p", { class: "empty" }, "No questions match this filter."))));

      clear(foot);
      const back = isLocked(session.index) ? (prevIndex() !== -1 ? prevIndex() : nextIndex()) : session.index;
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--secondary", disabled: back === -1, onclick: () => goTo(back) }, icon("left"), "Return to question " + (back + 1)),
        h("button", { type: "button", class: "btn btn--subtle", onclick: saveAndExit }, "Save and exit")));
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--primary", onclick: submit }, isExam ? "Submit exam" : "Finish session")));
      main.scrollTop = 0;
      const title = main.querySelector("#question-title");
      if (title) title.focus({ preventScroll: true });
    }

    /* --- navigator --- */

    function showNavigator() {
      const c = counts();
      closeNav = openNavigator({
        count: total,
        current: screen === "question" ? session.index : -1,
        summary: "Answered " + c.complete + " of " + total + ". Incomplete " + c.partial + ". Marked for review " + c.flagged + ".",
        info: (i) => {
          const q = qAt(i);
          const s = stateOf(i);
          const locked = isLocked(i);
          const flagged = !!session.flags[q.id];
          const result = !isExam && session.checked[q.id] ? E.grade(q, session.answers[q.id]).status : null;
          const icons = [];
          if (locked) icons.push("lock");
          if (flagged) icons.push("flag");
          if (result === "correct") icons.push("check");
          if (result === "incorrect" || result === "unanswered") icons.push("close");
          const words = ["Question " + (i + 1), statusLabel(i)];
          if (flagged) words.push("Marked for review");
          if (result) words.push(result === "correct" ? "Checked, correct" : "Checked, incorrect");
          if (i === session.index && screen === "question") words.push("Current question");
          return { label: words.join(". ") + ".", classes: ["is-" + s, locked ? "is-locked" : "", flagged ? "is-flagged" : ""], icons, disabled: locked };
        },
        legend: [
          { classes: "is-current", text: "Current question" },
          { classes: "is-complete", text: "Answered" },
          { classes: "is-partial", text: "Incomplete" },
          { classes: "is-none", text: "Unanswered" },
          { classes: "is-none is-flagged", icon: "flag", text: "Marked for review" }
        ].concat(isExam && session.noReturn ? [{ classes: "is-none is-locked", icon: "lock", text: "Locked (scenario set)" }] : [])
          .concat(!isExam ? [{ classes: "is-complete", icon: "check", text: "Checked, correct" }, { classes: "is-complete", icon: "close", text: "Checked, incorrect" }] : []),
        onPick: (i) => goTo(i),
        actions: [
          { label: "Review screen", kind: "primary", run: showReview },
          { label: "Save and exit", kind: "secondary", run: saveAndExit },
          { label: "End session", kind: "subtle", run: abandon }
        ]
      });
    }

    /* --- instructions screen --- */

    function renderIntro() {
      counter.textContent = total + (total === 1 ? " question" : " questions");
      clear(tools);
      const sets = Array.from(new Set(session.order.map((id) => E.byId.get(id).caseId).filter(Boolean)));
      const rules = [];
      if (isExam) {
        rules.push("This session contains " + total + " questions. Answers are not scored or revealed until you submit the exam.");
        rules.push(session.timeLimitSec
          ? "You have " + formatSpan(session.timeLimitSec) + ". The timer starts when you select Begin and the exam is submitted automatically when time runs out."
          : "This session is not timed. Elapsed time is recorded.");
        rules.push("Use Previous and Next to move between questions. Use Mark for review to flag a question, and the Navigator or Review screen to return to it.");
        rules.push("Some questions are worth more than one point. Each correct selection in a hotspot, drag and drop or multiple response question is worth one point.");
        if (sets.length && session.noReturn) rules.push("This session includes " + sets.length + (sets.length === 1 ? " scenario set" : " scenario sets") + ". After you leave a question in a scenario set, you cannot return to it.");
        else if (sets.length) rules.push("This session includes " + sets.length + (sets.length === 1 ? " scenario set" : " scenario sets") + ". The scenario stays on screen while you answer its questions.");
      } else {
        rules.push("This session contains " + total + " questions. After you answer a question, select Check answer to see whether you were correct, with a full explanation.");
        rules.push("After an answer is checked it is locked. You can still move between questions and reread explanations.");
        rules.push("This session is not timed. Your score is saved to your history when you finish the session.");
        if (sets.length) rules.push("This session includes " + sets.length + (sets.length === 1 ? " scenario set" : " scenario sets") + ". The scenario stays on screen while you answer its questions.");
      }
      const sims = session.order.filter((id) => E.byId.get(id).type === "simulation").length;
      if (sims) rules.push("This session includes " + sims + (sims === 1 ? " simulation" : " simulations") + ". A simulation is a lab task that cannot be performed here. You record whether you could complete it, and it is scored from that self-assessment. The reference solution is shown with the answer.");
      const requested = session.requested === "all" ? null : session.requested;
      clear(main).appendChild(h("div", { class: "layout layout--single" },
        h("div", { class: "intro" },
          h("h1", { class: "question__title", id: "question-title", tabindex: "-1" }, isExam ? "Exam instructions" : "Reviewer session"),
          h("p", { class: "intro__exam" }, D.exam.code + ": " + D.exam.title),
          requested && requested > total ? h("p", { class: "banner banner--info" }, icon("info"),
            "You requested " + requested + " questions. " + total + " are available in the selected pool, so this session contains " + total + ".") : null,
          h("ul", { class: "req-list" }, rules.map((r) => h("li", null, r))))));
      clear(foot);
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--secondary", onclick: () => { finished = true; E.clearSession(); App.go("#/"); } }, "Cancel")));
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--primary", onclick: begin }, isExam ? "Begin exam" : "Begin session", icon("right"))));
      timerValue.textContent = session.timeLimitSec ? formatDuration(session.timeLimitSec) : "00:00";
      navButton.disabled = true;
      const title = main.querySelector("#question-title");
      if (title) title.focus({ preventScroll: true });
    }

    function begin() {
      session.begun = true;
      session.startedAt = Date.now();
      navButton.disabled = false;
      save();
      startTicker();
      updateTimer();
      renderQuestion(true);
    }

    /* --- start --- */

    if (!session.begun) {
      renderIntro();
    } else {
      // A resumed session never reopens a locked scenario question.
      if (isLocked(session.index)) {
        const n = nextIndex();
        const p = prevIndex();
        if (n !== -1) session.index = n; else if (p !== -1) session.index = p; else screen = "review";
      }
      updateTimer();
      startTicker();
      if (screen === "review") renderReview(); else renderQuestion(true);
    }
  }

  /* ---------- Post-exam answer review ---------- */

  function answerReview(mount, attemptId, initialFilter, startAt) {
    const attempt = E.getAttempt(attemptId);
    if (!attempt) { App.go("#/history"); return; }

    const filters = {
      all: { label: "All questions", test: () => true },
      incorrect: { label: "Incorrect", test: (id) => attempt.results[id].status === "incorrect" },
      unanswered: { label: "Unanswered", test: (id) => attempt.results[id].status === "unanswered" },
      flagged: { label: "Marked for review", test: (id) => !!(attempt.flags && attempt.flags[id]) }
    };
    let filter = filters[initialFilter] ? initialFilter : "all";
    let list = [];
    let pos = 0;
    const caseTab = {};
    let closeNav = null;

    const counter = h("div", { class: "exam-bar__count" });
    const navButton = h("button", { type: "button", class: "bar-btn", "aria-label": "Question navigator", onclick: showNavigator }, icon("grid"), h("span", { class: "bar-btn__text" }, "Navigator"));
    const bar = h("header", { class: "exam-bar" },
      h("div", { class: "exam-bar__title" }, h("strong", null, D.exam.code), h("span", null, "Answer review")),
      counter, h("div", { class: "exam-bar__right" }, navButton));
    const tools = h("div", { class: "exam-tools" });
    const main = h("main", { class: "exam-main", id: "exam-main", tabindex: "-1" });
    const foot = h("footer", { class: "exam-foot" });
    mount.appendChild(h("div", { class: "exam exam--review" }, bar, tools, main, foot));
    App.onDispose(() => { if (closeNav) closeNav(); });

    function applyFilter(name, keepId) {
      filter = name;
      list = attempt.order.filter((id) => filters[name].test(id));
      pos = Math.max(0, keepId ? list.indexOf(keepId) : 0);
      render(true);
    }

    function renderTools() {
      clear(tools);
      const selectId = uid("filter");
      const select = h("select", { class: "select select--compact", id: selectId });
      Object.keys(filters).forEach((name) => {
        const n = attempt.order.filter((id) => filters[name].test(id)).length;
        select.appendChild(h("option", { value: name }, filters[name].label + " (" + n + ")"));
      });
      select.value = filter;
      select.addEventListener("change", () => applyFilter(select.value, null));
      tools.appendChild(h("div", { class: "exam-tools__left" }, h("label", { class: "inline-label", for: selectId }, "Show"), select));
      const id = list[pos];
      if (id && attempt.flags && attempt.flags[id]) tools.appendChild(h("span", { class: "status status--flag" }, icon("flag", { size: 14 }), "Marked for review"));
    }

    function render(focus) {
      renderTools();
      clear(foot);
      const back = h("button", { type: "button", class: "btn btn--subtle", onclick: () => App.go("#/results/" + attempt.id) }, "Back to results");
      if (!list.length) {
        counter.textContent = "No questions";
        clear(main).appendChild(h("div", { class: "layout layout--single" }, h("p", { class: "empty" }, "No questions match this filter.")));
        foot.appendChild(h("div", { class: "exam-foot__group" }, back));
        return;
      }
      const id = list[pos];
      const q = E.byId.get(id);
      const number = attempt.order.indexOf(id) + 1;
      counter.textContent = "Question " + number + " of " + attempt.order.length + (filter === "all" ? "" : " · " + (pos + 1) + " of " + list.length + " shown");
      clear(main).appendChild(buildQuestionLayout(q, {
        number,
        total: attempt.order.length,
        answer: attempt.answers[id],
        readOnly: true,
        reveal: true,
        flagged: !!(attempt.flags && attempt.flags[id]),
        caseTab: caseTab[q.caseId],
        onCaseTab: (tab) => { caseTab[q.caseId] = tab; },
        pane: "question",
        onPane: () => {},
        caseProgress: caseProgressLabel(q, attempt.order),
        onChange: () => {}
      }));
      E.markReviewed([id]);
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--secondary", disabled: pos === 0, onclick: () => { pos -= 1; render(true); } }, icon("left"), "Previous"),
        back));
      foot.appendChild(h("div", { class: "exam-foot__group" },
        h("button", { type: "button", class: "btn btn--primary", disabled: pos >= list.length - 1, onclick: () => { pos += 1; render(true); } }, "Next", icon("right"))));
      main.scrollTop = 0;
      main.querySelectorAll(".layout__pane").forEach((p) => { p.scrollTop = 0; });
      if (focus) {
        const title = main.querySelector("#question-title");
        if (title) title.focus({ preventScroll: true });
      }
    }

    function showNavigator() {
      closeNav = openNavigator({
        count: attempt.order.length,
        current: list.length ? attempt.order.indexOf(list[pos]) : -1,
        summary: attempt.correct + " correct, " + attempt.incorrect + " incorrect, " + attempt.unanswered + " unanswered.",
        info: (i) => {
          const id = attempt.order[i];
          const status = attempt.results[id].status;
          const flagged = !!(attempt.flags && attempt.flags[id]);
          const icons = [status === "correct" ? "check" : status === "incorrect" ? "close" : "dash"];
          if (flagged) icons.push("flag");
          return {
            label: "Question " + (i + 1) + ". " + (status === "correct" ? "Correct" : status === "incorrect" ? "Incorrect" : "Unanswered") + (flagged ? ". Marked for review" : "") + ".",
            classes: ["is-result-" + status, flagged ? "is-flagged" : ""], icons, disabled: false
          };
        },
        legend: [
          { classes: "is-result-correct", icon: "check", text: "Correct" },
          { classes: "is-result-incorrect", icon: "close", text: "Incorrect" },
          { classes: "is-result-unanswered", icon: "dash", text: "Unanswered" },
          { classes: "is-result-unanswered is-flagged", icon: "flag", text: "Marked for review" }
        ],
        onPick: (i) => applyFilter("all", attempt.order[i]),
        actions: [{ label: "Back to results", kind: "primary", run: () => App.go("#/results/" + attempt.id) }]
      });
    }

    list = attempt.order.filter((id) => filters[filter].test(id));
    const startId = startAt ? attempt.order[startAt - 1] : null;
    if (startId && !list.includes(startId)) { filter = "all"; list = attempt.order.slice(); }
    pos = startId ? Math.max(0, list.indexOf(startId)) : 0;
    render(true);
  }

  App.exam = { liveExam, answerReview };
})();
