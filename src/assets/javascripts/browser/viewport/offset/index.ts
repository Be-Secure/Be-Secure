/* Placeholder for Copyright */

import { Observable, fromEvent, merge } from "rxjs"
import { map, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport offset
 */
export interface ViewportOffset {
  x: number                            /* Horizontal offset */
  y: number                            /* Vertical offset */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve viewport offset
 *
 * On iOS Safari, viewport offset can be negative due to overflow scrolling.
 * As this may induce strange behaviors downstream, we'll just limit it to 0.
 *
 * @returns Viewport offset
 */
export function getViewportOffset(): ViewportOffset {
  return {
    x: Math.max(0, pageXOffset),
    y: Math.max(0, pageYOffset)
  }
}

/**
 * Set viewport offset
 *
 * @param offset - Viewport offset
 */
export function setViewportOffset(
  { x, y }: Partial<ViewportOffset>
): void {
  window.scrollTo(x || 0, y || 0)
}

/* ------------------------------------------------------------------------- */

/**
 * Watch viewport offset
 *
 * @returns Viewport offset observable
 */
export function watchViewportOffset(): Observable<ViewportOffset> {
  return merge(
    fromEvent(window, "scroll", { passive: true }),
    fromEvent(window, "resize", { passive: true })
  )
    .pipe(
      map(getViewportOffset),
      startWith(getViewportOffset())
    )
}
