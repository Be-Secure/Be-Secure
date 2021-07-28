/* Placeholder for Copyright */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Truncate a string after the given number of characters
 *
 * This is not a very reasonable approach, since the summaries kind of suck.
 * It would be better to create something more intelligent, highlighting the
 * search occurrences and making a better summary out of it, but this note was
 * written three years ago, so who knows if we'll ever fix it.
 *
 * @param value - Value to be truncated
 * @param n - Number of characters
 *
 * @returns Truncated value
 */
export function truncate(value: string, n: number): string {
  let i = n
  if (value.length > i) {
    while (value[i] !== " " && --i > 0) { /* keep eating */ }
    return `${value.substring(0, i)}...`
  }
  return value
}

/**
 * Round a number for display with repository facts
 *
 * This is a reverse-engineered version of GitHub's weird rounding algorithm
 * for stars, forks and all other numbers. While all numbers below `1,000` are
 * returned as-is, bigger numbers are converted to fixed numbers:
 *
 * - `1,049` => `1k`
 * - `1,050` => `1.1k`
 * - `1,949` => `1.9k`
 * - `1,950` => `2k`
 *
 * @param value - Original value
 *
 * @returns Rounded value
 */
export function round(value: number): string {
  if (value > 999) {
    const digits = +((value - 950) % 1000 > 99)
    return `${((value + 0.000001) / 1000).toFixed(digits)}k`
  } else {
    return value.toString()
  }
}

/**
 * Simple hash function
 *
 * @see https://bit.ly/2wsVjJ4 - Original source
 *
 * @param value - Value to be hashed
 *
 * @returns Hash as 32bit integer
 */
export function hash(value: string): number {
  let h = 0
  for (let i = 0, len = value.length; i < len; i++) {
    h  = ((h << 5) - h) + value.charCodeAt(i)
    h |= 0 // Convert to 32bit integer
  }
  return h
}
