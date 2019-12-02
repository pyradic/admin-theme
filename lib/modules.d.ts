
// noinspection ES6UnusedImports
import platform from '@pyro/platform'
import { MenuManager } from './components/menu/MenuManager';

// noinspection ES6UnusedImports
declare module '@pyro/platform/lib/classes/Application' {

    interface Application {
        menus:MenuManager
    }
    // interface Styling extends AdminThemeStyleVariables {}
}