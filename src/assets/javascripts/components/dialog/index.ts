/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  animationFrameScheduler,
  merge,
  of
} from "rxjs"
import {
  delay,
  finalize,
  map,
  observeOn,
  switchMap,
  tap
} from "rxjs/operators"

import {
  resetDialogState,
  setDialogMessage,
  setDialogState
} from "~/actions"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Dialog
 */
export interface Dialog {
  message: string                      /* Dialog message */
  open: boolean                        /* Dialog is visible */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  alert$: Subject<string>              /* Alert subject */
}

/**
 * Mount options
 */
interface MountOptions {
  alert$: Subject<string>              /* Alert subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch dialog
 *
 * @param _el - Dialog element
 * @param options - Options
 *
 * @returns Dialog observable
 */
export function watchDialog(
  _el: HTMLElement, { alert$ }: WatchOptions
): Observable<Dialog> {
  return alert$
    .pipe(
      switchMap(message => merge(
        of(true),
        of(false).pipe(delay(2000))
      )
        .pipe(
          map(open => ({ message, open }))
        )
      )
    )
}

/**
 * Mount dialog
 *
 * This function reveals the dialog in the right cornerwhen a new alert is
 * emitted through the subject that is passed as part of the options.
 *
 * @param el - Dialog element
 * @param options - Options
 *
 * @returns Dialog component observable
 */
export function mountDialog(
  el: HTMLElement, options: MountOptions
): Observable<Component<Dialog>> {
  const internal$ = new Subject<Dialog>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe(({ message, open }) => {
        setDialogMessage(el, message)
        if (open)
          setDialogState(el, "open")
        else
          resetDialogState(el)
      })

  /* Create and return component */
  return watchDialog(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
