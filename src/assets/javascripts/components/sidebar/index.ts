/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  animationFrameScheduler,
  combineLatest
} from "rxjs"
import {
  distinctUntilChanged,
  finalize,
  map,
  observeOn,
  tap,
  withLatestFrom
} from "rxjs/operators"

import {
  resetSidebarHeight,
  resetSidebarOffset,
  setSidebarHeight,
  setSidebarOffset
} from "~/actions"
import { Viewport } from "~/browser"

import { Component } from "../_"
import { Header } from "../header"
import { Main } from "../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sidebar
 */
export interface Sidebar {
  height: number                       /* Sidebar height */
  locked: boolean                      /* User scrolled past header */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
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
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar observable
 */
export function watchSidebar(
  el: HTMLElement, { viewport$, main$ }: WatchOptions
): Observable<Sidebar> {
  const adjust =
    el.parentElement!.offsetTop -
    el.parentElement!.parentElement!.offsetTop

  /* Compute the sidebar's available height and if it should be locked */
  return combineLatest([main$, viewport$])
    .pipe(
      map(([{ offset, height }, { offset: { y } }]) => {
        height = height
          + Math.min(adjust, Math.max(0, y - offset))
          - adjust
        return {
          height,
          locked: y >= offset + adjust
        }
      }),
      distinctUntilChanged((a, b) => (
        a.height === b.height &&
        a.locked === b.locked
      ))
    )
}

/**
 * Mount sidebar
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @returns Sidebar component observable
 */
export function mountSidebar(
  el: HTMLElement, { header$, ...options }: MountOptions
): Observable<Component<Sidebar>> {
  const internal$ = new Subject<Sidebar>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      withLatestFrom(header$)
    )
      .subscribe({

        /* Update height and offset */
        next([{ height }, { height: offset }]) {
          setSidebarHeight(el, height)
          setSidebarOffset(el, offset)
        },

        /* Reset on complete */
        complete() {
          resetSidebarOffset(el)
          resetSidebarHeight(el)
        }
      })

  /* Create and return component */
  return watchSidebar(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
