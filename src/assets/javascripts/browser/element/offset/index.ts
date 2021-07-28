/* Placeholder for Copyright */

import { Observable, fromEvent, merge } from "rxjs"
import {
  distinctUntilChanged,
  map,
  startWith
} from "rxjs/operators"

import {
  getElementContentSize,
  getElementSize
} from "../size"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Element offset
 */
export interface ElementOffset {
  x: number                            /* Horizontal offset */
  y: number                            /* Vertical offset */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element offset
 *
 * @param el - Element
 *
 * @returns Element offset
 */
export function getElementOffset(el: HTMLElement): ElementOffset {
  return {
    x: el.scrollLeft,
    y: el.scrollTop
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element offset
 *
 * @param el - Element
 *
 * @returns Element offset observable
 */
export function watchElementOffset(
  el: HTMLElement
): Observable<ElementOffset> {
  return merge(
    fromEvent(el, "scroll"),
    fromEvent(window, "resize")
  )
    .pipe(
      map(() => getElementOffset(el)),
      startWith(getElementOffset(el))
    )
}

/**
 * Watch element threshold
 *
 * This function returns an observable which emits whether the bottom scroll
 * offset of an elements is within a certain threshold.
 *
 * @param el - Element
 * @param threshold - Threshold
 *
 * @returns Element threshold observable
 */
export function watchElementThreshold(
  el: HTMLElement, threshold = 16
): Observable<boolean> {
  return watchElementOffset(el)
    .pipe(
      map(({ y }) => {
        const visible = getElementSize(el)
        const content = getElementContentSize(el)
        return y >= (
          content.height - visible.height - threshold
        )
      }),
      distinctUntilChanged()
    )
}
