/* Placeholder for Copyright */

import { configuration, translation } from "~/_"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Version
 */
export interface Version {
  version: string                      /* Version identifier */
  title: string                        /* Version title */
  aliases: string[]                    /* Version aliases */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Render a version
 *
 * @param version - Version
 *
 * @returns Element
 */
function renderVersion(version: Version): HTMLElement {
  const config = configuration()

  /* Ensure trailing slash, see https://bit.ly/3rL5u3f */
  const url = new URL(`${version.version}/`, config.base)
  return (
    <li class="md-version__item">
      <a href={url.toString()} class="md-version__link">
        {version.title}
      </a>
    </li>
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Render a version selector
 *
 * @param versions - Versions
 *
 * @returns Element
 */
export function renderVersionSelector(versions: Version[]): HTMLElement {
  const config = configuration()

  /* Determine active version */
  const [, current] = config.base.match(/([^/]+)\/?$/)!
  const active =
    versions.find(({ version, aliases }) => (
      version === current || aliases.includes(current)
    )) || versions[0]

  /* Render version selector */
  return (
    <div class="md-version">
      <button
        class="md-version__current"
        aria-label={translation("select.version.title")}
      >
        {active.title}
      </button>
      <ul class="md-version__list">
        {versions.map(renderVersion)}
      </ul>
    </div>
  )
}
