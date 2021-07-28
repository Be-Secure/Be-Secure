/* Placeholder for Copyright */

import { Observable, fromEvent } from "rxjs"
import { filter, map, share } from "rxjs/operators"

import { getActiveElement } from "../element"
import { getToggle } from "../toggle"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Keyboard mode
 */
export type KeyboardMode =
  | "global"                           /* Global */
  | "search"                           /* Search is open */

/* ------------------------------------------------------------------------- */

/**
 * Keyboard
 */
export interface Keyboard {
  mode: KeyboardMode                   /* Keyboard mode */
  type: string                         /* Key type */
  claim(): void                        /* Key claim */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Check whether an element may receive keyboard input
 *
 * @param el - Element
 *
 * @returns Test result
 */
function isSusceptibleToKeyboard(el: HTMLElement): boolean {
  switch (el.tagName) {

    /* Form elements */
    case "INPUT":
    case "SELECT":
    case "TEXTAREA":
      return true

    /* Everything else */
    default:
      return el.isContentEditable
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch keyboard
 *
 * @returns Keyboard observable
 */
export function watchKeyboard(): Observable<Keyboard> {
  return fromEvent<KeyboardEvent>(window, "keydown")
    .pipe(
      filter(ev => !(ev.metaKey || ev.ctrlKey)),
      map(ev => ({
        mode: getToggle("search") ? "search" : "global",
        type: ev.key,
        claim() {
          ev.preventDefault()
          ev.stopPropagation()
        }
      } as Keyboard)),
      filter(({ mode }) => {
        if (mode === "global") {
          const active = getActiveElement()
          if (typeof active !== "undefined")
            return !isSusceptibleToKeyboard(active)
        }
        return true
      }),
      share()
    )
}
