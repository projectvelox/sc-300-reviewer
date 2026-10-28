/* Shared helpers: DOM construction, text formatting, icons, storage, dialogs. */
(function () {
  "use strict";

  const App = (window.App = {});

  /* ---------- DOM ---------- */

  function append(parent, kid) {
    if (kid === null || kid === undefined || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach((k) => append(parent, k)); return; }
    parent.appendChild(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }

  /** h("div", { class: "x", onclick: fn }, child, ...) */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const key of Object.keys(attrs)) {
        const val = attrs[key];
        if (val === null || val === undefined || val === false) continue;
        if (key === "class") el.className = val;
        else if (key === "text") el.textContent = val;
        else if (key === "dataset") Object.assign(el.dataset, val);
        else if (key.startsWith("on") && typeof val === "function") el.addEventListener(key.slice(2), val);
        else if (val === true) el.setAttribute(key, "");
        else el.setAttribute(key, val);
      }
    }
    append(el, kids);
    return el;
  }

  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  }

  /**
   * Formats bank text: `code`, **strong** and newlines. Everything else is
   * inserted as text, so bank content can never inject markup.
   */
  function fmt(text) {
    const frag = document.createDocumentFragment();
    String(text).split(/(`[^`]+`|\*\*[^*]+\*\*|\n)/).forEach((part) => {
      if (!part) return;
      if (part === "\n") frag.appendChild(document.createElement("br"));
      else if (part.length > 2 && part[0] === "`" && part[part.length - 1] === "`") frag.appendChild(h("code", null, part.slice(1, -1)));
      else if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) frag.appendChild(h("strong", null, part.slice(2, -2)));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  /** Plain-text version of bank text, for summaries and aria labels. */
  function plain(text) {
    return String(text).replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  }

  /* ---------- Icons (inline SVG, decorative unless given a label) ---------- */

  const ICONS = {
    check: "M3.5 8.5l3 3 6-7",
    close: "M4 4l8 8M12 4l-8 8",
    flag: "M4 14V2.5M4 3h7.5l-1.8 2.75L11.5 8.5H4",
    lock: "M4.5 7V5a3.5 3.5 0 017 0v2M3.5 7h9v6.5h-9z",
    info: "M8 7.2v4.3M8 4.6v.2M8 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z",
    clock: "M8 4.5V8l2.5 1.5M8 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z",
    left: "M10 3L5 8l5 5",
    right: "M6 3l5 5-5 5",
    up: "M3 10l5-5 5 5",
    down: "M3 6l5 5 5-5",
    grid: "M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM2.5 9.5h4v4h-4zM9.5 9.5h4v4h-4z",
    grip: "M6 3.5v.01M10 3.5v.01M6 8v.01M10 8v.01M6 12.5v.01M10 12.5v.01",
    doc: "M4 1.5h5l3 3v10H4zM9 1.5v3h3",
    warn: "M8 6v3.5M8 11.6v.2M8 1.8l6.5 12H1.5z",
    dash: "M4 8h8"
  };

  function icon(name, opts) {
    const o = opts || {};
    const size = o.size || 16;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", name === "grip" ? "2.2" : "1.5");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "icon" + (o.class ? " " + o.class : ""));
    if (o.label) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", o.label); }
    else svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", ICONS[name] || "");
    svg.appendChild(path);
    return svg;
  }

  /* ---------- Formatting ---------- */

  function formatDuration(totalSeconds) {
    const s = Math.max(0, Math.round(totalSeconds));
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return hh > 0 ? hh + ":" + pad(mm) + ":" + pad(ss) : pad(mm) + ":" + pad(ss);
  }

  /** "1 h 12 min", "12 min 5 s" — for results and history. */
  function formatSpan(totalSeconds) {
    const s = Math.max(0, Math.round(totalSeconds));
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    if (hh > 0) return hh + " h " + mm + " min";
    if (mm > 0) return mm + " min " + ss + " s";
    return ss + " s";
  }

  function formatDate(ts, withTime) {
    const d = new Date(ts);
    const opts = withTime === false
      ? { year: "numeric", month: "short", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" };
    try { return d.toLocaleString(undefined, opts); } catch (e) { return d.toString(); }
  }

  function percent(part, whole) {
    return whole > 0 ? Math.round((part / whole) * 100) : 0;
  }

  /* ---------- Storage ---------- */

  // One storage namespace per exam, so two reviewers opened on the same machine never mix history.
  const PREFIX = String(window.EXAM.exam.code).toLowerCase().replace(/[^a-z0-9]+/g, "") + ".v1.";
  const memory = {};

  const store = {
    get(key, fallback) {
      try {
        const raw = window.localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return key in memory ? memory[key] : fallback;
      }
    },
    set(key, value) {
      memory[key] = value;
      try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    remove(key) {
      delete memory[key];
      try { window.localStorage.removeItem(PREFIX + key); } catch (e) { /* storage unavailable */ }
    },
    available() {
      try {
        window.localStorage.setItem(PREFIX + "probe", "1");
        window.localStorage.removeItem(PREFIX + "probe");
        return true;
      } catch (e) { return false; }
    }
  };

  /* ---------- Live region ---------- */

  let liveTimer = null;
  function announce(message) {
    const region = document.getElementById("live-region");
    if (!region) return;
    region.textContent = "";
    window.clearTimeout(liveTimer);
    liveTimer = window.setTimeout(() => { region.textContent = message; }, 40);
  }

  /* ---------- Modal dialog ---------- */

  /**
   * Shows a modal and resolves with the value of the chosen action
   * (or null when dismissed with Escape).
   * actions: [{ label, value, kind: "primary" | "secondary" | "danger" }]
   */
  function dialog(opts) {
    return new Promise((resolve) => {
      const titleId = "dlg-title-" + Date.now();
      const dlg = h("dialog", { class: "dialog", "aria-labelledby": titleId });
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        if (dlg.open) dlg.close();
        dlg.remove();
        resolve(value);
      };
      const body = h("div", { class: "dialog__body" });
      (Array.isArray(opts.body) ? opts.body : [opts.body]).forEach((b) => {
        if (b === null || b === undefined) return;
        body.appendChild(typeof b === "string" ? h("p", null, fmt(b)) : b);
      });
      const actions = h("div", { class: "dialog__actions" },
        (opts.actions || [{ label: "OK", value: true, kind: "primary" }]).map((a) =>
          h("button", { type: "button", class: "btn btn--" + (a.kind || "secondary"), onclick: () => finish(a.value) }, a.label)));
      dlg.appendChild(h("h2", { class: "dialog__title", id: titleId }, opts.title));
      dlg.appendChild(body);
      dlg.appendChild(actions);
      dlg.addEventListener("cancel", (e) => { e.preventDefault(); if (opts.dismissible !== false) finish(null); });
      document.body.appendChild(dlg);
      dlg.showModal();
      const first = actions.querySelector(".btn--primary") || actions.querySelector("button");
      if (first) first.focus();
    });
  }

  let uidCounter = 0;
  function uid(prefix) { uidCounter += 1; return (prefix || "id") + "-" + uidCounter; }

  Object.assign(App, { h, clear, fmt, plain, icon, formatDuration, formatSpan, formatDate, percent, store, announce, dialog, uid });
})();
