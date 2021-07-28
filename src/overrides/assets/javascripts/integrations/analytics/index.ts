/* Placeholder for Copyright */

import { fromEvent } from "rxjs"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up extra analytics events
 */
export function setupAnalytics(): void {
  const { origin } = new URL(location.href)
  fromEvent(document.body, "click")
    .subscribe(ev => {
      if (ev.target instanceof HTMLElement) {
        const el = ev.target.closest("a")
        if (el && el.origin !== origin)
          ga("send", "event", "outbound", "click", el.href)
      }
    })
}
