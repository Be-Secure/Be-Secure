/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set header state
 *
 * @param el - Header element
 * @param state - Header state
 */
export function setHeaderState(
  el: HTMLElement, state: "shadow" | "hidden"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset header state
 *
 * @param el - Header element
 */
export function resetHeaderState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}
