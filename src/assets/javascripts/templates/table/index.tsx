/* Placeholder for Copyright */

import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a table inside a wrapper to improve scrolling on mobile
 *
 * @param table - Table element
 *
 * @returns Element
 */
export function renderTable(table: HTMLElement): HTMLElement {
  return (
    <div class="md-typeset__scrollwrap">
      <div class="md-typeset__table">
        {table}
      </div>
    </div>
  )
}
