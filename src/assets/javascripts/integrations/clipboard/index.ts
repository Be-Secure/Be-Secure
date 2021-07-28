/* Placeholder for Copyright */

import ClipboardJS from "clipboard"
import { Observable, Subject } from "rxjs"

import { translation } from "~/_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  alert$: Subject<string>              /* Alert subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up Clipboard.js integration
 *
 * @param options - Options
 */
export function setupClipboardJS(
  { alert$ }: SetupOptions
): void {
  if (ClipboardJS.isSupported()) {
    new Observable<ClipboardJS.Event>(subscriber => {
      new ClipboardJS("[data-clipboard-target], [data-clipboard-text]")
        .on("success", ev => subscriber.next(ev))
    })
      .subscribe(() => alert$.next(translation("clipboard.copied")))
  }
}
