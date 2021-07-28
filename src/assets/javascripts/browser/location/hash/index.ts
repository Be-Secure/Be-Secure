/* Placeholder for Copyright */

import { Observable, fromEvent, of } from "rxjs"
import { filter, map, share, startWith, switchMap } from "rxjs/operators"

import { createElement, getElement } from "~/browser"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve location hash
 *
 * @returns Location hash
 */
export function getLocationHash(): string {
  return location.hash.substring(1)
}

/**
 * Set location hash
 *
 * Setting a new fragment identifier via `location.hash` will have no effect
 * if the value doesn't change. When a new fragment identifier is set, we want
 * the browser to target the respective element at all times, which is why we
 * use this dirty little trick.
 *
 * @param hash - Location hash
 */
export function setLocationHash(hash: string): void {
  const el = createElement("a")
  el.href = hash
  el.addEventListener("click", ev => ev.stopPropagation())
  el.click()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch location hash
 *
 * @returns Location hash observable
 */
export function watchLocationHash(): Observable<string> {
  return fromEvent<HashChangeEvent>(window, "hashchange")
    .pipe(
      map(getLocationHash),
      startWith(getLocationHash()),
      filter(hash => hash.length > 0),
      share()
    )
}

/**
 * Watch location target
 *
 * @returns Location target observable
 */
export function watchLocationTarget(): Observable<HTMLElement> {
  return watchLocationHash()
    .pipe(
      switchMap(id => of(getElement(`[id="${id}"]`)!))
    )
}
