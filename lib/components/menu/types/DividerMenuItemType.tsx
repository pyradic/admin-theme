import { component, inject, prop, TsxComponent } from '@pyro/platform';
import 'vue-tsx-support/enable-check';
import { Menu }                                  from '../Menu';
import { MenuItem }                              from '../MenuItem';

@component({
    block     : 'menu-item-type',
})
export class DividerMenuItemType extends TsxComponent {
    @prop.classPrefix('menu-item--divider') classPrefix
    @inject() menu: Menu;
    @prop.object.required() menuItem: MenuItem;
    @prop.object() attributes: any;

    render(h) {
        const { usePopper, href, handleClick, icon, renderMenuIcon, title } = this.menuItem;
        const contentExtras                                                 = { attrs: { ...this.attributes } };
        return (
            <div  direction="horizontal"/>
        );
    }
}