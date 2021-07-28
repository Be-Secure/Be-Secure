import * as fs from "fs/promises"
import * as path from "path"
import { Observable, from } from "rxjs"
import { mapTo, mergeMap, switchMap } from "rxjs/operators"

import { mkdir, read, resolve, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Copy transform function
 *
 * @param data - File data
 * @param name - File name
 *
 * @returns Transformed file data
 */
type CopyTransformFn = (data: string, name: string) => Promise<string>

/* ------------------------------------------------------------------------- */

/**
 * Copy options
 */
interface CopyOptions {
  from: string                         /* Source destination */
  to: string                           /* Target destination */
  transform?: CopyTransformFn          /* Transform function */
  watch?: boolean                      /* Watch mode */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Copy a file
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function copy(
  { transform, ...options }: CopyOptions
): Observable<string> {
  return mkdir(path.dirname(options.to))
    .pipe(
      switchMap(() => typeof transform === "undefined"
        ? from(fs.copyFile(options.from, options.to))
        : read(options.from)
            .pipe(
              switchMap(data => transform(data, options.from)),
              switchMap(data => write(options.to, data))
            )
      ),
      mapTo(options.to)
    )
}

/**
 * Copy all files matching the given pattern
 *
 * Note that this function rebases all files that match the pattern to the
 * target folder, even if the pattern resolves to a parent folder.
 *
 * @param pattern - Pattern
 * @param options - Options
 *
 * @returns File observable
 */
export function copyAll(
  pattern: string, options: CopyOptions
): Observable<string> {
  return resolve(pattern, { ...options, cwd: options.from })
    .pipe(
      mergeMap(file => copy({
        ...options,
        from: `${options.from}/${file}`,
        to:   `${options.to}/${file.replace(/(\.{2}\/)+/, "")}`
      }), 16)
    )
}
