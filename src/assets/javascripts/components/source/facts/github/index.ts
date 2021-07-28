/* Placeholder for Copyright */

import { Repo, User } from "github-types"
import { Observable, zip } from "rxjs"
import { defaultIfEmpty, map } from "rxjs/operators"

import { requestJSON } from "~/browser"

import { SourceFacts } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * GitHub release (partial)
 */
interface Release {
  tag_name: string                     /* Tag name */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch GitHub repository facts
 *
 * @param user - GitHub user
 * @param repo - GitHub repository
 *
 * @returns Repository facts observable
 */
export function fetchSourceFactsFromGitHub(
  user: string, repo?: string
): Observable<SourceFacts> {
  if (typeof repo !== "undefined") {
    const url = `https://api.github.com/repos/${user}/${repo}`
    return zip(

      /* Fetch version */
      requestJSON<Release>(`${url}/releases/latest`)
        .pipe(
          map(release => ({
            version: release.tag_name
          })),
          defaultIfEmpty({})
        ),

      /* Fetch stars and forks */
      requestJSON<Repo>(url)
        .pipe(
          map(info => ({
            stars: info.stargazers_count,
            forks: info.forks_count
          })),
          defaultIfEmpty({})
        )
    )
      .pipe(
        map(([release, info]) => ({ ...release, ...info }))
      )

  /* User or organization */
  } else {
    const url = `https://api.github.com/repos/${user}`
    return requestJSON<User>(url)
      .pipe(
        map(info => ({
          repositories: info.public_repos
        })),
        defaultIfEmpty({})
      )
  }
}
