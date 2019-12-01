import { component, inject, prop, Styles } from '@pyro/platform';
import 'vue-tsx-support/enable-check'
import * as tsx from 'vue-tsx-support'
import classNames from 'classnames'
import Menu from './Menu.vue';
import { MenuItem } from './MenuItem';

@component({})
export class MenuSubmenu extends tsx.Component<{}> {
    @prop.classPrefix('menu-submenu') classPrefix: string
    @inject() menu: typeof Menu.prototype
    @inject() parent: typeof Menu.prototype | MenuItem

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