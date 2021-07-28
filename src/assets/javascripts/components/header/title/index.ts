/* Placeholder for Copyright */

import {
  NEVER,
  Observable,
  Subject,
  animationFrameScheduler
} from "rxjs"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  tap
} from "rxjs/operators"

import {
  resetHeaderTitleState,
  setHeaderTitleState
} from "~/actions"
import {
  Viewport,
  getElement,
  getElementSize,
  watchViewportAt
} from "~/browser"

import { Component } from "../../_"
import { Header } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface HeaderTitle {
  active: boolean                      /* User scrolled past first headline */
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
 * Watch header title
 *
 * @param el - Heading element
 * @param options - Options
 *
 * @returns Header title observable
 */
export function watchHeaderTitle(
  el: HTMLHeadingElement, { viewport$, header$ }: WatchOptions
): Observable<HeaderTitle> {
  return watchViewportAt(el, { header$, viewport$ })
    .pipe(
      map(({ offset: { y } }) => {
        const { height } = getElementSize(el)
        return {
          active: y >= height
        }
      }),
      distinctUntilKeyChanged("active")
    )
}

/**
 * Mount header title
 *
 * This function swaps the header title from the site title to the title of the
 * current page when the user scrolls past the first headline.
 *
 * @param el - Header title element
 * @param options - Options
 *
 * @returns Header title component observable
 */
export function mountHeaderTitle(
  el: HTMLElement, options: MountOptions
): Observable<Component<HeaderTitle>> {
  const internal$ = new Subject<HeaderTitle>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe(({ active }) => {
        if (active)
          setHeaderTitleState(el, "active")
        else
          resetHeaderTitleState(el)
      })

  /* Obtain headline, if any */
  const headline = getElement<HTMLHeadingElement>("article h1")
  if (typeof headline === "undefined")
    return NEVER

  /* Create and return component */
  return watchHeaderTitle(headline, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
