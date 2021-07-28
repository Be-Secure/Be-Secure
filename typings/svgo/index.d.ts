/* Placehplder for copyright*/

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

declare module "svgo" {

  /**
   * Plugin
   */
  interface Plugin {
    name: string
    active: boolean
  }

  /**
   * Optimization configuration
   */
  interface OptimizeConfig {
    plugins: Plugin[]
  }

  /**
   * Optimization result
   */
  interface OptimizeResult {
    data: string
  }

  /**
   * Optimize SVG
   *
   * @param data - SVG data
   *
   * @returns Optimization result
   */
  function optimize(data: string, config: OptimizeConfig): OptimizeResult

  /**
   * Extend the list of default plugins
   *
   * @param plugins - Plugins
   *
   * @returns Plugins
   */
  function extendDefaultPlugins(plugins: Plugin[]): Plugin[]
}
