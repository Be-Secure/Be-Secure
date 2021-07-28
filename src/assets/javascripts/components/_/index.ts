/* Placeholder for Copyright */

import { getElementOrThrow, getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component
 */
export type ComponentType =
  | "announce"                         /* Announcement bar */
  | "container"                        /* Container */
  | "content"                          /* Content */
  | "dialog"                           /* Dialog */
  | "header"                           /* Header */
  | "header-title"                     /* Header title */
  | "header-topic"                     /* Header topic */
  | "main"                             /* Main area */
  | "palette"                          /* Color palette */
  | "search"                           /* Search */
  | "search-query"                     /* Search input */
  | "search-result"                    /* Search results */
  | "sidebar"                          /* Sidebar */
  | "skip"                             /* Skip link */
  | "source"                           /* Repository information */
  | "tabs"                             /* Navigation tabs */
  | "toc"                              /* Table of contents */
  | "top"                              /* Back-to-top button */

/**
 * A component
 *
 * @template T - Component type
 * @template U - Reference type
 */
export type Component<
  T extends {} = {},
  U extends HTMLElement = HTMLElement
> =
  T & {
    ref: U                             /* Component reference */
  }

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Component type map
 */
interface ComponentTypeMap {
  "announce": HTMLElement              /* Announcement bar */
  "container": HTMLElement             /* Container */
  "content": HTMLElement               /* Content */
  "dialog": HTMLElement                /* Dialog */
  "header": HTMLElement                /* Header */
  "header-title": HTMLElement          /* Header title */
  "header-topic": HTMLElement          /* Header topic */
  "main": HTMLElement                  /* Main area */
  "palette": HTMLElement               /* Color palette */
  "search": HTMLElement                /* Search */
  "search-query": HTMLInputElement     /* Search input */
  "search-result": HTMLElement         /* Search results */
  "sidebar": HTMLElement               /* Sidebar */
  "skip": HTMLAnchorElement            /* Skip link */
  "source": HTMLAnchorElement          /* Repository information */
  "tabs": HTMLElement                  /* Navigation tabs */
  "toc": HTMLElement                   /* Table of contents */
  "top": HTMLAnchorElement             /* Back-to-top button */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the element for a given component or throw a reference error
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getComponentElement<T extends ComponentType>(
  type: T, node: ParentNode = document
): ComponentTypeMap[T] {
  return getElementOrThrow(`[data-md-component=${type}]`, node)
}

/**
 * Retrieve all elements for a given component
 *
 * @template T - Component type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getComponentElements<T extends ComponentType>(
  type: T, node: ParentNode = document
): ComponentTypeMap[T][] {
  return getElements(`[data-md-component=${type}]`, node)
}
