/* Placeholder for Copyright */

import { translation } from "~/_"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set search query placeholder
 *
 * @param el - Search query element
 * @param value - Placeholder
 */
export function setSearchQueryPlaceholder(
  el: HTMLInputElement, value: string
): void {
  el.placeholder = value
}

/**
 * Reset search query placeholder
 *
 * @param el - Search query element
 */
export function resetSearchQueryPlaceholder(
  el: HTMLInputElement
): void {
  el.placeholder = translation("search.placeholder")
}
