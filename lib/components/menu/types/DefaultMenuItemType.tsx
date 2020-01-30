import { component, inject, inject$, prop, slot, TsxComponent, when } from '@pyro/platform';
import 'vue-tsx-support/enable-check';
import { Menu }                                                       from '../Menu';
import { MenuItem }                                                   from '../MenuItem';
import { IconRenderer }                                               from '../../../interfaces';

@component({
    block     : 'menu-item',
})
export class DefaultMenuItemType extends TsxComponent {
    @prop.classPrefix('menu-item') classPrefix: string;
    @inject() menu: Menu;
    @inject$('menus.icon.renderer') renderMenuIcon:IconRenderer;
    @prop.object.required() menuItem: MenuItem;
    @prop.object() attributes: any

    render(h) {
        const {usePopper, href, handleClick,icon,title} = this.menuItem
        const contentExtras = {attrs:{...this.attributes}}
        return (
            <a ref="content"
               {...contentExtras}
               slot={usePopper ? 'reference' : null}
               href={href}
               onclick={handleClick as any}
            >
                <span class={this.E('icon')} ref="icon">
                    {slot(this, 'icon', when(icon, this.renderMenuIcon(h, icon)))}
                </span>
                <span class={this.E('title')} ref="title">
                    {slot(this, 'default', title)}
                </span>
                <span class={this.E('spacing')} ref="spacing"/>
                <span class={this.E('arrow')} ref="arrow">
                    {slot(this, 'arrow', <i/>)}
                </span>
            </a>
        );
    }
}