import { app, prefixAndRegisterComponents, registerElementComponents }                                                               from '@pyro/platform';
import { Alert, Aside, Button, Col, Container, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Header, Link, Main, Row, Tag } from 'element-ui';

import Vue       from 'vue';
import ElIcon    from './components/el-icon/icon.vue';
import lang      from 'element-ui/lib/locale/lang/nl';
import locale    from 'element-ui/lib/locale';
import vuescroll from 'vuescroll';
import PortalVue from 'portal-vue'

import * as components from './components';
import * as directives from './directives';
import BEMPlugin       from './plugins/bem';

export class AdminThemeVuePlugin {

    private static __installed = false;

    public static install(_Vue: typeof Vue, opts: any = {}) {
        if ( this.__installed ) {
            return;
        }
        this.__installed = true;

        _Vue.use(BEMPlugin, {
            delimiters: {
                ns    : app.config.prefix,
                el    : '__',
                mod   : '--',
                modVal: ':',
            },
        });

        _Vue.use(PortalVue);

        locale.use(lang);

        prefixAndRegisterComponents(_Vue, components);

        registerElementComponents(_Vue, { ElIcon });
        registerElementComponents(_Vue, {
            Row, Col, Aside, Header, Footer, Container, Main,
            Divider, Alert, Tag, Button, Link,
            // Menu, MenuItem, MenuItemGroup, Submenu
            DropdownMenu, DropdownItem, Dropdown,
            ElIcon,
        });

        app.hooks.start.tap('AdminThemeVuePlugin', Vue => {
            Vue.component(ElIcon.name, ElIcon);
        });

        // _Vue.component(Menu.name, Menu)
        // _Vue.component(MenuItem.name, MenuItem)
        // _Vue.component(MenuItemGroup.name, MenuItemGroup)
        // _Vue.component(Submenu.name, Submenu)

        for ( const id in directives ) {
            _Vue.directive(id, directives[ id ]);
        }

        _Vue.component('py-scroll', async function () {
            const VueScroll: typeof vuescroll = await import('vuescroll/dist/vuescroll-native');
            Vue.use(VueScroll, {});
            VueScroll.install(Vue);
            return VueScroll;
        });

        _Vue.mixin({
            methods: {

                getFirstMatchingParent(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue) => boolean) {
                    return this.getAllMatchingParents(isMatch, (component, matches) => {
                        return matches.length > 0 || (shouldCancel ? shouldCancel(component) : false);
                    })[ 0 ];
                },
                getAllMatchingParents(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue, matches: Vue[]) => boolean) {
                    let cancel  = false;
                    let matches = [];
                    let parent  = this.$parent;
                    while ( parent && cancel !== true ) {
                        if ( isMatch(parent) === true ) {
                            matches.push(parent);
                        }
                        if ( typeof shouldCancel === 'function' ) {
                            cancel = shouldCancel(parent, matches);
                        }
                        parent = parent.$parent;
                    }
                    return matches;
                },
            },
        });

    }
}