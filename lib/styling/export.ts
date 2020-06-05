import {Config} from '@crvs/platform';
export interface AdminThemeStyleVariables {
	'fa-font-path'?:string
	'primary'?:string
	'primary-light'?:string
	'primary-dark'?:string
	'primary-text'?:string
	'secondary'?:string
	'secondary-light'?:string
	'secondary-dark'?:string
	'secondary-text'?:string
	'layout-prefix'?:string
	'layout-header-height'?:string
	'layout-header-background'?:string
	'layout-header-hover-background'?:string
	'layout-header-font-color'?:string
	'layout-header-hover-font-color'?:string
	'layout-header-border-bottom'?:string
	'layout-footer-height'?:string
	'layout-sidebar-background'?:string
	'layout-sidebar-width'?:string
	'layout-sidebar-collapse-width'?:string
	'shortcut-prefix'?:string
	'toolbar-prefix'?:string
}
import _styleVars from  './export.scss'
export const styleVars = Config.proxied<AdminThemeStyleVariables>(_styleVars)