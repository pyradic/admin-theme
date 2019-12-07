import { component, inject, prop, slot, TsxComponent, when } from '@pyro/platform';
import 'vue-tsx-support/enable-check';
import { Menu }                                              from '../Menu';
import { MenuItem }                                          from '../MenuItem';

@component({
    block     : '-menu-item',
})
export class HeaderMenuItemType extends TsxComponent {
    @prop.classPrefix('menu-item--header') classPrefix
    @inject() menu: Menu;
    @prop.object.required() menuItem: MenuItem;
    @prop.object() attributes: any

    render(h) {
        const {usePopper, href, handleClick,icon,renderMenuIcon,title} = this.menuItem
        const contentExtras = {attrs:{...this.attributes}}
        return (
            <span ref="content"
               {...contentExtras}
               slot={usePopper ? 'reference' : null}
               class={this.b('default')}
               onclick={handleClick as any}
            >
                <span class={this.b('title')} ref="title">
                    {slot(this, 'default', title)}
                </span>
            </span>
        );
    }
}