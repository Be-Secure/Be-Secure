/* Placeholder for Copyright */

import {
  Observable,
  Subject,
  fromEvent,
  of
} from "rxjs"
import {
  finalize,
  map,
  mapTo,
  mergeMap,
  shareReplay,
  startWith,
  tap
} from "rxjs/operators"

import { getElements } from "~/browser"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Palette colors
 */
export interface PaletteColor {
  scheme?: string                      /* Color scheme */
  primary?: string                     /* Primary color */
  accent?: string                      /* Accent color */
}

/**
 * Palette
 */
export interface Palette {
  index: number                        /* Palette index */
  color: PaletteColor                  /* Palette colors */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch color palette
 *
 * @param inputs - Color palette element
 *
 * @returns Color palette observable
 */
export function watchPalette(
  inputs: HTMLInputElement[]
): Observable<Palette> {
  const data = localStorage.getItem(__prefix("__palette"))!
  const current = JSON.parse(data) || {
    index: inputs.findIndex(input => (
      matchMedia(input.getAttribute("data-md-color-media")!).matches
    ))
  }

  /* Emit changes in color palette */
  const palette$ = of(...inputs)
    .pipe(
      mergeMap(input => fromEvent(input, "change")
        .pipe(
          mapTo(input)
        )
      ),
      startWith(inputs[Math.max(0, current.index)]),
      map(input => ({
        index: inputs.indexOf(input),
        color: {
          scheme:  input.getAttribute("data-md-color-scheme"),
          primary: input.getAttribute("data-md-color-primary"),
          accent:  input.getAttribute("data-md-color-accent")
        }
      } as Palette)),
      shareReplay(1)
    )

  /* Persist preference in local storage */
  palette$.subscribe(palette => {
    localStorage.setItem(__prefix("__palette"), JSON.stringify(palette))
  })

  /* Return palette */
  return palette$
}

/**
 * Mount color palette
 *
 * @param el - Color palette element
 *
 * @returns Color palette component observable
 */
export function mountPalette(
  el: HTMLElement
): Observable<Component<Palette>> {
  const internal$ = new Subject<Palette>()

  /* Set color palette */
  internal$.subscribe(palette => {
    for (const [key, value] of Object.entries(palette.color))
      if (typeof value === "string")
        document.body.setAttribute(`data-md-color-${key}`, value)

    /* Toggle visibility */
    for (let index = 0; index < inputs.length; index++) {
      const label = inputs[index].nextElementSibling
      if (label instanceof HTMLElement)
        label.hidden = palette.index !== index
    }
  })

  /* Create and return component */
  const inputs = getElements<HTMLInputElement>("input", el)
  return watchPalette(inputs)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
