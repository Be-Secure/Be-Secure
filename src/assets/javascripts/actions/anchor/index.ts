/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set anchor state
 *
 * @param el - Anchor element
 * @param state - Anchor state
 */
export function setAnchorState(
  el: HTMLElement, state: "blur"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset anchor state
 *
 * @param el - Anchor element
 */
export function resetAnchorState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}

/* ------------------------------------------------------------------------- */

/**
 * Set anchor active
 *
 * @param el - Anchor element
 * @param value - Whether the anchor is active
 */
export function setAnchorActive(
  el: HTMLElement, value: boolean
): void {
  el.classList.toggle("md-nav__link--active", value)
}

/**
 * Reset anchor active
 *
 * @param el - Anchor element
 */
export function resetAnchorActive(
  el: HTMLElement
): void {
  el.classList.remove("md-nav__link--active")
}
