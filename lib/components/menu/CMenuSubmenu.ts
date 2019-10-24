import { component, inject } from '@/decorators';
import classNames from 'classnames';
import Vue from 'vue';
import { CMenu } from './CMenu';
import { IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags } from './types';
import { Styles } from '@/interfaces';


const log = require('debug')('components:c-menu-submenu');

export { CMenuSubmenu };
@component()
export default class CMenuSubmenu extends Vue {
    static template = `
<component
:is="tags.submenu" 
:class="classes"
:style="style"
><slot></slot></component>`;

    @inject() menu: CMenu;
    @inject() menuEvents: Vue;
    @inject() submenuType: IMenuSubmenuType
    @inject() submenuTrigger: IMenuSubmenuTrigger
    @inject() tags: IMenuTags

    get classes() {
        return classNames(
            'c-menu__submenu'
        );
    }

    get style(): Styles {
        return { }; //zIndex: this.baseZIndex + 1 + this.depth }
    }


}
