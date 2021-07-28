/* Placeholder for Copyright */

import { ProjectSchema } from "gitlab"
import { Observable } from "rxjs"
import { defaultIfEmpty, map } from "rxjs/operators"

import { requestJSON } from "~/browser"

import { SourceFacts } from "../_"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch GitLab repository facts
 *
 * @param base - GitLab base
 * @param project - GitLab project
 *
 * @returns Repository facts observable
 */
export function fetchSourceFactsFromGitLab(
  base: string, project: string
): Observable<SourceFacts> {
  const url = `https://${base}/api/v4/projects/${encodeURIComponent(project)}`
  return requestJSON<ProjectSchema>(url)
    .pipe(
      map(({ star_count, forks_count }) => ({
        stars: star_count,
        forks: forks_count
      })),
      defaultIfEmpty({})
    )
}
