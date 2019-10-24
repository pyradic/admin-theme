import { ServiceProvider } from '@pyro/platform';
import { MenuTypeRegistry } from './MenuTypeRegistry';
import HeaderMenuItemType from './types/HeaderMenuItemType';
import DividerMenuItemType from './types/DividerMenuItemType';
import LabelMenuItemType from './types/LabelMenuItemType';
import AnchorMenuItemType from './types/AnchorMenuItemType';

const log = require('debug')('CoreServiceProvider');

export class MenuServiceProvider extends ServiceProvider {
    public register() {
        this.app.dynamic('component.menu.types', app => {
            const types = app.resolve(MenuTypeRegistry);
            types.register({
                name     : 'header',
                component: HeaderMenuItemType
            })
            types.register({
                name     : 'divider',
                component: DividerMenuItemType
            })
            types.register({
                name     : 'label',
                component: LabelMenuItemType
            })
            types.register({
                name     : 'anchor',
                component: AnchorMenuItemType
            })
            return types;
        });
    }

    public boot() {
        this.app.get('component.menu.types')

    }

}
