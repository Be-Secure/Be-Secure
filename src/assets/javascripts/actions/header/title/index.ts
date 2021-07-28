/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set header title state
 *
 * @param el - Header title element
 * @param state - Header title state
 */
export function setHeaderTitleState(
  el: HTMLElement, state: "active"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset header title state
 *
 * @param el - Header title element
 */
export function resetHeaderTitleState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}
