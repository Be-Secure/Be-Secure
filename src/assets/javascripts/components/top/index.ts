/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  animationFrameScheduler,
  combineLatest
} from "rxjs"
import {
  bufferCount,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  tap,
  withLatestFrom
} from "rxjs/operators"

import {
  resetBackToTopOffset,
  resetBackToTopState,
  setBackToTopOffset,
  setBackToTopState
} from "~/actions"
import { Viewport, setElementFocus } from "~/browser"

import { Component } from "../_"
import { Header } from "../header"
import { Main } from "../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Back-to-top button
 */
export interface BackToTop {
  hidden: boolean                      /* User scrolled up */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch back-to-top
 *
 * @param _el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top observable
 */
export function watchBackToTop(
  _el: HTMLElement, { viewport$, main$ }: WatchOptions
): Observable<BackToTop> {

  /* Compute direction */
  const direction$ = viewport$
    .pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => a > b && b),
      distinctUntilChanged()
    )

  /* Compute whether button should be hidden */
  const hidden$ = main$
    .pipe(
      distinctUntilKeyChanged("active")
    )

  /* Compute threshold for hiding */
  return combineLatest([hidden$, direction$])
    .pipe(
      map(([{ active }, direction]) => ({
        hidden: !(active && direction)
      })),
      distinctUntilChanged((a, b) => (
        a.hidden === b.hidden
      ))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount back-to-top
 *
 * @param el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top component observable
 */
export function mountBackToTop(
  el: HTMLElement, { viewport$, header$, main$ }: MountOptions
): Observable<Component<BackToTop>> {
  const internal$ = new Subject<BackToTop>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      withLatestFrom(header$
        .pipe(
          distinctUntilKeyChanged("height")
        )
      )
    )
      .subscribe({

        /* Update state */
        next([{ hidden }, { height }]) {
          setBackToTopOffset(el, height + 16)
          if (hidden) {
            setBackToTopState(el, "hidden")
            setElementFocus(el, false)
          } else {
            resetBackToTopState(el)
          }
        },

        /* Reset on complete */
        complete() {
          resetBackToTopOffset(el)
          resetBackToTopState(el)
        }
      })

  /* Create and return component */
  return watchBackToTop(el, { viewport$, header$, main$ })
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
