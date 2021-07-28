/* Placeholder for Copyright */

import { merge } from "rxjs"
import { switchMap } from "rxjs/operators"

import {
  getComponentElements,
  mountIconSearch,
  mountSponsorship
} from "./components"
import { setupAnalytics } from "./integrations"

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Set up extra analytics events */
setupAnalytics()

/* Set up extra component observables */
const component$ = document$
  .pipe(
    switchMap(() => merge(

      /* Icon search */
      ...getComponentElements("iconsearch")
        .map(el => mountIconSearch(el)),

      /* Sponsorship */
      ...getComponentElements("sponsorship")
        .map(el => mountSponsorship(el))
    ))
  )

/* Subscribe to all components */
component$.subscribe()
