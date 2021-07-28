/* Placeholder for Copyright */

import { translation } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a 'copy-to-clipboard' button
 *
 * @param id - Unique identifier
 *
 * @returns Element
 */
export function renderClipboardButton(id: string): HTMLElement {
  return (
    <button
      class="md-clipboard md-icon"
      title={translation("clipboard.copy")}
      data-clipboard-target={`#${id} > code`}
    ></button>
  )
}
