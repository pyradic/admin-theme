///<reference path="shims-tsx.d.ts"/>
///<reference path="global.d.ts"/>
///<reference path="modules.d.ts"/>
///<reference path="vue.d.ts"/>


import '../resources/scss/bootstrap.scss' // dev only
import '../resources/scss/theme.scss' // dev only
import './admin-theme.scss'
import { AdminThemeServiceProvider } from './AdminThemeServiceProvider';
import {AdminThemeVuePlugin}         from './AdminThemeVuePlugin';
import { styleVars }                 from './styling/export';
import { colors }                    from './utils/colors';

export * from './interfaces';
export * from './components';
export * from './plugins/bem';
export {styleVars,colors}
export { AdminThemeVuePlugin, AdminThemeServiceProvider }


if(DEV) {
    window[ 'styleVars' ] = styleVars
    window[ 'colors' ] = colors
}

