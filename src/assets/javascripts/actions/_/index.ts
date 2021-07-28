/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set focusable property
 *
 * @param el - Element
 * @param value - Tabindex value
 */
export function setFocusable(
  el: HTMLElement, value = 0
): void {
  el.setAttribute("tabindex", value.toString())
}

/**
 * Reset focusable property
 *
 * @param el - Element
 */
export function resetFocusable(
  el: HTMLElement
): void {
  el.removeAttribute("tabindex")
}

/**
 * Set scroll lock
 *
 * @param el - Scrollable element
 * @param value - Vertical offset
 */
export function setScrollLock(
  el: HTMLElement, value: number
): void {
  el.setAttribute("data-md-state", "lock")
  el.style.top = `-${value}px`
}

/**
 * Reset scroll lock
 *
 * @param el - Scrollable element
 */
export function resetScrollLock(
  el: HTMLElement
): void {
  const value = -1 * parseInt(el.style.top, 10)
  el.removeAttribute("data-md-state")
  el.style.top = ""
  if (value)
    window.scrollTo(0, value)
}
