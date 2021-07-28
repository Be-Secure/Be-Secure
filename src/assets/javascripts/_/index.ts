import { getElementOrThrow, getLocation } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Feature flag
 */
export type Flag =
  | "header.autohide"                  /* Hide header */
  | "navigation.expand"                /* Automatic expansion */
  | "navigation.instant"               /* Instant loading */
  | "navigation.sections"              /* Sections navigation */
  | "navigation.tabs"                  /* Tabs navigation */
  | "navigation.top"                   /* Back-to-top button */
  | "toc.integrate"                    /* Integrated table of contents */

/* ------------------------------------------------------------------------- */

/**
 * Translation
 */
export type Translation =
  | "clipboard.copy"                   /* Copy to clipboard */
  | "clipboard.copied"                 /* Copied to clipboard */
  | "search.config.lang"               /* Search language */
  | "search.config.pipeline"           /* Search pipeline */
  | "search.config.separator"          /* Search separator */
  | "search.placeholder"               /* Search */
  | "search.result.placeholder"        /* Type to start searching */
  | "search.result.none"               /* No matching documents */
  | "search.result.one"                /* 1 matching document */
  | "search.result.other"              /* # matching documents */
  | "search.result.more.one"           /* 1 more on this page */
  | "search.result.more.other"         /* # more on this page */
  | "search.result.term.missing"       /* Missing */
  | "select.version.title"             /* Version selector */

/**
 * Translations
 */
export type Translations = Record<Translation, string>

/* ------------------------------------------------------------------------- */

/**
 * Versioning
 */
export interface Versioning {
  provider: "mike"                     /* Version provider */
}

/**
 * Configuration
 */
export interface Config {
  base: string                         /* Base URL */
  features: Flag[]                     /* Feature flags */
  translations: Translations           /* Translations */
  search: string                       /* Search worker URL */
  version?: Versioning                 /* Versioning */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration and make base URL absolute
 */
const script = getElementOrThrow("#__config")
const config: Config = JSON.parse(script.textContent!)
config.base = new URL(config.base, getLocation())
  .toString()
  .replace(/\/$/, "")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration
 *
 * @returns Global configuration
 */
export function configuration(): Config {
  return config
}

/**
 * Check whether a feature flag is enabled
 *
 * @param flag - Feature flag
 *
 * @returns Test result
 */
export function feature(flag: Flag): boolean {
  return config.features.includes(flag)
}

/**
 * Retrieve the translation for the given key
 *
 * @param key - Key to be translated
 * @param value - Positional value, if any
 *
 * @returns Translation
 */
export function translation(
  key: Translation, value?: string | number
): string {
  return typeof value !== "undefined"
    ? config.translations[key].replace("#", value.toString())
    : config.translations[key]
}
