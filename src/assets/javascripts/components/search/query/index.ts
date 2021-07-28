/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  combineLatest,
  fromEvent,
  merge
} from "rxjs"
import {
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  takeLast,
  takeUntil,
  tap
} from "rxjs/operators"

import {
  resetSearchQueryPlaceholder,
  setSearchQueryPlaceholder
} from "~/actions"
import {
  setElementFocus,
  setToggle,
  watchElementFocus
} from "~/browser"
import {
  SearchMessageType,
  SearchQueryMessage,
  SearchWorker,
  defaultTransform
} from "~/integrations"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search query
 */
export interface SearchQuery {
  value: string                        /* Query value */
  focus: boolean                       /* Query focus */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch search query
 *
 * Note that the focus event which triggers re-reading the current query value
 * is delayed by `1ms` so the input's empty state is allowed to propagate.
 *
 * @param el - Search query element
 *
 * @returns Search query observable
 */
export function watchSearchQuery(
  el: HTMLInputElement
): Observable<SearchQuery> {
  const fn = __search?.transform || defaultTransform

  /* Intercept focus and input events */
  const focus$ = watchElementFocus(el)
  const value$ = merge(
    fromEvent(el, "keyup"),
    fromEvent(el, "focus").pipe(delay(1))
  )
    .pipe(
      map(() => fn(el.value)),
      distinctUntilChanged()
    )

  /* Combine into single observable */
  return combineLatest([value$, focus$])
    .pipe(
      map(([value, focus]) => ({ value, focus }))
    )
}

/**
 * Mount search query
 *
 * @param el - Search query element
 * @param worker - Search worker
 *
 * @returns Search query component observable
 */
export function mountSearchQuery(
  el: HTMLInputElement, { tx$ }: SearchWorker
): Observable<Component<SearchQuery, HTMLInputElement>> {
  const internal$ = new Subject<SearchQuery>()

  /* Handle value changes */
  internal$
    .pipe(
      distinctUntilKeyChanged("value"),
      map(({ value }): SearchQueryMessage => ({
        type: SearchMessageType.QUERY,
        data: value
      }))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Handle focus changes */
  internal$
    .pipe(
      distinctUntilKeyChanged("focus")
    )
      .subscribe(({ focus }) => {
        if (focus) {
          setToggle("search", focus)
          setSearchQueryPlaceholder(el, "")
        } else {
          resetSearchQueryPlaceholder(el)
        }
      })

  /* Handle reset */
  fromEvent(el.form!, "reset")
    .pipe(
      takeUntil(internal$.pipe(takeLast(1)))
    )
      .subscribe(() => setElementFocus(el))

  /* Create and return component */
  return watchSearchQuery(el)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
