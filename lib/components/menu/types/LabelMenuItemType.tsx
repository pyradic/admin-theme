import { component, inject, prop, slot, TsxComponent, when } from '@pyro/platform';
import 'vue-tsx-support/enable-check';
import { Menu }                                              from '../Menu';
import { MenuItem }                                          from '../MenuItem';

@component({
    block     : '-menu-item',
})
export class LabelMenuItemType extends TsxComponent {
    @prop.classPrefix('menu-item--label') classPrefix
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
               class={this.b('content')}
               onclick={handleClick as any}
            >
                <span class={this.b('icon')} ref="icon">
                    {slot(this, 'icon', when(icon, renderMenuIcon(h, icon)))}
                </span>
                <span class={this.b('title')} ref="title">
                    {slot(this, 'default', title)}
                </span>
                <span class={this.b('spacing')} ref="spacing"/>
                <span class={this.b('arrow')} ref="arrow">
                    {slot(this, 'arrow', <i/>)}
                </span>
            </span>
        );
    }
}