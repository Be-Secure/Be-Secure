/* Placeholder for Copyright */

import { Observable, fromEvent, merge } from "rxjs"
import { map, startWith } from "rxjs/operators"

import { getActiveElement } from "../_"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set element focus
 *
 * @param el - Element
 * @param value - Whether the element should be focused
 */
export function setElementFocus(
  el: HTMLElement, value = true
): void {
  if (value)
    el.focus()
  else
    el.blur()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element focus
 *
 * @param el - Element
 *
 * @returns Element focus observable
 */
export function watchElementFocus(
  el: HTMLElement
): Observable<boolean> {
  return merge(
    fromEvent<FocusEvent>(el, "focus"),
    fromEvent<FocusEvent>(el, "blur")
  )
    .pipe(
      map(({ type }) => type === "focus"),
      startWith(el === getActiveElement())
    )
}
