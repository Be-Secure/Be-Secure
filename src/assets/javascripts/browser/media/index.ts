/* Placeholder for Copyright */

import {
  NEVER,
  Observable,
  fromEvent,
  fromEventPattern
} from "rxjs"
import {
  mapTo,
  startWith,
  switchMap
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch media query
 *
 * Note that although `MediaQueryList.addListener` is deprecated we have to
 * use it, because it's the only way to ensure proper downward compatibility.
 *
 * @see https://bit.ly/3dUBH2m - GitHub issue
 *
 * @param query - Media query
 *
 * @returns Media observable
 */
export function watchMedia(query: string): Observable<boolean> {
  const media = matchMedia(query)
  return fromEventPattern<boolean>(next => (
    media.addListener(() => next(media.matches))
  ))
    .pipe(
      startWith(media.matches)
    )
}

/**
 * Watch print mode, cross-browser
 *
 * @returns Print mode observable
 */
export function watchPrint(): Observable<void> {
  return fromEvent(window, "beforeprint")
    .pipe(
      mapTo(undefined)
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Toggle an observable with a media observable
 *
 * @template T - Data type
 *
 * @param query$ - Media observable
 * @param factory - Observable factory
 *
 * @returns Toggled observable
 */
export function at<T>(
  query$: Observable<boolean>, factory: () => Observable<T>
): Observable<T> {
  return query$
    .pipe(
      switchMap(active => active ? factory() : NEVER)
    )
}
