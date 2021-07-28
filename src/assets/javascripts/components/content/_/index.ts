/* Placeholder for Copyright */

import { Observable, merge } from "rxjs"

import { Viewport, getElements } from "~/browser"

import { Component } from "../../_"
import { CodeBlock, mountCodeBlock } from "../code"
import { Details, mountDetails } from "../details"
import { DataTable, mountDataTable } from "../table"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Content
 */
export type Content =
  | CodeBlock
  | DataTable
  | Details

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
  print$: Observable<void>             /* Print mode observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount content
 *
 * This function mounts all components that are found in the content of the
 * actual article, including code blocks, data tables and details.
 *
 * @param el - Content element
 * @param options - Options
 *
 * @returns Content component observable
 */
export function mountContent(
  el: HTMLElement, { target$, viewport$, print$ }: MountOptions
): Observable<Component<Content>> {
  return merge(

    /* Code blocks */
    ...getElements("pre > code", el)
      .map(child => mountCodeBlock(child, { viewport$ })),

    /* Data tables */
    ...getElements("table:not([class])", el)
      .map(child => mountDataTable(child)),

    /* Details */
    ...getElements("details", el)
      .map(child => mountDetails(child, { target$, print$ }))
  )
}
