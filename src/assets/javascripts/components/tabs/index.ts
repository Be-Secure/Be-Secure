/* Placeholder for Copyright */

import { Observable, Subject, animationFrameScheduler } from "rxjs"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  switchMap,
  tap
} from "rxjs/operators"

import { resetTabsState, setTabsState } from "~/actions"
import {
  Viewport,
  watchElementSize,
  watchViewportAt
} from "~/browser"

import { Component } from "../_"
import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Navigation tabs
 */
export interface Tabs {
  hidden: boolean                      /* User scrolled past tabs */
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
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch navigation tabs
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs observable
 */
export function watchTabs(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<Tabs> {
  return watchElementSize(document.body)
    .pipe(
      switchMap(() => watchViewportAt(el, { header$, viewport$ })),
      map(({ offset: { y } }) => {
        return {
          hidden: y >= 10
        }
      }),
      distinctUntilKeyChanged("hidden")
    )
}

/**
 * Mount navigation tabs
 *
 * This function hides the navigation tabs when scrolling past the threshold
 * and makes them reappear in a nice CSS animation when scrolling back up.
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs component observable
 */
export function mountTabs(
  el: HTMLElement, options: MountOptions
): Observable<Component<Tabs>> {
  const internal$ = new Subject<Tabs>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe({

        /* Update state */
        next({ hidden }) {
          if (hidden)
            setTabsState(el, "hidden")
          else
            resetTabsState(el)
        },

        /* Reset on complete */
        complete() {
          resetTabsState(el)
        }
      })

  /* Create and return component */
  return watchTabs(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
