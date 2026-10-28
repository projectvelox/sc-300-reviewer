/*
 * Pointer-based drag and drop that works with mouse, pen and touch.
 *
 * A draggable starts a drag after the pointer moves a few pixels, so a plain
 * click or tap still reaches the element (click-to-select is the non-drag
 * alternative for every interaction). On touch, a drag starts only from the
 * element's grip handle, which leaves the rest of the item free for scrolling.
 *
 * Drop zones are elements with [data-dropzone] and these optional properties:
 *   zone.dndAccepts(payload) -> boolean
 *   zone.dndHover(payload, x, y)   called while a drag is over the zone
 *   zone.dndLeave()                called when the drag leaves or ends
 *   zone.dndDrop(payload, x, y)    called on release over the zone
 */
(function () {
  "use strict";

  const THRESHOLD = 6;
  const EDGE = 56;
  let active = null;

  function findZone(x, y, payload) {
    const hit = document.elementFromPoint(x, y);
    let zone = hit ? hit.closest("[data-dropzone]") : null;
    while (zone && zone.dndAccepts && !zone.dndAccepts(payload)) {
      zone = zone.parentElement ? zone.parentElement.closest("[data-dropzone]") : null;
    }
    return zone;
  }

  function scrollParent(el) {
    let node = el.parentElement;
    while (node && node !== document.body) {
      const style = window.getComputedStyle(node);
      if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) return node;
      node = node.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }

  function setZone(zone) {
    if (active.zone === zone) return;
    if (active.zone) {
      active.zone.classList.remove("is-over");
      if (active.zone.dndLeave) active.zone.dndLeave();
    }
    active.zone = zone;
    if (zone) zone.classList.add("is-over");
  }

  function begin(e) {
    const rect = active.el.getBoundingClientRect();
    const ghost = active.el.cloneNode(true);
    ghost.classList.add("dnd-ghost");
    ghost.removeAttribute("id");
    ghost.style.width = rect.width + "px";
    ghost.setAttribute("aria-hidden", "true");
    document.body.appendChild(ghost);
    active.ghost = ghost;
    active.offsetX = active.startX - rect.left;
    active.offsetY = active.startY - rect.top;
    active.dragging = true;
    active.scroller = scrollParent(active.el);
    active.el.classList.add("is-drag-source");
    document.body.classList.add("is-dragging");
    if (active.opts.onStart) active.opts.onStart();
    move(e);
  }

  function move(e) {
    const x = e.clientX;
    const y = e.clientY;
    active.ghost.style.transform = "translate(" + (x - active.offsetX) + "px," + (y - active.offsetY) + "px)";
    const zone = findZone(x, y, active.opts.payload);
    setZone(zone);
    if (zone && zone.dndHover) zone.dndHover(active.opts.payload, x, y);
    // Keep the target reachable when the answer area is off screen.
    if (y < EDGE) active.scroller.scrollBy(0, -14);
    else if (y > window.innerHeight - EDGE) active.scroller.scrollBy(0, 14);
  }

  function cleanup() {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    window.removeEventListener("keydown", onKey, true);
    if (!active) return;
    setZone(null);
    if (active.ghost) active.ghost.remove();
    active.el.classList.remove("is-drag-source");
    document.body.classList.remove("is-dragging");
    active = null;
  }

  function onMove(e) {
    if (!active || e.pointerId !== active.pointerId) return;
    if (!active.dragging) {
      if (Math.hypot(e.clientX - active.startX, e.clientY - active.startY) < THRESHOLD) return;
      begin(e);
      return;
    }
    e.preventDefault();
    move(e);
  }

  function swallowNextClick() {
    const stop = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
    window.addEventListener("click", stop, { capture: true, once: true });
    window.setTimeout(() => window.removeEventListener("click", stop, { capture: true }), 0);
  }

  function onUp(e) {
    if (!active || e.pointerId !== active.pointerId) return;
    if (!active.dragging) { cleanup(); return; }
    const zone = findZone(e.clientX, e.clientY, active.opts.payload);
    const payload = active.opts.payload;
    cleanup();
    swallowNextClick();
    if (zone && zone.dndDrop) zone.dndDrop(payload, e.clientX, e.clientY);
  }

  function onCancel() { cleanup(); }

  function onKey(e) {
    if (e.key === "Escape" && active && active.dragging) { e.preventDefault(); e.stopPropagation(); cleanup(); }
  }

  /** opts: { payload, handle?, disabled?() , onStart?() } */
  function draggable(el, opts) {
    el.addEventListener("pointerdown", (e) => {
      if (active) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (opts.disabled && opts.disabled()) return;
      if (e.pointerType === "touch" && opts.handle && !opts.handle.contains(e.target)) return;
      if (e.target.closest("[data-no-drag]")) return;
      active = { el, opts, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, dragging: false, ghost: null, zone: null };
      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onCancel);
      window.addEventListener("keydown", onKey, true);
    });
    // Suppress the native drag of text/images inside the item.
    el.addEventListener("dragstart", (e) => e.preventDefault());
  }

  window.App.dnd = { draggable };
})();
