import { createHash } from "crypto"
import { build as esbuild } from "esbuild"
import * as path from "path"
import postcss from "postcss"
import {
  NEVER,
  Observable,
  concat,
  defer,
  merge,
  of
} from "rxjs"
import {
  catchError,
  endWith,
  ignoreElements,
  switchMap
} from "rxjs/operators"
import { render as sass } from "sass"
import { promisify } from "util"

import { base, mkdir, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Transform options
 */
interface TransformOptions {
  from: string                         /* Source destination */
  to: string                           /* Target destination */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory for source map resolution
 */
const root = new RegExp(`file://${path.resolve(".")}/`, "g")

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Compute a digest for cachebusting a file
 *
 * @param file - File
 * @param data - File data
 *
 * @returns File with digest
 */
function digest(file: string, data: string): string {
  if (process.argv.includes("--optimize")) {
    const hash = createHash("sha256").update(data).digest("hex")
    return file.replace(/\b(?=\.)/, `.${hash.slice(0, 8)}.min`)
  } else {
    return file
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Transform a stylesheet
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformStyle(
  options: TransformOptions
): Observable<string> {
  return defer(() => promisify(sass)({
    file: options.from,
    outFile: options.to,
    includePaths: [
      "src/assets/stylesheets",
      "node_modules/modularscale-sass/stylesheets",
      "node_modules/bes_theme-design-color",
      "node_modules/bes_theme-shadows"
    ],
    sourceMap: true,
    sourceMapContents: true
  }))
    .pipe(
      switchMap(({ css, map }) => postcss([
        require("autoprefixer"),
        require("postcss-inline-svg")({
          paths: [
            `${base}/.icons`
          ],
          encode: false
        }),
        ...process.argv.includes("--optimize")
          ? [require("cssnano")]
          : []
      ])
        .process(css, {
          from: options.from,
          map: {
            prev: `${map}`,
            inline: false
          }
        })
      ),
      catchError(err => {
        console.log(err.formatted || err.message)
        return NEVER
      }),
      switchMap(({ css, map }) => {
        const file = digest(options.to, css)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`.replace(root, "")),
            write(`${file}`, css.replace(
              options.from,
              path.basename(file)
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}

/**
 * Transform a script
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformScript(
  options: TransformOptions
): Observable<string> {
  return defer(() => esbuild({
    entryPoints: [options.from],
    target: "es2015",
    write: false,
    bundle: true,
    sourcemap: true,
    legalComments: "inline",
    minify: process.argv.includes("--optimize")
  }))
    .pipe(
      switchMap(({ outputFiles: [file] }) => {
        const contents = file.text.split("\n")
        const [, data] = contents[contents.length - 2].split(",")
        return of({
          js:  file.text,
          map: Buffer.from(data, "base64")
        })
      }),
      switchMap(({ js, map }) => {
        const file = digest(options.to, js)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`),
            write(`${file}`, js.replace(
              /(sourceMappingURL=)(.*)/,
              `$1${path.basename(file)}.map\n`
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}
