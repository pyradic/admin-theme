import Vue from 'vue';
import { prefixAndRegisterComponents, registerElementComponents } from '@pyro/platform';
// noinspection ES6UnusedImports
import { Aside, Col, Container, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Header, Main, Menu, MenuItem, MenuItemGroup, Row, Submenu } from 'element-ui'

import * as components from './components';

export class AdminThemeVuePlugin {

    private static __installed = false

    public static install(_Vue: typeof Vue, opts: any = {}) {
        if ( this.__installed ) {
            return;
        }
        this.__installed = true

        prefixAndRegisterComponents(_Vue, components)

        registerElementComponents(_Vue, {
            Row, Col, Aside, Header, Footer, Container, Main, Divider,
            Menu, MenuItem, MenuItemGroup, Submenu
            // DropdownMenu, DropdownItem, Dropdown
        })

    }
}