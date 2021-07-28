/* Placeholder for Copyright */

import { translation } from "~/_"
import {
  SearchDocument,
  SearchMetadata,
  SearchResult
} from "~/integrations/search"
import { h, truncate } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Render flag
 */
const enum Flag {
  TEASER = 1,                          /* Render teaser */
  PARENT = 2                           /* Render as parent */
}

/* ----------------------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------------------- */

/**
 * Render a search document
 *
 * @param document - Search document
 * @param flag - Render flags
 *
 * @returns Element
 */
function renderSearchDocument(
  document: SearchDocument & SearchMetadata, flag: Flag
): HTMLElement {
  const parent = flag & Flag.PARENT
  const teaser = flag & Flag.TEASER

  /* Render missing query terms */
  const missing = Object.keys(document.terms)
    .filter(key => !document.terms[key])
    .map(key => [<del>{key}</del>, " "])
    .flat()
    .slice(0, -1)

  /* Render article or section, depending on flags */
  const url = document.location
  return (
    <a href={url} class="md-search-result__link" tabIndex={-1}>
      <article
        class={["md-search-result__article", ...parent
          ? ["md-search-result__article--document"]
          : []
        ].join(" ")}
        data-md-score={document.score.toFixed(2)}
      >
        {parent > 0 && <div class="md-search-result__icon md-icon"></div>}
        <h1 class="md-search-result__title">{document.title}</h1>
        {teaser > 0 && document.text.length > 0 &&
          <p class="md-search-result__teaser">
            {truncate(document.text, 320)}
          </p>
        }
        {teaser > 0 && missing.length > 0 &&
          <p class="md-search-result__terms">
            {translation("search.result.term.missing")}: {...missing}
          </p>
        }
      </article>
    </a>
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a search result
 *
 * @param result - Search result
 *
 * @returns Element
 */
export function renderSearchResult(
  result: SearchResult
): HTMLElement {
  const threshold = result[0].score
  const docs = [...result]

  /* Find and extract parent article */
  const parent = docs.findIndex(doc => !doc.location.includes("#"))
  const [article] = docs.splice(parent, 1)

  /* Determine last index above threshold */
  let index = docs.findIndex(doc => doc.score < threshold)
  if (index === -1)
    index = docs.length

  /* Partition sections */
  const best = docs.slice(0, index)
  const more = docs.slice(index)

  /* Render children */
  const children = [
    renderSearchDocument(article, Flag.PARENT | +(!parent && index === 0)),
    ...best.map(section => renderSearchDocument(section, Flag.TEASER)),
    ...more.length ? [
      <details class="md-search-result__more">
        <summary tabIndex={-1}>
          {more.length > 0 && more.length === 1
            ? translation("search.result.more.one")
            : translation("search.result.more.other", more.length)
          }
        </summary>
        {...more.map(section => renderSearchDocument(section, Flag.TEASER))}
      </details>
    ] : []
  ]

  /* Render search result */
  return (
    <li class="md-search-result__item">
      {children}
    </li>
  )
}
