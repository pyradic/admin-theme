import Vue from 'vue';
import { prefixAndRegisterComponents, registerElementComponents } from '@pyro/platform';
// noinspection ES6UnusedImports
import { Alert, Aside, Button, Col, Container, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Header, Link, Main, Row, Tag } from 'element-ui' //
import Menu from './components/el-menu/menu.vue'
import MenuItem from './components/el-menu/menu-item.vue'
import MenuItemGroup from './components/el-menu/menu-item-group.vue'
import Submenu from './components/el-menu/submenu.vue'


import * as components from './components';
import * as directives from './directives';

export class AdminThemeVuePlugin {

    private static __installed = false

    public static install(_Vue: typeof Vue, opts: any = {}) {
        if ( this.__installed ) {
            return;
        }
        this.__installed = true

        prefixAndRegisterComponents(_Vue, components)

        registerElementComponents(_Vue, {
            Row, Col, Aside, Header, Footer, Container, Main,
            Divider, Alert, Tag, Button, Link
            // Menu, MenuItem, MenuItemGroup, Submenu
            // DropdownMenu, DropdownItem, Dropdown
        })

        _Vue.component(Menu.name, Menu)
        _Vue.component(MenuItem.name, MenuItem)
        _Vue.component(MenuItemGroup.name, MenuItemGroup)
        _Vue.component(Submenu.name, Submenu)

        for ( const id in directives ) {
            _Vue.directive(id, directives[ id ])
        }

        _Vue.mixin({
            methods: {

                getFirstMatchingParent(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue) => boolean) {
                    return this.getAllMatchingParents(isMatch, (component, matches) => {
                        return matches.length > 0 || (shouldCancel ? shouldCancel(component) : false);
                    })[ 0 ]
                },
                getAllMatchingParents(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue, matches: Vue[]) => boolean) {
                    let cancel  = false;
                    let matches = []
                    let parent  = this.$parent
                    while ( parent && cancel !== true ) {
                        if ( isMatch(parent) === true ) {
                            matches.push(parent)
                        }
                        if ( typeof shouldCancel === 'function' ) {
                            cancel = shouldCancel(parent, matches)
                        }
                        parent = parent.$parent
                    }
                    return matches;
                }
            }
        })

    }
}