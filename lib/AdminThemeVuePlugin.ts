import Vue from 'vue';
import { prefixAndRegisterComponents, registerElementComponents } from '@pyro/platform';
// noinspection ES6UnusedImports
import { Alert, Aside, Button, Col, Container, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Header, Link, Main, Menu, MenuItem, MenuItemGroup, Row, Submenu, Tag } from 'element-ui'

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
            Divider, Alert, Tag, Button, Link,
            Menu, MenuItem, MenuItemGroup, Submenu
            // DropdownMenu, DropdownItem, Dropdown
        })

        for ( const id in directives ) {
            _Vue.directive(id, directives[ id ])
        }

    }
}