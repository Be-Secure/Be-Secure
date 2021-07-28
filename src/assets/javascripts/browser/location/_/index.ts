/* Placeholder for Copyright */

import { Subject } from "rxjs"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve location
 *
 * This function returns a `URL` object (and not `Location`) to normalize the
 * typings across the application. Furthermore, locations need to be tracked
 * without setting them and `Location` is a singleton which represents the
 * current location.
 *
 * @returns URL
 */
export function getLocation(): URL {
  return new URL(location.href)
}

/**
 * Set location
 *
 * @param url - URL to change to
 */
export function setLocation(url: URL): void {
  location.href = url.href
}

/* ------------------------------------------------------------------------- */

/**
 * Watch location
 *
 * @returns Location subject
 */
export function watchLocation(): Subject<URL> {
  return new Subject<URL>()
}
