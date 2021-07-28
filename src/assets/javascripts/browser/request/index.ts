/* Placeholder for Copyright */

import { Observable, from } from "rxjs"
import {
  filter,
  map,
  shareReplay,
  switchMap
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch the given URL
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Response observable
 */
export function request(
  url: URL | string, options: RequestInit = { credentials: "same-origin" }
): Observable<Response> {
  return from(fetch(`${url}`, options))
    .pipe(
      filter(res => res.status === 200),
    )
}

/**
 * Fetch JSON from the given URL
 *
 * @template T - Data type
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
export function requestJSON<T>(
  url: URL | string, options?: RequestInit
): Observable<T> {
  return request(url, options)
    .pipe(
      switchMap(res => res.json()),
      shareReplay(1)
    )
}

/**
 * Fetch XML from the given URL
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
export function requestXML(
  url: URL | string, options?: RequestInit
): Observable<Document> {
  const dom = new DOMParser()
  return request(url, options)
    .pipe(
      switchMap(res => res.text()),
      map(res => dom.parseFromString(res, "text/xml")),
      shareReplay(1)
    )
}
