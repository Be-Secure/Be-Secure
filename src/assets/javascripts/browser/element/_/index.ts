/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve an element matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Element or nothing
 */
export function getElement<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T]

export function getElement<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T | undefined

export function getElement<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T | undefined {
  return node.querySelector<T>(selector) || undefined
}

/**
 * Retrieve an element matching a query selector or throw a reference error
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getElementOrThrow<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T]

export function getElementOrThrow<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T

export function getElementOrThrow<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T {
  const el = getElement<T>(selector, node)
  if (typeof el === "undefined")
    throw new ReferenceError(
      `Missing element: expected "${selector}" to be present`
    )
  return el
}

/**
 * Retrieve the currently active element
 *
 * @returns Element or nothing
 */
export function getActiveElement(): HTMLElement | undefined {
  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : undefined
}

/**
 * Retrieve all elements matching the query selector
 *
 * @template T - Element type
 *
 * @param selector - Query selector
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getElements<T extends keyof HTMLElementTagNameMap>(
  selector: T, node?: ParentNode
): HTMLElementTagNameMap[T][]

export function getElements<T extends HTMLElement>(
  selector: string, node?: ParentNode
): T[]

export function getElements<T extends HTMLElement>(
  selector: string, node: ParentNode = document
): T[] {
  return Array.from(node.querySelectorAll<T>(selector))
}

/* ------------------------------------------------------------------------- */

/**
 * Create an element
 *
 * @template T - Tag name type
 *
 * @param tagName - Tag name
 *
 * @returns Element
 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T
): HTMLElementTagNameMap[T] {
  return document.createElement(tagName)
}

/**
 * Replace an element with the given list of nodes
 *
 * @param el - Element
 * @param nodes - Replacement nodes
 */
export function replaceElement(
  el: HTMLElement, ...nodes: Node[]
): void {
  el.replaceWith(...nodes)
}
