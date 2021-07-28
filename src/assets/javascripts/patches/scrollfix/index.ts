/* Placeholder for Copyright */

import { Observable, fromEvent, of } from "rxjs"
import {
  filter,
  mapTo,
  mergeMap,
  switchMap,
  tap
} from "rxjs/operators"

import { getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Check whether the given device is an Apple device
 *
 * @returns Test result
 */
function isAppleDevice(): boolean {
  return /(iPad|iPhone|iPod)/.test(navigator.userAgent)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch all elements with `data-md-scrollfix` attributes
 *
 * This is a year-old patch which ensures that overflow scrolling works at the
 * top and bottom of containers on iOS by ensuring a `1px` scroll offset upon
 * the start of a touch event.
 *
 * @see https://bit.ly/2SCtAOO - Original source
 *
 * @param options - Options
 */
export function patchScrollfix(
  { document$ }: PatchOptions
): void {
  document$
    .pipe(
      switchMap(() => of(...getElements("[data-md-scrollfix]"))),
      tap(el => el.removeAttribute("data-md-scrollfix")),
      filter(isAppleDevice),
      mergeMap(el => fromEvent(el, "touchstart")
        .pipe(
          mapTo(el)
        )
      )
    )
      .subscribe(el => {
        const top = el.scrollTop

        /* We're at the top of the container */
        if (top === 0) {
          el.scrollTop = 1

        /* We're at the bottom of the container */
        } else if (top + el.offsetHeight === el.scrollHeight) {
          el.scrollTop = top - 1
        }
      })
}
