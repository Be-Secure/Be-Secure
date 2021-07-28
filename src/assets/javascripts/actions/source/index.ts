/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set repository facts
 *
 * @param el - Repository element
 * @param child - Repository facts element
 */
export function setSourceFacts(
  el: HTMLElement, child: Element
): void {
  el.lastElementChild!.appendChild(child)
}

/**
 * Set repository state
 *
 * @param el - Repository element
 * @param state - Repository state
 */
export function setSourceState(
  el: HTMLElement, state: "done"
): void {
  el.lastElementChild!.setAttribute("data-md-state", state)
}
