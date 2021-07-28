/* Placeholder for Copyright */

import { configuration } from "~/_"
import { getElementOrThrow, requestJSON } from "~/browser"
import { Version, renderVersionSelector } from "~/templates"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up version selector
 */
export function setupVersionSelector(): void {
  const config = configuration()
  requestJSON<Version[]>(new URL("versions.json", config.base))
    .subscribe(versions => {
      const topic = getElementOrThrow(".md-header__topic")
      topic.appendChild(renderVersionSelector(versions))
    })
}
