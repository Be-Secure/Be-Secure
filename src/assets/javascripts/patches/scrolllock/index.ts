/* Placeholder for Copyright */

import {
  Observable,
  animationFrameScheduler,
  combineLatest,
  of
} from "rxjs"
import {
  delay,
  map,
  observeOn,
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import { resetScrollLock, setScrollLock } from "~/actions"
import { Viewport, watchToggle } from "~/browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  tablet$: Observable<boolean>         /* Tablet breakpoint observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch the document body to lock when search is open
 *
 * For mobile and tablet viewports, the search is rendered full screen, which
 * leads to scroll leaking when at the top or bottom of the search result. This
 * function locks the body when the search is in full screen mode, and restores
 * the scroll position when leaving.
 *
 * @param options - Options
 */
export function patchScrolllock(
  { viewport$, tablet$ }: PatchOptions
): void {
  combineLatest([watchToggle("search"), tablet$])
    .pipe(
      map(([active, tablet]) => active && !tablet),
      switchMap(active => of(active)
        .pipe(
          delay(active ? 400 : 100),
          observeOn(animationFrameScheduler)
        )
      ),
      withLatestFrom(viewport$)
    )
      .subscribe(([active, { offset: { y }}]) => {
        if (active)
          setScrollLock(document.body, y)
        else
          resetScrollLock(document.body)
      })
}
