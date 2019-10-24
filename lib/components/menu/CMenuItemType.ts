import { component, prop } from '@/decorators';
import { mixins } from 'vue-class-component';
import { CMenuMixin } from './CMenuMixin';
import classNames from 'classnames';
import { Styles } from '@/interfaces';
import { CMenuItem } from './CMenuItem';
import { MenuType, MenuTypeRegistry } from '#/menu/MenuTypeRegistry';
import Vue from 'vue';


const log = require('debug')('components:c-menu-item');

export { CMenuItemType };
@component({
    name: 'c-menu-item-type'
})
export default class CMenuItemType extends Vue  {
    static template = `
<component
    :is="component"
    :class="classes"
    :style="style"
    :menu-item="menuItem"
    >
    <slot></slot>
</component>
        `;
// <!--- :data-key="fullKey" --->

    @prop(String) type: string
    @prop(Object) menuItem: CMenuItem

    _type: MenuType
    types: MenuTypeRegistry
    component: typeof Vue = null

    created() {
        this.types = this.$app.get('component.menu.types')
        if ( ! this.types.isRegistered(this.type) ) {
            throw new Error(`Menu type [${this.type}] is not registered`)
        }
        this._type     = this.types.find(this.type)
        this.component = this._type.component
    }

    get classes() {
        return classNames(
            'c-menu__type',
            `c-menu__type--${this.type}`,
        );
    }

    get style(): Styles {return {}; }

}
