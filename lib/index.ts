///<reference path="shims-tsx.d.ts"/>

import './admin-theme.scss'
import { AdminThemeServiceProvider } from './AdminThemeServiceProvider';
import {AdminThemeVuePlugin} from './AdminThemeVuePlugin';
import { styleVars } from './styling/export';

window['styleVars'] = styleVars
export {styleVars}
export { AdminThemeVuePlugin, AdminThemeServiceProvider }