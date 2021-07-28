/* Placeholder for Copyright */

import { translation } from "~/_"
import { round } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set number of search results
 *
 * @param el - Search result metadata element
 * @param value - Number of results
 */
export function setSearchResultMeta(
  el: HTMLElement, value: number
): void {
  switch (value) {

    /* No results */
    case 0:
      el.textContent = translation("search.result.none")
      break

    /* One result */
    case 1:
      el.textContent = translation("search.result.one")
      break

    /* Multiple result */
    default:
      el.textContent = translation("search.result.other", round(value))
  }
}

/**
 * Reset number of search results
 *
 * @param el - Search result metadata element
 */
export function resetSearchResultMeta(
  el: HTMLElement
): void {
  el.textContent = translation("search.result.placeholder")
}

/* ------------------------------------------------------------------------- */

/**
 * Add an element to the search result list
 *
 * @param el - Search result list element
 * @param child - Search result element
 */
export function addToSearchResultList(
  el: HTMLElement, child: Element
): void {
  el.appendChild(child)
}

/**
 * Reset search result list
 *
 * @param el - Search result list element
 */
export function resetSearchResultList(
  el: HTMLElement
): void {
  el.innerHTML = ""
}
