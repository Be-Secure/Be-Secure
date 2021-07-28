/* Placeholder for Copyright */

import ClipboardJS from "clipboard"
import {
  NEVER,
  Observable,
  Subject,
  fromEvent,
  merge,
  of
} from "rxjs"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs/operators"

import { resetFocusable, setFocusable } from "~/actions"
import {
  Viewport,
  getElementContentSize,
  getElementSize,
  getElements,
  watchMedia
} from "~/browser"
import { renderClipboardButton } from "~/templates"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Code block
 */
export interface CodeBlock {
  scroll: boolean                      /* Code block overflows */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Global index for Clipboard.js integration
 */
let index = 0

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch code block
 *
 * This function monitors size changes of the viewport, as well as switches of
 * content tabs with embedded code blocks, as both may trigger overflow.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block observable
 */
export function watchCodeBlock(
  el: HTMLElement, { viewport$ }: WatchOptions
): Observable<CodeBlock> {
  const container$ = of(el)
    .pipe(
      switchMap(child => {
        const container = child.closest("[data-tabs]")
        if (container instanceof HTMLElement) {
          return merge(
            ...getElements("input", container)
              .map(input => fromEvent(input, "change"))
          )
        }
        return NEVER
      })
    )

  /* Check overflow on resize and tab change */
  return merge(
    viewport$.pipe(distinctUntilKeyChanged("size")),
    container$
  )
    .pipe(
      map(() => {
        const visible = getElementSize(el)
        const content = getElementContentSize(el)
        return {
          scroll: content.width > visible.width
        }
      }),
      distinctUntilKeyChanged("scroll")
    )
}

/**
 * Mount code block
 *
 * This function ensures that an overflowing code block is focusable through
 * keyboard, so it can be scrolled without a mouse to improve on accessibility.
 *
 * @param el - Code block element
 * @param options - Options
 *
 * @returns Code block component observable
 */
export function mountCodeBlock(
  el: HTMLElement, options: MountOptions
): Observable<Component<CodeBlock>> {
  const internal$ = new Subject<CodeBlock>()
  internal$
    .pipe(
      withLatestFrom(watchMedia("(hover)"))
    )
      .subscribe(([{ scroll }, hover]) => {
        if (scroll && hover)
          setFocusable(el)
        else
          resetFocusable(el)
      })

  /* Render button for Clipboard.js integration */
  if (ClipboardJS.isSupported()) {
    const parent = el.closest("pre")!
    parent.id = `__code_${index++}`
    parent.insertBefore(
      renderClipboardButton(parent.id),
      el
    )
  }

  /* Create and return component */
  return watchCodeBlock(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
