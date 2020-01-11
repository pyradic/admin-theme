import { cash, Config, ServiceProvider } from '@pyro/platform';
import { AdminThemeVuePlugin }           from './AdminThemeVuePlugin';
import { styleVars }                from './styling/export';
import { CreateElement, VNodeData } from 'vue';
import { MenuManager }              from './components/menu/MenuManager';
import { ShortcutTypeRegistry }     from './components/shortcut';
import DefaultShortcutType          from './components/shortcut/types/DefaultShortcutType.vue';
import DropdownShortcutType         from './components/shortcut/types/DropdownShortcutType.vue';
import { IconMapper }               from './interfaces';


export class AdminThemeServiceProvider extends ServiceProvider {
    providers = [];

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
        this.app.dynamic('menus', app => {
            let manager = this.app.resolve(MenuManager);
            manager.registerType('default', 'py-default-menu-item-type');
            manager.registerType('pyro.extension.label_link_type', 'py-label-menu-item-type');
            manager.registerType('pyro.extension.header_link_type', 'py-header-menu-item-type');
            manager.registerType('pyro.extension.divider_link_type', 'py-divider-menu-item-type');
            manager.registerType('pyro.extension.url_link_type', 'py-default-menu-item-type');
            manager.registerType('pyro.extension.module_link_type', 'py-default-menu-item-type');
            manager.registerType('pyro.extension.cp_action_link_type', 'py-default-menu-item-type');
            return manager;
        });

        this.app.addBindingGetter('menus');
        this.app.factory('menus.icon.renderer', (h: CreateElement, icon: string, data: VNodeData = {}) => {
            if ( !icon ) {return null;}
            data.class = data.class || {};
            if ( !icon.startsWith('fa ') ) {
                if ( icon.startsWith('fa-') ) {
                    icon = 'fa ' + icon;
                } else {
                    icon = 'fa fa-' + icon;
                }
            }
            data.class[ icon ] = true;
            return h('i', data);
        });
    }


    public registerIcons() {

        this.app.instance('icon.map', {
            fa: {
                mdi: {},
            },
            el: {
                mdi: {
                    user: 'account',
                },
            },
        });
        this.app.ctxfactory('icon.mapper', ctx => {
            let map: Record<string, Record<string, Record<string, string>>> = ctx.container.get('icon.map');
            return (name: string, target: string, icon: string) => {
                if ( name in map && target in map[ name ] && icon in map[ name ][ target ] ) {
                    return map[ name ][ target ][ icon ];
                }
                return icon;
            };
        });
        this.app.hooks.started.tap(this.constructor.name, root => {
            root.$nextTick(() => {
                const els = document.querySelectorAll('[class^="el-icon-"]');
                console.log('[class^="el-icon-"]', els);
                let mapper = this.app.get<IconMapper>('icon.mapper');
                Array.from(els).forEach(el => {
                    let className = Array.from(el.classList).find(className => className.startsWith('el-icon-'));
                    if ( !el.classList.contains('mdi') && className ) {
                        let icon = mapper('el', 'mdi', className.replace('el-icon-', ''));
                        el.classList.remove(className);
                        el.classList.add('el-icon-');
                        el.classList.add('mdi');
                        el.classList.add('mdi-' + icon);
                    }
                });
                Array.from(document.querySelectorAll('[class^="mdi-"]'))
                    .forEach(el => {
                        if ( !el.classList.contains('mdi') ) {
                            el.classList.add('mdi');
                        }
                        if ( !el.classList.contains('el-icon-') ) {
                            el.classList.add('el-icon-');
                        }
                    });

                Array.from(document.querySelectorAll('i'))
                    .forEach(el => {
                        if ( !el.classList.contains('mdi') &&  !el.classList.contains('el-icon-') &&  !el.classList.contains('fa')  ) {
                            el.className = 'el-icon- mdi mdi-' + el.className;
                        }
                    })
            });
        });
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
        this.app.factory('icon.renderer', (h: CreateElement, icon: string, data: VNodeData = {}) => {
            console.log('icon.renderer', icon, { icon, data, h });
            if ( !icon ) {return null;}
            data.class = data.class || {};

            if ( icon.includes('fa-') ) {
                icon = icon.replace('fa-', '');
            }
            if ( icon.includes('fa ') ) {
                icon = icon.replace('fa ', '');
            }
            if ( icon.includes('el-icon-') ) {
                icon = icon.replace('el-icon-', '');
            }
            // if ( !icon.startsWith('mdi ') ) {
            //     if ( icon.startsWith('mdi-') ) {
            //         icon = 'mdi ' + icon
            //     } else {
            //         icon = 'mdi mdi-' + icon
            //     }
            // }
            data.class.mdi              = true;
            data.class[ 'mdi-' + icon ] = true;
            data.class[ 'el-icon-' ]    = true;
            return h(data.tag || 'i', data);
        });
    }

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
}