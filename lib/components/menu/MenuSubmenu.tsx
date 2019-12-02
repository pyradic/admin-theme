import { component, inject, prop, Styles, TsxComponent } from '@pyro/platform';
import 'vue-tsx-support/enable-check'
import classNames from 'classnames'
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

@component({})
export class MenuSubmenu extends TsxComponent {
    @prop.classPrefix('menu-submenu') classPrefix: string
    @inject() menu: Menu
    @inject() parent: Menu | MenuItem

    get classes() {
        return classNames({
            [ this.classPrefix ]: true
        })
    }

    get style(): Styles {
        return {}
    }

    render(h) {
        const { classes, style } = this
        return (
            <div class={classes}>
                {this.$slots.default}
            </div>
        )
    }
}