/* Placeholder for Copyright */

import { getElementOrThrow, getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component
 */
export type ComponentType =
  | "iconsearch"                       /* Icon search */
  | "iconsearch-query"                 /* Icon search input */
  | "iconsearch-result"                /* Icon search results */
  | "sponsorship"                      /* Sponsorship */
  | "sponsorship-count"                /* Sponsorship count */
  | "sponsorship-total"                /* Sponsorship total */

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
  "iconsearch": HTMLElement            /* Icon search */
  "iconsearch-query": HTMLInputElement /* Icon search input */
  "iconsearch-result": HTMLElement     /* Icon search results */
  "sponsorship": HTMLElement           /* Sponsorship */
  "sponsorship-count": HTMLElement     /* Sponsorship count */
  "sponsorship-total": HTMLElement     /* Sponsorship total */
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
  return getElementOrThrow(`[data-mdx-component=${type}]`, node)
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
  return getElements(`[data-mdx-component=${type}]`, node)
}
