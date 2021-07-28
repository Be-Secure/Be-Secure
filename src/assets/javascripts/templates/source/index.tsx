/* Placeholder for Copyright */

import { SourceFacts } from "~/components"
import { h, round } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render repository facts
 *
 * @param facts - Repository facts
 *
 * @returns Element
 */
export function renderSourceFacts(facts: SourceFacts): HTMLElement {
  return (
    <ul class="md-source__facts">
      {Object.entries(facts).map(([key, value]) => (
        <li class={`md-source__fact md-source__fact--${key}`}>
          {typeof value === "number" ? round(value) : value}
        </li>
      ))}
    </ul>
  )
}
