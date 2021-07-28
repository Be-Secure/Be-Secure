/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set element text selection
 *
 * @param el - Element
 */
export function setElementSelection(
  el: HTMLElement
): void {
  if (el instanceof HTMLInputElement)
    el.select()
  else
    throw new Error("Not implemented")
}
