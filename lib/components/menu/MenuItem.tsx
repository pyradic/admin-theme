import { component, inject, prop, Styles, TsxComponent } from '@pyro/platform';
import 'vue-tsx-support/enable-check'
import classNames from 'classnames'
import Menu from './Menu.vue';
import { MenuItemNode } from './MenuItemNode';
import { mapNodeStateObservableToTarget } from './utils';
import { RenderMenuIcon } from './interfaces';

@component({
    provide() {
        return {
            parent: this
        }
    },
    block: '-menu-item'
})
export class MenuItem extends TsxComponent<{ tag: string, slug?: string }> {
    @inject() menu: typeof Menu.prototype
    @inject() parent: typeof Menu.prototype | MenuItem

    @prop.classPrefix('menu-item') classPrefix: string
    @prop.string('div') tag;
    @prop.string() slug: string
    @prop.string() url: string
    @prop.string() icon: string;
    @prop.boolean() active: boolean;


    isHidden: boolean   = false;
    isHovered: boolean  = false;
    isExpanded: boolean = false;
    isSelected: boolean = false;
    isFocused: boolean  = false;
    isActive: boolean   = false;

    node: MenuItemNode

    get classes() {
        return classNames({
            [ this.classPrefix ]: true,
            'is-hidden'         : this.isHidden,
            'is-hovered'        : this.isHovered,
            'is-expanded'       : this.isExpanded,
            'is-selected'       : this.isSelected,
            'is-focused'        : this.isFocused,
            'is-active'         : this.isActive,
            'has-children'      : this.hasChildren
        })
    }

    get style(): Styles { return {} }

    get hasChildren() {return this.$slots.submenu || this.node.hasChildren()}

    get href() {
        if ( this.hasChildren ) {
            return 'javascript:void(0);'
        }
        if ( this.url ) {
            return this.url
        }
        if ( this.$attrs.href ) {
            return this.$attrs.href
        }
    }

    beforeMount() {
        this.$watch('active', value => value ? this.node.activate() : this.node.deactivate(), { immediate: true })
    }

    created() {
        this.node = this.menu.registerItem(this)
        mapNodeStateObservableToTarget(this.node, this, {
            hidden  : 'isHidden',
            focused : 'isFocused',
            expanded: 'isExpanded',
            hovered : 'isHovered',
            active  : 'isActive',
            selected: 'isSelected'
        });
    }

    handleClick(event: MouseEvent) {
        console.log('MenuItem.handleClick', { event, me: this });
        event.stopPropagation();
        if ( this.hasChildren ) {
            event.preventDefault();
            this.node.toggle();
        }
    }

    handleMouseOver(event: MouseEvent) { !this.node.hovered() && this.node.hover(); }

    handleMouseLeave(event: MouseEvent) {this.node.hovered() && this.node.unhover(); }

    // handleClickOutside(event: MouseEvent) {if ( this.hasSubmenu && this.node.expanded() && this.menu.dropdown ) {            this.node.collapse();        }    }


    render(h) {
        const { classes, style, tag: Tag } = this
        const renderMenuIcon               = this.$py.get<RenderMenuIcon>('menu.icon.render');
        return (
            <Tag class={classes} style={style} ref="root" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                <a class={this.b('content')} href={this.href} onClick={this.handleClick as any}>
                    <span class={this.b('icon')} ref="icon">
                        <slot name="icon">
                            {this.icon ? renderMenuIcon(h, this.icon) : null}
                        </slot>
                    </span>
                    <span class={this.b('title')} ref="title">
                        {this.$slots.default}
                    </span>
                    <span class={this.b('arrow')} ref="arrow">
                        <slot name="arrow">
                            <i/>
                        </slot>
                    </span>
                </a>
                {this.$slots.submenu ? <py-menu-submenu>{this.$slots.submenu}</py-menu-submenu> : null}
            </Tag>
        )
    }
}