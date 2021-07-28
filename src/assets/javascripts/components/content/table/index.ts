/* Placeholder for Copyright */

import { Observable, of } from "rxjs"

import { createElement, replaceElement } from "~/browser"
import { renderTable } from "~/templates"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Data table
 */
export interface DataTable {}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Sentinel for replacement
 */
const sentinel = createElement("table")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount data table
 *
 * This function wraps a data table in another scrollable container, so it can
 * be smoothly scrolled on smaller screen sizes and won't break the layout.
 *
 * @param el - Data table element
 *
 * @returns Data table component observable
 */
export function mountDataTable(
  el: HTMLElement
): Observable<Component<DataTable>> {
  replaceElement(el, sentinel)
  replaceElement(sentinel, renderTable(el))

  /* Create and return component */
  return of({ ref: el })
}
