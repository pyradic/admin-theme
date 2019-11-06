///<reference path="shims-tsx.d.ts"/>

import '../resources/scss/bootstrap.scss' // dev only
import '../resources/scss/theme.scss' // dev only
import './admin-theme.scss'
import { AdminThemeServiceProvider } from './AdminThemeServiceProvider';
import {AdminThemeVuePlugin} from './AdminThemeVuePlugin';
import { styleVars } from './styling/export';
import { colors } from './utils/colors';

export {styleVars,colors}
export { AdminThemeVuePlugin, AdminThemeServiceProvider }


if(DEV) {
    window[ 'styleVars' ] = styleVars
    window[ 'colors' ] = colors
}