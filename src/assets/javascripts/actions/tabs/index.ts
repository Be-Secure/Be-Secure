/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set tabs state
 *
 * @param el - Tabs element
 * @param state - Tabs state
 */
export function setTabsState(
  el: HTMLElement, state: "hidden"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset tabs state
 *
 * @param el - Tabs element
 */
export function resetTabsState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}
