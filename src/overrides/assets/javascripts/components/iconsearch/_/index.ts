/* Placeholder for Copyright */

import { Observable, merge } from "rxjs"

import { configuration } from "~/_"
import { requestJSON } from "~/browser"

import { Component, getComponentElement } from "../../_"
import {
  IconSearchQuery,
  mountIconSearchQuery
} from "../query"
import {
  IconSearchResult,
  mountIconSearchResult
} from "../result"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon category
 */
export interface IconCategory {
  base: string                         /* Category base URL */
  data: Record<string, string>         /* Category data */
}

/**
 * Icon search index
 */
export interface IconSearchIndex {
  icons: IconCategory                  /* Icons */
  emojis: IconCategory                 /* Emojis */
}

/* ------------------------------------------------------------------------- */

/**
 * Icon search
 */
export type IconSearch =
  | IconSearchQuery
  | IconSearchResult

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search
 *
 * @param el - Icon search element
 *
 * @returns Icon search component observable
 */
export function mountIconSearch(
  el: HTMLElement
): Observable<Component<IconSearch>> {
  const config = configuration()
  const index$ = requestJSON<IconSearchIndex>(
    `${config.base}/overrides/assets/javascripts/iconsearch_index.json`
  )

  /* Retrieve query and result components */
  const query  = getComponentElement("iconsearch-query", el)
  const result = getComponentElement("iconsearch-result", el)

  /* Create and return component */
  const query$  = mountIconSearchQuery(query)
  const result$ = mountIconSearchResult(result, { index$, query$ })
  return merge(query$, result$)
}
