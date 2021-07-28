/* Placehplder for copyright*/

import { Observable, Subject } from "rxjs"

import { Keyboard, Viewport } from "~/browser"
import { Component } from "~/components"
import {
  SearchIndex,
  SearchTransformFn
} from "~/integrations"

/* ----------------------------------------------------------------------------
 * Global types
 * ------------------------------------------------------------------------- */

/**
 * Global search configuration
 */
export interface GlobalSearchConfig {
  transform?: SearchTransformFn        /* Transformation function */
  index?: Promise<SearchIndex>         /* Alternate index */
}

/* ------------------------------------------------------------------------- */

declare global {

  /**
   * Global search configuration
   */
  const __search: GlobalSearchConfig | undefined

  /**
   * Global function to prefix storage items
   */
   function __prefix(key: string): string

  /**
   * Google Analytics
   */
  function ga(...args: string[]): void
}

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

declare global {
  var document$: Observable<Document>  /* Document observable */
  var location$: Subject<URL>          /* Location subject */
  var target$: Observable<HTMLElement> /* Location target observable */
  var keyboard$: Observable<Keyboard>  /* Keyboard observable */
  var viewport$: Observable<Viewport>  /* Viewport obsevable */
  var tablet$: Observable<boolean>     /* Tablet breakpoint observable */
  var screen$: Observable<boolean>     /* Screen breakpoint observable */
  var print$: Observable<void>         /* Print mode observable */
  var alert$: Subject<string>          /* Alert subject */
  var component$: Observable<Component>/* Component observable */
}
