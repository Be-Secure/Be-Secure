/* Placeholder for Copyright */

import { Observable, fromEvent, of } from "rxjs"
import {
  mapTo,
  mergeMap,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom
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
  tablet$: Observable<boolean>         /* Tablet breakpoint observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch indeterminate checkboxes
 *
 * This function replaces the indeterminate "pseudo state" with the actual
 * indeterminate state, which is used to keep navigation always expanded.
 *
 * @param options - Options
 */
export function patchIndeterminate(
  { document$, tablet$ }: PatchOptions
): void {
  document$
    .pipe(
      switchMap(() => of(...getElements<HTMLInputElement>(
        "[data-md-state=indeterminate]"
      ))),
      tap(el => {
        el.indeterminate = true
        el.checked = false
      }),
      mergeMap(el => fromEvent(el, "change")
        .pipe(
          takeWhile(() => el.hasAttribute("data-md-state")),
          mapTo(el)
        )
      ),
      withLatestFrom(tablet$)
    )
      .subscribe(([el, tablet]) => {
        el.removeAttribute("data-md-state")
        if (tablet)
          el.checked = false
      })
}
