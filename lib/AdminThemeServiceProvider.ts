import { Config, ServiceProvider } from '@pyro/platform';
import { AdminThemeVuePlugin } from './AdminThemeVuePlugin';
import { styleVars } from './styling/export';
import { CreateElement, VNodeData } from 'vue';
import { MenuManager } from './components/menu/MenuManager';


export class AdminThemeServiceProvider extends ServiceProvider {
    providers = []

    public register() {
        this.vuePlugin(AdminThemeVuePlugin);
        this.app.dynamic('menus', app => {
            let manager= this.app.resolve(MenuManager);
            manager.registerType('default', 'py-default-menu-item-type')
            manager.registerType('pyro.extension.label_link_type', 'py-label-menu-item-type')
            manager.registerType('pyro.extension.header_link_type', 'py-header-menu-item-type')
            manager.registerType('pyro.extension.divider_link_type', 'py-divider-menu-item-type')
            manager.registerType('pyro.extension.url_link_type', 'py-default-menu-item-type')
            manager.registerType('pyro.extension.module_link_type', 'py-default-menu-item-type')
            manager.registerType('pyro.extension.cp_action_link_type', 'py-default-menu-item-type')
            return manager;
        });

        this.app.addBindingGetter('menus');
        this.app.factory('menus.icon.renderer', (h: CreateElement, icon: string, data: VNodeData = {}) => {
            if ( !icon ) {return null}
            data.class = data.class || {};
            if ( !icon.startsWith('fa ') ) {
                if ( icon.startsWith('fa-') ) {
                    icon = 'fa ' + icon
                } else {
                    icon = 'fa fa-' + icon
                }
            }
            data.class[ icon ] = true;
            return h('i', data);
        })
        this.app.extendRoot({
            data() {
                return {
                    layout: null
                }
            },
            methods: {
                setLayout(layout) {this.layout = layout; },
                getLayout() {return this.layout },
                hasLayout() {return this.layout !== null}
            }
        })
    }

    public boot() {
        if ( this.app.isBound('styling') ) {
            let styling = this.app.get<Config<Record<string, string>>>('styling')
            styling.merge(styleVars.raw())
        }
    }
}