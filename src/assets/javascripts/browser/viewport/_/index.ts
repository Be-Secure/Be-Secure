/* Placeholder for Copyright */

import { Observable, combineLatest } from "rxjs"
import {
  distinctUntilKeyChanged,
  map,
  shareReplay
} from "rxjs/operators"

import { Header } from "~/components"

import {
  ViewportOffset,
  watchViewportOffset
} from "../offset"
import {
  ViewportSize,
  watchViewportSize
} from "../size"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport
 */
export interface Viewport {
  offset: ViewportOffset               /* Viewport offset */
  size: ViewportSize                   /* Viewport size */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch at options
 */
interface WatchAtOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch viewport
 *
 * @returns Viewport observable
 */
export function watchViewport(): Observable<Viewport> {
  return combineLatest([
    watchViewportOffset(),
    watchViewportSize()
  ])
    .pipe(
      map(([offset, size]) => ({ offset, size })),
      shareReplay(1)
    )
}

/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @returns Viewport observable
 */
export function watchViewportAt(
  el: HTMLElement, { viewport$, header$ }: WatchAtOptions
): Observable<Viewport> {
  const size$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size")
    )

  /* Compute element offset */
  const offset$ = combineLatest([size$, header$])
    .pipe(
      map((): ViewportOffset => ({
        x: el.offsetLeft,
        y: el.offsetTop
      }))
    )

  /* Compute relative viewport, return hot observable */
  return combineLatest([header$, viewport$, offset$])
    .pipe(
      map(([{ height }, { offset, size }, { x, y }]) => ({
        offset: {
          x: offset.x - x,
          y: offset.y - y + height
        },
        size
      }))
    )
}
