/* Placeholder for Copyright */

import { Observable, fromEvent } from "rxjs"
import { map, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport size
 */
export interface ViewportSize {
  width: number                        /* Viewport width */
  height: number                       /* Viewport height */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve viewport size
 *
 * @returns Viewport size
 */
export function getViewportSize(): ViewportSize {
  return {
    width:  innerWidth,
    height: innerHeight
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch viewport size
 *
 * @returns Viewport size observable
 */
export function watchViewportSize(): Observable<ViewportSize> {
  return fromEvent(window, "resize", { passive: true })
    .pipe(
      map(getViewportSize),
      startWith(getViewportSize())
    )
}
