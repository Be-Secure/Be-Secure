/* Placeholder for Copyright */

import { Observable, Subject, fromEvent } from "rxjs"
import {
  map,
  share,
  switchMapTo,
  tap,
  throttle
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Worker message
 */
export interface WorkerMessage {
  type: unknown                        /* Message type */
  data?: unknown                       /* Message data */
}

/**
 * Worker handler
 *
 * @template T - Message type
 */
export interface WorkerHandler<
  T extends WorkerMessage
> {
  tx$: Subject<T>                      /* Message transmission subject */
  rx$: Observable<T>                   /* Message receive observable */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 *
 * @template T - Worker message type
 */
interface WatchOptions<T extends WorkerMessage> {
  tx$: Observable<T>                   /* Message transmission observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch a web worker
 *
 * This function returns an observable that sends all values emitted by the
 * message observable to the web worker. Web worker communication is expected
 * to be bidirectional (request-response) and synchronous. Messages that are
 * emitted during a pending request are throttled, the last one is emitted.
 *
 * @param worker - Web worker
 * @param options - Options
 *
 * @returns Worker message observable
 */
export function watchWorker<T extends WorkerMessage>(
  worker: Worker, { tx$ }: WatchOptions<T>
): Observable<T> {

  /* Intercept messages from worker-like objects */
  const rx$ = fromEvent<MessageEvent>(worker, "message")
    .pipe(
      map(({ data }) => data as T)
    )

  /* Send and receive messages, return hot observable */
  return tx$
    .pipe(
      throttle(() => rx$, { leading: true, trailing: true }),
      tap(message => worker.postMessage(message)),
      switchMapTo(rx$),
      share()
    )
}
