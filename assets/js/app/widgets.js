/*
 * Question rendering. One widget per interaction type.
 *
 * createWidget(q, ctx) -> HTMLElement
 *   ctx.answer    current answer (may be undefined)
 *   ctx.onChange  called with the new answer
 *   ctx.readOnly  inputs are disabled
 *   ctx.reveal    mark the correct answer and the user's selections
 */
(function () {
  "use strict";

  const App = window.App;
  const { h, fmt, plain, icon, uid, announce } = App;
  const E = App.engine;

  /* ---------- Stem blocks ---------- */

  function exhibitSrc(name) {
    const inline = window.EXAM_EXHIBITS;
    return inline && inline[name] ? inline[name] : "assets/exhibits/" + name;
  }

  function codeBlock(code, label) {
    return h("pre", { class: "code", tabindex: "0", role: "group", "aria-label": label || "Code exhibit" }, h("code", null, code));
  }

  function renderBlock(block) {
    if (typeof block === "string") return h("p", null, fmt(block));
    if (block.code !== undefined) {
      return h("figure", { class: "exhibit" },
        block.label ? h("figcaption", { class: "exhibit__label" }, block.label) : null,
        codeBlock(block.code, block.label),
        block.note ? h("p", { class: "exhibit__note" }, block.note) : null);
    }
    if (block.table) {
      const numeric = block.table.numeric || [];
      return h("div", { class: "table-wrap", tabindex: "0", role: "region", "aria-label": "Table exhibit" },
        h("table", { class: "data-table" },
          h("thead", null, h("tr", null, block.table.head.map((c) => h("th", { scope: "col" }, c)))),
          h("tbody", null, block.table.rows.map((row) =>
            h("tr", null, row.map((c, i) => h("td", { class: numeric.includes(i) ? "is-num" : null }, fmt(c))))))));
    }
    if (block.list) return h("ul", { class: "req-list" }, block.list.map((item) => h("li", null, fmt(item))));
    if (block.image) {
      return h("figure", { class: "exhibit exhibit--image" },
        h("img", { src: exhibitSrc(block.image), alt: block.alt || "Exhibit", loading: "lazy" }));
    }
    if (block.heading) return h("h3", { class: "prose__heading" }, block.heading);
    if (block.note) return h("p", { class: "exhibit__note" }, block.note);
    return null;
  }

  function renderBlocks(blocks) {
    return h("div", { class: "prose" }, blocks.map(renderBlock));
  }

  /* ---------- Shared pieces ---------- */

  function hint(text) {
    return h("p", { class: "widget-hint" }, text);
  }

  /** Solid pill used on revealed answers: green with a check, red with a cross. */
  function badge(ok, text) {
    return h("span", { class: "badge badge--" + (ok ? "ok" : "bad") }, icon(ok ? "check" : "close", { size: 14 }), text);
  }

  /** Shows the right value next to a wrong selection. */
  function fixChip(text) {
    return h("span", { class: "fix-chip" }, icon("check", { size: 14 }), h("span", { class: "sr-only" }, "Correct answer: "), text);
  }

  function keyChip(letter, tone) {
    return h("span", { class: "key-chip key-chip--" + tone }, letter);
  }

  /* ---------- Single and multiple choice ---------- */

  function choiceWidget(q, ctx) {
    const multi = q.type === "multi";
    const key = E.keyOf(q);
    const limit = key.length;
    const name = uid("choice");
    let value = (ctx.answer || []).slice();

    const message = h("p", { class: "widget-message", role: "status", hidden: true });
    const legendText = multi ? "Select " + limit + " answers." : "Select one answer.";
    const root = h("fieldset", { class: "choices" },
      h("legend", { class: multi ? "choices__legend" : "sr-only" }, legendText));

    q.options.forEach((opt) => {
      const inputId = uid("opt");
      const selected = value.includes(opt.key);
      const isKey = key.includes(opt.key);
      const input = h("input", {
        type: multi ? "checkbox" : "radio", name, id: inputId, value: opt.key,
        checked: selected, disabled: ctx.readOnly
      });
      input.addEventListener("change", () => {
        if (multi) {
          if (input.checked && value.length >= limit) {
            input.checked = false;
            message.hidden = false;
            message.textContent = "You can select only " + limit + " answers. Clear one of your selections to choose a different answer.";
            return;
          }
          message.hidden = true;
          value = input.checked ? value.concat(opt.key) : value.filter((k) => k !== opt.key);
        } else {
          value = [opt.key];
        }
        root.querySelectorAll(".choice").forEach((row) => row.classList.toggle("is-selected", row.querySelector("input").checked));
        ctx.onChange(value.slice());
      });

      const body = h("div", { class: "choice__body" },
        opt.text ? h("span", null, fmt(opt.text)) : null,
        opt.code ? codeBlock(opt.code, "Option " + opt.key) : null);

      let state = null;
      let verdict = null;
      let stateClass = selected ? " is-selected" : "";
      if (ctx.reveal) {
        // A status icon takes the place of the input so right and wrong read at a glance.
        const kind = isKey ? "ok" : selected ? "bad" : "none";
        state = h("span", { class: "choice__state choice__state--" + kind, "aria-hidden": "true" },
          kind === "none" ? null : icon(kind === "ok" ? "check" : "close", { size: 14 }));
        if (isKey) verdict = badge(true, selected ? "Your answer · Correct" : "Correct answer");
        else if (selected) verdict = badge(false, "Your answer · Incorrect");
        stateClass = " is-revealed" + (isKey ? " is-correct" : selected ? " is-wrong" : " is-dim");
      }

      root.appendChild(h("label", { class: "choice" + stateClass, for: inputId },
        input,
        state,
        h("span", { class: "choice__key" }, opt.key + "."),
        body,
        verdict));
    });

    root.appendChild(message);
    return root;
  }

  /* ---------- Hotspot: Yes / No statements ---------- */

  function yesNoWidget(q, ctx) {
    const key = E.keyOf(q);
    let value = ctx.answer ? ctx.answer.slice() : q.statements.map(() => null);

    const root = h("div", { class: "answer-area" },
      h("h3", { class: "answer-area__title" }, "Answer Area"),
      h("div", { class: "yn" },
        h("div", { class: "yn__head", "aria-hidden": "true" },
          h("span", null, "Statements"), h("span", null, "Yes"), h("span", null, "No"))));
    const grid = root.querySelector(".yn");

    q.statements.forEach((st, i) => {
      const labelId = uid("stmt");
      const name = uid("yn");
      const radio = (val, text) => {
        const input = h("input", { type: "radio", name, checked: value[i] === val, disabled: ctx.readOnly, "aria-label": text });
        input.addEventListener("change", () => { value[i] = val; ctx.onChange(value.slice()); });
        let cls = "yn__cell";
        let mark = null;
        if (ctx.reveal && key[i] === val) { cls += " is-key"; mark = icon("check", { size: 14 }); }
        else if (ctx.reveal && value[i] === val) { cls += " is-miss"; mark = icon("close", { size: 14 }); }
        return h("label", { class: cls }, input, mark, h("span", { class: "yn__cell-text" }, text));
      };
      const stmt = h("div", { class: "yn__stmt", id: labelId },
        h("p", null, fmt(st.text)),
        st.code ? codeBlock(st.code, "Query for statement " + (i + 1)) : null);
      if (ctx.reveal) {
        const ok = value[i] === key[i];
        stmt.appendChild(h("p", { class: "yn__result" },
          badge(ok, ok ? "Correct" : value[i] === null ? "Not answered" : "Incorrect"),
          ok ? null : fixChip(key[i] ? "Yes" : "No")));
      }
      grid.appendChild(h("div", { class: "yn__row", role: "radiogroup", "aria-labelledby": labelId },
        stmt, radio(true, "Yes"), radio(false, "No")));
    });
    return root;
  }

  /* ---------- Hotspot: drop-down selections ---------- */

  function dropdownWidget(q, ctx) {
    const key = E.keyOf(q);
    const value = Object.assign({}, ctx.answer || {});

    const makeSelect = (field, inline) => {
      const select = h("select", {
        class: "select" + (inline ? " select--inline" : ""),
        disabled: ctx.readOnly,
        "aria-label": inline ? plain(field.label) : null
      }, h("option", { value: "" }, inline ? "Select" : "Select an option"));
      field.options.forEach((text, idx) => select.appendChild(h("option", { value: String(idx) }, text)));
      select.value = value[field.id] === undefined || value[field.id] === null ? "" : String(value[field.id]);
      select.addEventListener("change", () => {
        if (select.value === "") delete value[field.id]; else value[field.id] = Number(select.value);
        ctx.onChange(Object.assign({}, value));
      });
      if (!ctx.reveal) return select;
      const ok = value[field.id] === key[field.id];
      select.classList.add(ok ? "is-correct" : "is-wrong");
      return h("span", { class: "select-wrap" }, select,
        h("span", { class: "mark mark--icon " + (ok ? "mark--ok" : "mark--bad") },
          icon(ok ? "check" : "close", { size: 14, label: ok ? "Correct" : "Incorrect" })),
        ok ? null : fixChip(field.options[key[field.id]]));
    };

    const root = h("div", { class: "answer-area" }, h("h3", { class: "answer-area__title" }, "Answer Area"));

    if (q.template) {
      const pre = h("pre", { class: "code code--template" });
      q.template.split(/(\{\{\w+\}\})/).forEach((part) => {
        const m = /^\{\{(\w+)\}\}$/.exec(part);
        if (!m) { pre.appendChild(document.createTextNode(part)); return; }
        pre.appendChild(makeSelect(q.fields.find((f) => f.id === m[1]), true));
      });
      root.appendChild(pre);
    } else {
      const list = h("div", { class: "dd" });
      q.fields.forEach((field) => {
        const id = uid("dd");
        const control = makeSelect(field, false);
        (control.tagName === "SELECT" ? control : control.querySelector("select")).id = id;
        list.appendChild(h("div", { class: "dd__row" }, h("label", { class: "dd__label", for: id }, fmt(field.label)), control));
      });
      root.appendChild(list);
    }
    return root;
  }

  /* ---------- Drag and drop: build an ordered list ---------- */

  function orderWidget(q, ctx) {
    const key = E.keyOf(q);
    let value = (ctx.answer || []).slice();
    let selected = null;
    const locked = !!ctx.readOnly;

    const sourceList = h("ul", { class: "dnd-list", "data-dropzone": "source", "aria-label": q.sourceLabel || "Actions" });
    const answerList = h("ol", { class: "dnd-list dnd-list--answer", "data-dropzone": "answer", "aria-label": "Answer Area" });
    const marker = h("li", { class: "dnd-marker", "aria-hidden": "true" });

    const btn = (name, label, onClick) => {
      const b = h("button", { type: "button", class: "icon-btn", "aria-label": label, title: label, disabled: locked, onclick: onClick }, icon(name));
      return b;
    };
    const toAnswer = btn("right", "Move the selected action to the answer area", () => moveSelected("answer"));
    const toSource = btn("left", "Remove the selected action from the answer area", () => moveSelected("source"));
    const moveUp = btn("up", "Move the selected action up", () => shift(-1));
    const moveDown = btn("down", "Move the selected action down", () => shift(1));

    function commit(focusItem) {
      ctx.onChange(value.slice());
      render();
      if (focusItem !== undefined && focusItem !== null) {
        const el = root.querySelector('[data-item="' + focusItem + '"]');
        if (el) el.focus();
      }
    }

    function place(item, index) {
      value = value.filter((v) => v !== item);
      const at = index === undefined || index === null ? value.length : Math.max(0, Math.min(index, value.length));
      value.splice(at, 0, item);
      announce(plain(q.items[item]) + " placed at position " + (at + 1) + " of " + value.length + ".");
      commit(item);
    }

    function removeItem(item) {
      if (!value.includes(item)) return;
      value = value.filter((v) => v !== item);
      announce(plain(q.items[item]) + " removed from the answer area.");
      commit(item);
    }

    function moveSelected(where) {
      if (selected === null) return;
      if (where === "answer" && !value.includes(selected)) place(selected);
      else if (where === "source") removeItem(selected);
    }

    function shift(delta) {
      const at = value.indexOf(selected);
      const to = at + delta;
      if (at < 0 || to < 0 || to >= value.length) return;
      value.splice(at, 1);
      value.splice(to, 0, selected);
      announce(plain(q.items[selected]) + " moved to position " + (to + 1) + ".");
      commit(selected);
    }

    function itemEl(item, inAnswer, position) {
      const grip = h("span", { class: "dnd-item__grip" }, icon("grip"));
      const el = h("button", {
        type: "button", class: "dnd-item" + (selected === item ? " is-selected" : ""),
        "data-item": String(item), "aria-pressed": selected === item ? "true" : "false", disabled: locked
      }, grip,
        inAnswer ? h("span", { class: "dnd-item__pos" }, String(position + 1)) : null,
        h("span", { class: "dnd-item__text" }, fmt(q.items[item])));
      if (ctx.reveal && inAnswer) {
        const ok = key[position] === item;
        el.classList.add(ok ? "is-correct" : "is-wrong");
        el.appendChild(h("span", { class: "mark mark--icon " + (ok ? "mark--ok" : "mark--bad") }, icon(ok ? "check" : "close", { size: 14, label: ok ? "Correct position" : "Incorrect position" })));
      }
      if (!locked) {
        el.addEventListener("click", () => { selected = selected === item ? null : item; render(); const again = root.querySelector('[data-item="' + item + '"]'); if (again) again.focus(); });
        el.addEventListener("dblclick", () => { selected = item; if (value.includes(item)) removeItem(item); else place(item); });
        el.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight" && !value.includes(item)) { e.preventDefault(); selected = item; place(item); }
          else if (e.key === "ArrowLeft" && value.includes(item)) { e.preventDefault(); selected = item; removeItem(item); }
          else if ((e.altKey || e.ctrlKey) && e.key === "ArrowUp") { e.preventDefault(); selected = item; shift(-1); }
          else if ((e.altKey || e.ctrlKey) && e.key === "ArrowDown") { e.preventDefault(); selected = item; shift(1); }
        });
        App.dnd.draggable(el, { payload: { item }, handle: grip, onStart: () => { selected = item; } });
      }
      return h("li", { class: "dnd-list__row" }, el);
    }

    function insertIndex(y) {
      const rows = Array.from(answerList.querySelectorAll(".dnd-list__row"));
      for (let i = 0; i < rows.length; i += 1) {
        const r = rows[i].getBoundingClientRect();
        if (y < r.top + r.height / 2) return i;
      }
      return rows.length;
    }

    answerList.dndHover = (payload, x, y) => {
      const rows = Array.from(answerList.querySelectorAll(".dnd-list__row"));
      const idx = insertIndex(y);
      if (idx >= rows.length) answerList.appendChild(marker); else answerList.insertBefore(marker, rows[idx]);
    };
    answerList.dndLeave = () => marker.remove();
    answerList.dndDrop = (payload, x, y) => {
      let idx = insertIndex(y);
      const from = value.indexOf(payload.item);
      if (from > -1 && from < idx) idx -= 1;
      selected = payload.item;
      place(payload.item, idx);
    };
    sourceList.dndDrop = (payload) => { selected = payload.item; removeItem(payload.item); render(); };

    function render() {
      App.clear(sourceList);
      App.clear(answerList);
      q.items.forEach((text, item) => { if (!value.includes(item)) sourceList.appendChild(itemEl(item, false)); });
      value.forEach((item, pos) => answerList.appendChild(itemEl(item, true, pos)));
      if (!sourceList.children.length) sourceList.appendChild(h("li", { class: "dnd-empty" }, "All actions have been moved."));
      if (!value.length) answerList.appendChild(h("li", { class: "dnd-empty" }, "Move actions here and arrange them in order."));
      const inAnswer = selected !== null && value.includes(selected);
      toAnswer.disabled = locked || selected === null || inAnswer;
      toSource.disabled = locked || !inAnswer;
      moveUp.disabled = locked || !inAnswer || value.indexOf(selected) === 0;
      moveDown.disabled = locked || !inAnswer || value.indexOf(selected) === value.length - 1;
    }

    const root = h("div", { class: "answer-area answer-area--flush" },
      h("div", { class: "order" },
        h("div", { class: "order__col" }, h("h3", { class: "order__title" }, q.sourceLabel || "Actions"), sourceList),
        h("div", { class: "order__moves" }, toAnswer, toSource),
        h("div", { class: "order__col" }, h("h3", { class: "order__title" }, "Answer Area"), answerList),
        h("div", { class: "order__moves" }, moveUp, moveDown)),
      locked ? null : hint("Drag an action into the answer area, or select it and use the arrow buttons. Use the up and down buttons to change the order."));
    render();
    return root;
  }

  /* ---------- Drag and drop: match values to targets ---------- */

  function matchWidget(q, ctx) {
    const key = E.keyOf(q);
    const value = Object.assign({}, ctx.answer || {});
    let selected = null;
    const locked = !!ctx.readOnly;

    const bank = h("ul", { class: "dnd-list dnd-list--bank", "data-dropzone": "bank", "aria-label": q.sourceLabel || "Values" });
    const slots = {};

    function commit(focusTarget) {
      ctx.onChange(Object.assign({}, value));
      render();
      if (focusTarget && slots[focusTarget]) slots[focusTarget].focus();
    }

    function assign(targetId, source) {
      value[targetId] = source;
      const target = q.targets.find((t) => t.id === targetId);
      announce(q.sources[source] + " placed in " + plain(target.label) + ".");
      selected = null;
      commit(targetId);
    }

    function clearTarget(targetId, focus) {
      if (value[targetId] === undefined) return;
      delete value[targetId];
      announce("Target cleared.");
      commit(focus ? targetId : null);
    }

    bank.dndDrop = (payload) => { if (payload.from) clearTarget(payload.from, false); };

    // A target is a wrapper (the drop zone) holding the target button and,
    // when filled, a separate clear button.
    function makeSlot(target, inline) {
      const wrap = h("span", { class: "slot" + (inline ? " slot--inline" : ""), "data-dropzone": "slot" });
      const button = h("button", { type: "button", class: "slot__target", disabled: locked });
      wrap.dndDrop = (payload) => {
        if (payload.from && payload.from !== target.id) delete value[payload.from];
        assign(target.id, payload.source);
      };
      if (!locked) {
        button.addEventListener("click", () => { if (selected !== null) assign(target.id, selected); });
        button.addEventListener("keydown", (e) => {
          if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); clearTarget(target.id, true); }
        });
        App.dnd.draggable(button, {
          payload: { get source() { return value[target.id]; }, from: target.id },
          disabled: () => value[target.id] === undefined
        });
      }
      slots[target.id] = button;
      wrap.appendChild(button);
      // The group leaves room beside the target for the correct value when revealed.
      return h("span", { class: "slot-group" }, wrap);
    }

    function fillSlot(target) {
      const button = slots[target.id];
      const wrap = button.parentElement;
      wrap.querySelectorAll(".slot__clear, .mark").forEach((el) => el.remove());
      const source = value[target.id];
      const filled = source !== undefined && source !== null;
      const name = plain(target.label);
      wrap.classList.toggle("is-filled", filled);
      wrap.classList.remove("is-correct", "is-wrong");
      button.textContent = filled ? q.sources[source] : " ";
      button.setAttribute("aria-label", filled
        ? name + " " + q.sources[source] + "." + (locked ? "" : " Press Delete to clear.")
        : name + " Empty." + (locked ? "" : " Select a value, then activate this target to place it."));
      if (filled && !locked) {
        wrap.appendChild(h("button", {
          type: "button", class: "slot__clear", "aria-label": "Clear " + name, title: "Clear",
          onclick: () => clearTarget(target.id, true)
        }, icon("close", { size: 12 })));
      }
      if (ctx.reveal) {
        const ok = filled && source === key[target.id];
        wrap.classList.add(ok ? "is-correct" : "is-wrong");
        wrap.appendChild(h("span", { class: "mark mark--icon " + (ok ? "mark--ok" : "mark--bad") }, icon(ok ? "check" : "close", { size: 14, label: ok ? "Correct" : "Incorrect" })));
        if (!ok) wrap.parentElement.appendChild(fixChip(q.sources[key[target.id]]));
      }
    }

    function render() {
      App.clear(bank);
      q.sources.forEach((text, source) => {
        const grip = h("span", { class: "dnd-item__grip" }, icon("grip"));
        const el = h("button", {
          type: "button", class: "dnd-item" + (selected === source ? " is-selected" : ""),
          "aria-pressed": selected === source ? "true" : "false", disabled: locked, "data-source": String(source)
        }, grip, h("span", { class: "dnd-item__text" }, text));
        if (!locked) {
          el.addEventListener("click", () => {
            selected = selected === source ? null : source;
            render();
            const again = bank.querySelector('[data-source="' + source + '"]');
            if (again) again.focus();
            if (selected !== null) announce(text + " selected. Choose a target to place it.");
          });
          App.dnd.draggable(el, { payload: { source }, handle: grip });
        }
        bank.appendChild(h("li", { class: "dnd-list__row" }, el));
      });
      q.targets.forEach(fillSlot);
      root.classList.toggle("has-selection", selected !== null);
    }

    let area;
    if (q.template) {
      area = h("pre", { class: "code code--template" });
      q.template.split(/(\{\{\w+\}\})/).forEach((part) => {
        const m = /^\{\{(\w+)\}\}$/.exec(part);
        if (!m) { area.appendChild(document.createTextNode(part)); return; }
        area.appendChild(makeSlot(q.targets.find((t) => t.id === m[1]), true));
      });
    } else {
      area = h("div", { class: "match__targets" }, q.targets.map((target) =>
        h("div", { class: "match__row" }, h("span", { class: "match__label" }, fmt(target.label)), makeSlot(target, false))));
    }

    const root = h("div", { class: "answer-area answer-area--flush" },
      h("div", { class: "match" },
        h("div", { class: "match__col match__col--bank" }, h("h3", { class: "order__title" }, q.sourceLabel || "Values"), bank),
        h("div", { class: "match__col" }, h("h3", { class: "order__title" }, "Answer Area"), area)),
      locked ? null : hint("Drag a value to a target, or select a value and then select the target. A value can be used more than once. Use the clear button on a target to empty it."));
    render();
    return root;
  }

  /* ---------- Factory ---------- */

  function createWidget(q, ctx) {
    switch (q.type) {
      case "single": case "multi": return choiceWidget(q, ctx);
      case "yesno": return yesNoWidget(q, ctx);
      case "dropdown": return dropdownWidget(q, ctx);
      case "order": return orderWidget(q, ctx);
      case "dragdrop": return matchWidget(q, ctx);
      default: return h("p", null, "Unsupported question type: " + q.type);
    }
  }

  /* ---------- Explanation panel ---------- */

  const isChoice = (q) => q.type === "single" || q.type === "multi";

  function joinLetters(keys) {
    const list = keys.slice().sort();
    return list.length > 1 ? list.slice(0, -1).join(", ") + " and " + list[list.length - 1] : list[0];
  }

  /**
   * The verdict strip shown directly above the answer options, so the result
   * and the marked options are visible together without scrolling.
   */
  function renderResult(q, answer, opts) {
    const o = opts || {};
    const g = E.grade(q, answer);
    const key = E.keyOf(q);
    const partial = g.status === "incorrect" && g.points > 0 && g.max > 1;
    const title = g.status === "correct" ? "Correct"
      : g.status === "unanswered" ? "Not answered"
      : partial ? "Incorrect \u2014 " + g.points + " of " + g.max + " selections correct" : "Incorrect";
    const statusIcon = g.status === "correct" ? "check" : g.status === "unanswered" ? "dash" : "close";

    const pair = (label, chips) => h("span", { class: "result__pair" }, h("span", { class: "result__label" }, label), chips);
    let detail;
    if (isChoice(q)) {
      const mine = g.status === "unanswered" ? null
        : pair("Your answer", answer.slice().sort().map((k) => keyChip(k, key.includes(k) ? "ok" : "bad")));
      detail = [mine, g.status === "correct" ? null : pair("Correct answer", key.slice().sort().map((k) => keyChip(k, "ok")))];
    } else {
      detail = g.status === "correct" ? null
        : h("span", { class: "result__hint" }, g.status === "unanswered"
          ? "The correct answer is listed under Correct answer below."
          : q.type === "order"
            ? "A green check marks each action that is in the right position. A red cross marks each one that is not. The correct order is listed below."
            : "A green check marks each correct selection. A red cross marks each of yours that is wrong, with the correct value beside it.");
    }

    return h("div", { class: "result result--" + g.status, tabindex: "-1" },
      h("span", { class: "result__status" },
        h("span", { class: "result__icon" }, icon(statusIcon, { size: 16 })),
        h("strong", { class: "result__title" }, title)),
      detail,
      o.flagged ? h("span", { class: "tag tag--flag" }, icon("flag", { size: 12 }), "Marked for review") : null);
  }

  function answerLines(q, value, useKey) {
    if (isChoice(q)) {
      const key = E.keyOf(q);
      const keys = (useKey ? key : value || []).slice().sort();
      if (!keys.length) return h("p", { class: "muted" }, "No answer selected.");
      return h("ul", { class: "answer-lines" }, keys.map((k) => {
        const opt = q.options.find((x) => x.key === k);
        return h("li", null, keyChip(k, key.includes(k) ? "ok" : "bad"), opt && opt.text ? h("span", null, fmt(opt.text)) : h("span", null, "Option " + k));
      }));
    }
    const lines = E.describe(q, value, useKey);
    if (!lines.length) return h("p", { class: "muted" }, "No answer selected.");
    return h("ul", { class: "answer-lines" }, lines.map((l) => h("li", null, l)));
  }

  function answerCard(tone, iconName, title, body, wide) {
    return h("div", { class: "answer-card answer-card--" + tone + (wide ? " answer-card--wide" : "") },
      h("h4", { class: "answer-card__title" }, icon(iconName, { size: 14 }), title), body);
  }

  function renderFeedback(q, answer) {
    const g = E.grade(q, answer);
    const ex = q.explanation;
    const key = E.keyOf(q);
    const chosen = isChoice(q) && Array.isArray(answer) ? answer : [];

    const section = (title, ...kids) => h("section", { class: "fb__section" }, h("h4", { class: "fb__heading" }, title), kids);

    const cards = g.status === "correct"
      ? answerCard("ok", "check", "Your answer \u2014 correct", answerLines(q, answer, false), true)
      : [
        g.status === "unanswered"
          ? answerCard("none", "dash", "Your answer", h("p", { class: "muted" }, "No answer selected."))
          : answerCard("bad", "close", "Your answer", answerLines(q, answer, false)),
        answerCard("ok", "check", "Correct answer", answerLines(q, null, true))
      ];

    const whyTitle = isChoice(q)
      ? "Why " + joinLetters(key) + (key.length > 1 ? " are" : " is") + " correct"
      : "Why this is correct";

    // For choice questions each wrong option is labelled with its letter and
    // whether it was the user's pick.
    const reasons = ex.wrong && ex.wrong.length
      ? h("dl", { class: "reasons" }, ex.wrong.map(([label, reason]) => {
        const term = isChoice(q)
          ? h("dt", null, keyChip(label, "bad"), chosen.includes(label) ? h("span", { class: "tag" }, "Your answer") : null)
          : h("dt", null, fmt(label));
        return [term, h("dd", null, fmt(reason))];
      }))
      : null;

    return h("div", { class: "fb", role: "region", "aria-label": "Answer explanation" },
      h("div", { class: "fb__answers" }, cards),
      h("section", { class: "fb__section" },
        h("h4", { class: "fb__heading fb__heading--ok" }, icon("check", { size: 16 }), whyTitle),
        ex.correct.map((p) => h("p", null, fmt(p)))),
      reasons ? h("section", { class: "fb__section" },
        h("h4", { class: "fb__heading" + (q.type === "yesno" ? "" : " fb__heading--bad") },
          q.type === "yesno" ? null : icon("close", { size: 16 }),
          q.type === "yesno" ? "Statement by statement" : "Why the other options are incorrect"),
        reasons) : null,
      ex.logic ? section("Elimination logic", h("p", null, fmt(ex.logic))) : null,
      section("Concept tested", h("p", null, fmt(ex.concept))),
      h("section", { class: "fb__section fb__takeaway" }, h("h4", { class: "fb__heading" }, "Exam takeaway"), h("p", null, fmt(ex.takeaway))),
      ex.refs && ex.refs.length ? section("Reference",
        h("ul", { class: "plain-list" }, ex.refs.map(([label, url]) => h("li", null, h("a", { href: url, target: "_blank", rel: "noopener noreferrer" }, label))))) : null,
      h("dl", { class: "fb__meta" },
        h("div", null, h("dt", null, "Skill area"), h("dd", null, E.data.domains[q.domain])),
        h("div", null, h("dt", null, "Topic"), h("dd", null, q.topic)),
        h("div", null, h("dt", null, "Type"), h("dd", null, E.TYPE_LABELS[q.type])),
        h("div", null, h("dt", null, "Difficulty"), h("dd", null, q.difficulty)),
        h("div", null, h("dt", null, "Source"), h("dd", null, "Question " + q.source))));
  }

  App.widgets = { renderBlocks, createWidget, renderResult, renderFeedback };
})();
