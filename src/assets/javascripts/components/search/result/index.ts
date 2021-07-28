/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  animationFrameScheduler,
  merge,
  of
} from "rxjs"
import {
  bufferCount,
  filter,
  finalize,
  map,
  observeOn,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
  zipWith
} from "rxjs/operators"

import {
  addToSearchResultList,
  resetSearchResultList,
  resetSearchResultMeta,
  setSearchResultMeta
} from "~/actions"
import {
  getElementOrThrow,
  watchElementThreshold
} from "~/browser"
import {
  SearchResult as SearchResultData,
  SearchWorker,
  isSearchReadyMessage,
  isSearchResultMessage
} from "~/integrations"
import { renderSearchResult } from "~/templates"

import { Component } from "../../_"
import { SearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search result
 */
export interface SearchResult {
  data: SearchResultData[]             /* Search result data */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search result list
 *
 * This function performs a lazy rendering of the search results, depending on
 * the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param worker - Search worker
 * @param options - Options
 *
 * @returns Search result list component observable
 */
export function mountSearchResult(
  el: HTMLElement, { rx$ }: SearchWorker, { query$ }: MountOptions
): Observable<Component<SearchResult>> {
  const internal$ = new Subject<SearchResult>()
  const boundary$ = watchElementThreshold(el.parentElement!)
    .pipe(
      filter(Boolean)
    )

  /* Retrieve nested components */
  const meta = getElementOrThrow(":scope > :first-child", el)
  const list = getElementOrThrow(":scope > :last-child", el)

  /* Update search result metadata when ready */
  rx$
    .pipe(
      filter(isSearchReadyMessage),
      take(1)
    )
      .subscribe(() => {
        resetSearchResultMeta(meta)
      })

  /* Update search result metadata */
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      withLatestFrom(query$)
    )
      .subscribe(([{ data }, { value }]) => {
        if (value)
          setSearchResultMeta(meta, data.length)
        else
          resetSearchResultMeta(meta)
      })

  /* Update search result list */
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      tap(() => resetSearchResultList(list)),
      switchMap(({ data }) => merge(
        of(...data.slice(0, 10)),
        of(...data.slice(10))
          .pipe(
            bufferCount(4),
            zipWith(boundary$),
            switchMap(([chunk]) => of(...chunk))
          )
      ))
    )
      .subscribe(result => {
        addToSearchResultList(list, renderSearchResult(result))
      })

  /* Filter search result list */
  const result$ = rx$
    .pipe(
      filter(isSearchResultMessage),
      map(({ data }) => ({ data })),
      startWith({ data: [] })
    )

  /* Create and return component */
  return result$
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
