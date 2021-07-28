/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set dialog message
 *
 * @param el - Dialog element
 * @param value - Dialog message
 */
export function setDialogMessage(
  el: HTMLElement, value: string
): void {
  el.firstElementChild!.innerHTML = value
}

/* ------------------------------------------------------------------------- */

/**
 * Set dialog state
 *
 * @param el - Dialog element
 * @param state - Dialog state
 */
export function setDialogState(
  el: HTMLElement, state: "open"
): void {
  el.setAttribute("data-md-state", state)
}

/**
 * Reset dialog state
 *
 * @param el - Dialog element
 */
export function resetDialogState(
  el: HTMLElement
): void {
  el.removeAttribute("data-md-state")
}
