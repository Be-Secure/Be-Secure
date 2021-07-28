/* Placeholder for Copyright */

import { ReplaySubject, Subject, fromEvent } from "rxjs"
import { mapTo } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch document
 *
 * Documents are implemented as subjects, so all downstream observables are
 * automatically updated when a new document is emitted.
 *
 * @returns Document subject
 */
export function watchDocument(): Subject<Document> {
  const document$ = new ReplaySubject<Document>()
  fromEvent(document, "DOMContentLoaded")
    .pipe(
      mapTo(document)
    )
      .subscribe(document$)

  /* Return document */
  return document$
}
