///<reference path="shims-tsx.d.ts"/>
///<reference path="global.d.ts"/>
///<reference path="modules.d.ts"/>
///<reference path="vue.d.ts"/>


import '../resources/scss/bootstrap.scss'; // dev only
import '../resources/scss/theme.scss'; // dev only
import './admin-theme.scss';
import { AdminThemeServiceProvider } from './AdminThemeServiceProvider';
import { AdminThemeVuePlugin }       from './AdminThemeVuePlugin';


export * from './interfaces';
export * from './components';
import * as directives from './directives';
export * from './plugins/bem';

export { styleVars }                     from './styling/export';
export { colors }                        from './utils/colors';
export { ElementOutliner }               from './utils/ElementOutliner';
export { GlobalDialog }                  from './utils/GlobalDialog';
export { createCssVariableEditorDialog } from './utils/createCssVariableEditorDialog';

export { AdminThemeVuePlugin, AdminThemeServiceProvider,directives };


if ( DEV ) {
}

