/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set back-to-top state
 *
 * @param el - Back-to-top element
 * @param state - Back-to-top state
 */
export function setBackToTopState(
  el: HTMLElement, state: "hidden"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset back-to-top state
 *
 * @param el - Back-to-top element
 */
export function resetBackToTopState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}

/* ------------------------------------------------------------------------- */

/**
 * Set back-to-top offset
 *
 * @param el - Back-to-top element
 * @param value - Back-to-top offset
 */
export function setBackToTopOffset(
  el: HTMLElement, value: number
): void {
  el.style.top = `${value}px`
}

/**
 * Reset back-to-top offset
 *
 * @param el - Back-to-top element
 */
export function resetBackToTopOffset(
  el: HTMLElement
): void {
  el.style.top = ""
}
