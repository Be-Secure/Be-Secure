/* Placeholder for Copyright */

import escapeHTML from "escape-html"

import { SearchIndexDocument } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search document
 */
export interface SearchDocument extends SearchIndexDocument {
  parent?: SearchIndexDocument         /* Parent article */
}

/* ------------------------------------------------------------------------- */

/**
 * Search document mapping
 */
export type SearchDocumentMap = Map<string, SearchDocument>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search document mapping
 *
 * @param docs - Search index documents
 *
 * @returns Search document map
 */
export function setupSearchDocumentMap(
  docs: SearchIndexDocument[]
): SearchDocumentMap {
  const documents = new Map<string, SearchDocument>()
  const parents   = new Set<SearchDocument>()
  for (const doc of docs) {
    const [path, hash] = doc.location.split("#")

    /* Extract location and title */
    const location = doc.location
    const title    = doc.title

    /* Escape and cleanup text */
    const text = escapeHTML(doc.text)
      .replace(/\s+(?=[,.:;!?])/g, "")
      .replace(/\s+/g, " ")

    /* Handle section */
    if (hash) {
      const parent = documents.get(path)!

      /* Ignore first section, override article */
      if (!parents.has(parent)) {
        parent.title = doc.title
        parent.text  = text

        /* Remember that we processed the article */
        parents.add(parent)

      /* Add subsequent section */
      } else {
        documents.set(location, {
          location,
          title,
          text,
          parent
        })
      }

    /* Add article */
    } else {
      documents.set(location, {
        location,
        title,
        text
      })
    }
  }
  return documents
}
