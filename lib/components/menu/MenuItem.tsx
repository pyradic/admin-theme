import { component, inject, prop, slot, styles, Styles, StylesProp, TsxComponent, when } from '@pyro/platform';
import 'vue-tsx-support/enable-check'
import classNames from 'classnames'
import { Menu } from './Menu';
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
    $refs: { root: HTMLElement, content: HTMLAnchorElement, icon: HTMLSpanElement, title: HTMLSpanElement, spacing: HTMLSpanElement, arrow: HTMLSpanElement }

    @inject() menu: Menu
    @inject() parent: Menu | MenuItem

    @prop.classPrefix('menu-item') classPrefix: string
    @prop.string('div') tag;
    @prop.string() title: string
    @prop.string() slug: string
    @prop.string() url: string
    @prop.string() icon: string;
    @prop.boolean() active: boolean;
    @prop.object() attributes: any;

    @styles<MenuItem>(({ util, theme, self }) => ({
        sdf: {}
    })) styles: StylesProp


    isHidden: boolean   = false;
    isHovered: boolean  = false;
    isExpanded: boolean = false;
    isSelected: boolean = false;
    isFocused: boolean  = false;
    isActive: boolean   = false;
    isDropdown: boolean   = true;

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

    get hasChildren() {return this.$slots.submenu != null || this.node.hasChildren()}

    get href() {
        if ( this.hasChildren ) {
            return 'javascript:void(0);'
        }
        if ( this.url ) {
            return this.url
        }
        if ( this?.attributes?.href ) {
            return this.attributes.href
        }
        if ( this.$attrs.href ) {
            return this.$attrs.href
        }

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

    beforeMount() {
        this.$watch('active', value => value ? this.node.activate() : this.node.deactivate(), { immediate: true })
    }

    handleClick(event: MouseEvent) {
        console.log('MenuItem.handleClick', { event, me: this });
        event.preventDefault();
        // event.stopPropagation();
        if ( this.hasChildren ) {
            event.preventDefault();
            this.node.toggle();
        }
    }

    handleMouseOver(event: MouseEvent) { !this.node.hovered() && this.node.hover(); }

    handleMouseLeave(event: MouseEvent) {this.node.hovered() && this.node.unhover(); }

    render(h) {
        const { classes, style, tag: Tag, attributes } = this
        const renderMenuIcon                           = this.$py.get<RenderMenuIcon>('menu.icon.render');
        const contentExtras                            = { attrs: { ...attributes } }
        return (
            <Tag ref="root"
                 class={classes}
                 style={style}
                 onMouseOver={this.handleMouseOver}
                 onMouseLeave={this.handleMouseLeave}
                 data-slug={this.slug}
            >
                <a ref="content"
                   {...contentExtras}
                   class={this.b('content')}
                   href={this.href}
                   onClick={this.handleClick as any}
                >
                    <span class={this.b('icon')} ref="icon">
                        {slot(this, 'icon', when(this.icon, renderMenuIcon(h, this.icon)))}
                    </span>
                    <span class={this.b('title')} ref="title">
                        {slot(this, 'default', this.title)}
                    </span>
                    <span class={this.b('spacing')} ref="spacing"/>
                    <span class={this.b('arrow')} ref="arrow">
                        {slot(this, 'arrow', <i/>)}
                    </span>
                </a>

                {when(this.$slots.submenu, (
                    <py-expand-transition enabled={this.isDropdown} show={this.isExpanded}>
                        <py-menu-submenu v-show={this.isExpanded}>
                            {this.$slots.submenu}
                        </py-menu-submenu>
                    </py-expand-transition>
                ))}
                {/*{this.$slots.submenu ? <py-menu-submenu>{this.$slots.submenu}</py-menu-submenu> : null}*/}
            </Tag>
        )
    }
}