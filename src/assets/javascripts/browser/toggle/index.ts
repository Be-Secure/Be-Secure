/* Placeholder for Copyright */

import { Observable, fromEvent } from "rxjs"
import { map, startWith } from "rxjs/operators"

import { getElementOrThrow } from "../element"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Toggle
 */
export type Toggle =
  | "drawer"                           /* Toggle for drawer */
  | "search"                           /* Toggle for search */

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Toggle map
 */
const toggles: Record<Toggle, HTMLInputElement> = {
  drawer: getElementOrThrow("[data-md-toggle=drawer]"),
  search: getElementOrThrow("[data-md-toggle=search]")
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the value of a toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value
 */
export function getToggle(name: Toggle): boolean {
  return toggles[name].checked
}

/**
 * Set toggle
 *
 * Simulating a click event seems to be the most cross-browser compatible way
 * of changing the value while also emitting a `change` event. Before, Material
 * used `CustomEvent` to programmatically change the value of a toggle, but this
 * is a much simpler and cleaner solution which doesn't require a polyfill.
 *
 * @param name - Toggle
 * @param value - Toggle value
 */
export function setToggle(name: Toggle, value: boolean): void {
  if (toggles[name].checked !== value)
    toggles[name].click()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value observable
 */
export function watchToggle(name: Toggle): Observable<boolean> {
  const el = toggles[name]
  return fromEvent(el, "change")
    .pipe(
      map(() => el.checked),
      startWith(el.checked)
    )
}
