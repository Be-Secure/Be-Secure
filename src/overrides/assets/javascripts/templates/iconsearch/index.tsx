/* Placeholder for Copyright */

import { wrap } from "fuzzaldrin-plus"

import { translation } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon
 */
export interface Icon {
  shortcode: string                    /* Icon shortcode */
  url: string                          /* Icon URL */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Highlight an icon search result
 *
 * @param icon - Icon
 * @param query - Search query
 *
 * @returns Highlighted result
 */
function highlight(icon: Icon, query: string): string {
  return wrap(icon.shortcode, query, {
    wrap: {
      tagOpen: "<b>",
      tagClose: "</b>"
    }
  })
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render an icon search result
 *
 * @param icon - Icon
 * @param query - Search query
 *
 * @returns Element
 */
export function renderIconSearchResult(
  icon: Icon, query: string
): HTMLElement {
  return (
    <li class="mdx-iconsearch-result__item">
      <span class="twemoji">
        <img src={icon.url} />
      </span>
      <button
        class="md-clipboard--inline"
        title={translation("clipboard.copy")}
        data-clipboard-text={`:${icon.shortcode}:`}
      >
        <code>{`:${highlight(icon, query)}:`}</code>
      </button>
    </li>
  )
}
