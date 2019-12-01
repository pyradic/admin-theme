import { component, inject, Platform, TsxComponent } from '@pyro/platform';
import Menu from '../menu/Menu.vue';
import Layout from '../layout/Layout.vue';
import StructureNavigtion = Platform.StructureNavigtion;

@component()
class MenuDemo extends TsxComponent {
    @inject() layout: typeof Layout.prototype
    $props: {
        classPrefix: string
        tag: string;
        collapsed: boolean
        horizontal: boolean
        inline: boolean
        dropdown: boolean
    }
    items: StructureNavigtion[] = []

    created() {
        this.items = Object.values(this.$py.data.cp.structure);
    }

    h?
    render(h) {
        this.h=h
        const { $props }                    = this
        const { classPrefix, ...menuProps } = $props
        return (
            <py-menu {...menuProps} collapsed={this.layout.sidebar.collapsed}>
                {this.items.map(item => this.renderItem(item))}
            </py-menu>
        )
    }

    renderItem(item: StructureNavigtion) {
        const h = this.h
        const { title, active, attributes, children, icon, key, url } = item
        return (
            <py-menu-item
                {...attributes}
                slug={key}
                class={item.class}
                active={active}
                icon={icon}
                url={url}
            >
                {title}
                {children ?
                 <template slot="submenu">
                     {children.map(child => this.renderItem(child as any))}
                 </template> : null
                }
            </py-menu-item>
        )
    }
}

export default MenuDemo.extend({ props: Menu.options.props })