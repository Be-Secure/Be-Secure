/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search query clause
 */
export interface SearchQueryClause {
  presence: lunr.Query.presence        /* Clause presence */
  term: string                         /* Clause term */
}

/* ------------------------------------------------------------------------- */

/**
 * Search query terms
 */
export type SearchQueryTerms = Record<string, boolean>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Parse a search query for analysis
 *
 * @param value - Query value
 *
 * @returns Search query clauses
 */
export function parseSearchQuery(
  value: string
): SearchQueryClause[] {
  const query  = new (lunr as any).Query(["title", "text"])
  const parser = new (lunr as any).QueryParser(value, query)

  /* Parse and return query clauses */
  parser.parse()
  return query.clauses
}

/**
 * Analyze the search query clauses in regard to the search terms found
 *
 * @param query - Search query clauses
 * @param terms - Search terms
 *
 * @returns Search query terms
 */
export function getSearchQueryTerms(
  query: SearchQueryClause[], terms: string[]
): SearchQueryTerms {
  const clauses = new Set<SearchQueryClause>(query)

  /* Match query clauses against terms */
  const result: SearchQueryTerms = {}
  for (let t = 0; t < terms.length; t++)
    for (const clause of clauses)
      if (terms[t].startsWith(clause.term)) {
        result[clause.term] = true
        clauses.delete(clause)
      }

  /* Annotate unmatched query clauses */
  for (const clause of clauses)
    result[clause.term] = false

  /* Return query terms */
  return result
}
