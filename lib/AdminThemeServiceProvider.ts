import { Config, ServiceProvider }             from '@pyro/platform';
import { AdminThemeVuePlugin }                 from './AdminThemeVuePlugin';
import { styleVars }                           from './styling/export';
import { CreateElement, VNodeData }            from 'vue';
import { MenuManager }                         from './components/menu/MenuManager';
import { ShortcutTypeRegistry }                from './components/shortcut';
import DefaultShortcutType                     from './components/shortcut/types/DefaultShortcutType.vue';
import DropdownShortcutType                    from './components/shortcut/types/DropdownShortcutType.vue';
import { ComponentIconReplacer, IconRenderer } from './interfaces';
import { iconMapper }                          from './utils/iconMapper';
import { iconRenderer }                        from './utils/iconRenderer';
import { componentIconReplacer }               from './utils/componentIconReplacer';
import { iconMap }                             from './utils/iconMap';


export class AdminThemeServiceProvider extends ServiceProvider {
    providers = [];

    public boot() {
        if ( this.app.isBound('styling') ) {
            let styling = this.app.get<Config<Record<string, string>>>('styling');
            styling.merge(styleVars.raw());
        }

        let registry = this.app.get<ShortcutTypeRegistry>('shortcut.types');
        registry.register({
            name     : 'default',
            Component: DefaultShortcutType,
        });
        registry.register({
            name     : 'dropdown',
            Component: DropdownShortcutType,
        });
    }

    public register() {

        this.vuePlugin(AdminThemeVuePlugin);

        this.registerShortcuts();
        this.registerIcons();
        this.registerMenus();

        this.app.extendRoot({
            data() {
                return {
                    layout: null,
                };
            },
            methods: {
                setLayout(layout) {this.layout = layout; },
                getLayout() {return this.layout; },
                hasLayout() {return this.layout !== null;},
            },
        });

    }

    public registerShortcuts() {
        this.app.singleton('shortcut.types', ShortcutTypeRegistry);
    }

    public registerMenus() {
        // @todo move this to pyro/menus-module addon and the corresponding link type extensions addons
        this.app.dynamic('menus', app => {
            let manager = this.app.resolve(MenuManager);
            manager.registerType('default', 'py-default-menu-item-type');

            manager.registerType('pyro.extension.label_link_type', 'py-label-menu-item-type');
            manager.registerType('pyro.extension.header_link_type', 'py-header-menu-item-type');
            //asdf
            manager.registerType('pyro.extension.divider_link_type', 'py-divider-menu-item-type');
            manager.registerType('pyro.extension.url_link_type', 'py-default-menu-item-type');
            manager.registerType('pyro.extension.module_link_type', 'py-default-menu-item-type');
            manager.registerType('pyro.extension.cp_action_link_type', 'py-default-menu-item-type');
            return manager;
        });

        // @todo move this to pyro/menus-module addon
        this.app.addBindingGetter('menus');
        this.app.factory('menus.icon.renderer', (h: CreateElement, icon: string, data: VNodeData = {}) => {
            return this.app.get<IconRenderer>('icon.renderer')(h, icon, data);
        });
    }


    public registerIcons() {

        this.app.instance('icon.map', iconMap);
        this.app.ctxfactory('icon.mapper', ctx => iconMapper(ctx.container.get('icon.map')));
        this.app.ctxfactory('icon.renderer', ctx => iconRenderer(ctx.container.get('icon.mapper')));
        this.app.ctxfactory('icon.replacer', ctx => componentIconReplacer(ctx.container.get('icon.mapper')));
        this.app.hooks.started.tap(this.constructor.name, root => this.app.get<ComponentIconReplacer>('icon.replacer')(root));

        // this.app['iconRenderer']=(h: CreateElement, icon: string, data: VNodeData = {}) => {
        //     console.log('icon.renderer', icon, {icon,data,h})
        //     if ( !icon ) {return null;}
        //     data.class = data.class || {};
        //
        //     if ( icon.includes('fa-') ) {
        //         icon=icon.replace('fa-', '');
        //     }
        //     if ( icon.includes('fa ') ) {
        //         icon=icon.replace('fa ', '');
        //     }
        //     if ( icon.includes('el-icon-') ) {
        //         icon=icon.replace('el-icon-', '');
        //     }
        //     // if ( !icon.startsWith('mdi ') ) {
        //     //     if ( icon.startsWith('mdi-') ) {
        //     //         icon = 'mdi ' + icon
        //     //     } else {
        //     //         icon = 'mdi mdi-' + icon
        //     //     }
        //     // }
        //     data.class.mdi              = true;
        //     data.class[ 'mdi-' + icon ] = true;
        //     data.class[ 'el-icon-' ]    = true;
        //     return h(data.tag || 'i', data);
        // }

    }

}