/* Placeholder for Copyright */

import { NEVER, Observable } from "rxjs"

import { fetchSourceFactsFromGitHub } from "../github"
import { fetchSourceFactsFromGitLab } from "../gitlab"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Repository facts for repositories
 */
export interface RepositoryFacts {
  stars?: number                       /* Number of stars */
  forks?: number                       /* Number of forks */
  version?: string                     /* Latest version */
}

/**
 * Repository facts for organizations
 */
export interface OrganizationFacts {
  repositories?: number                /* Number of repositories */
}

/* ------------------------------------------------------------------------- */

/**
 * Repository facts
 */
export type SourceFacts =
  | RepositoryFacts
  | OrganizationFacts

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch repository facts
 *
 * @param url - Repository URL
 *
 * @returns Repository facts observable
 */
export function fetchSourceFacts(
  url: string
): Observable<SourceFacts> {
  const [type] = url.match(/(git(?:hub|lab))/i) || []
  switch (type.toLowerCase()) {

    /* GitHub repository */
    case "github":
      const [, user, repo] = url.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i)!
      return fetchSourceFactsFromGitHub(user, repo)

    /* GitLab repository */
    case "gitlab":
      const [, base, slug] = url.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i)!
      return fetchSourceFactsFromGitLab(base, slug)

    /* Everything else */
    default:
      return NEVER
  }
}
