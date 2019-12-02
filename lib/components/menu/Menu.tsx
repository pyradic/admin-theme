import { TsxComponent, component, prop, Styles, styles, StylesProp, getRandomId, uniqueId } from '@pyro/platform';
import 'vue-tsx-support/enable-check'
import classNames from 'classnames'
import { MenuNode } from './MenuNode';
import { MenuItem } from './MenuItem';
import './menu.scss'
import { CreateElement } from 'vue';


@component({
    provide() {
        return {
            menu  : this,
            parent: this
        }
    }
})
export class Menu extends TsxComponent {
    @prop.classPrefix('menu') classPrefix: string
    @prop.string('div') tag;
    @prop.string('default') theme;
    @prop.string(uniqueId()) slug;
    @prop.boolean(false) collapsed;
    @prop.boolean(false) horizontal;
    @prop.boolean(false) inline;
    @prop.boolean(false) dropdown;
    @styles<Menu>(({self,theme,util}) => ({
        collapsed: {
            background: 'blue'
        }
    })) styles: StylesProp

    node: MenuNode
    items: MenuItem[]

    get classes() {
        return classNames({
            [ this.classPrefix ]                 : true,
            [ `${this.classPrefix}--collapsed` ] : this.collapsed,
            [ `${this.classPrefix}--horizontal` ]: this.horizontal,
            [ `${this.classPrefix}--vertical` ]  : !this.horizontal,
            [ `${this.classPrefix}--inline` ]    : this.inline,
            [ `${this.classPrefix}--dropdown` ]  : this.dropdown
        })
    }

    get style(): Styles {return {} }

    created() {
        this.node  = new MenuNode(this)
        this.items = []
        this.$py.menus.register(this)
    }

    mounted(){
        this.$log('mounted',this.slug,this)
    }

    beforeDestroy(){
        this.$log('beforeDestroy Menu', this)
    }

    registerItem(item: MenuItem) {
        let node = this.node.createMenuItemNode(item);
        item.parent.node.addChild(node);
        return node;
    }

    render(h: CreateElement) {
        const {tag:Tag, classes, style, $slots, slug} = this
        return <Tag class={classes} style={style} data-slug={slug}>{this.$slots.default}</Tag>
    }
}