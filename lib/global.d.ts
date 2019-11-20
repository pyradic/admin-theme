import * as admin_theme from './index'
import { AdminThemeServiceProvider, AdminThemeVuePlugin, color, styleVars } from './index'

declare global {

    interface PyroExports {
        pyro__admin_theme: typeof admin_theme & {
            AdminThemeVuePlugin: typeof AdminThemeVuePlugin
            AdminThemeServiceProvider: typeof AdminThemeServiceProvider
            styleVars: typeof styleVars
            color: typeof color
        }
    }
}