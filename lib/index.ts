///<reference path="shims-tsx.d.ts"/>

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