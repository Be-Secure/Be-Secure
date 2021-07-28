/* Placeholder for Copyright */

import { SearchIndexConfig } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search highlight function
 *
 * @param value - Value
 *
 * @returns Highlighted value
 */
export type SearchHighlightFn = (value: string) => string

/**
 * Search highlight factory function
 *
 * @param query - Query value
 *
 * @returns Search highlight function
 */
export type SearchHighlightFactoryFn = (query: string) => SearchHighlightFn

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search highlighter
 *
 * @param config - Search index configuration
 *
 * @returns Search highlight factory function
 */
export function setupSearchHighlighter(
  config: SearchIndexConfig
): SearchHighlightFactoryFn {
  const separator = new RegExp(config.separator, "img")
  const highlight = (_: unknown, data: string, term: string) => {
    return `${data}<mark data-md-highlight>${term}</mark>`
  }

  /* Return factory function */
  return (query: string) => {
    query = query
      .replace(/[\s*+\-:~^]+/g, " ")
      .trim()

    /* Create search term match expression */
    const match = new RegExp(`(^|${config.separator})(${
      query
        .replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&")
        .replace(separator, "|")
    })`, "img")

    /* Highlight string value */
    return value => value
      .replace(match, highlight)
      .replace(/<\/mark>(\s+)<mark[^>]*>/img, "$1")
  }
}
