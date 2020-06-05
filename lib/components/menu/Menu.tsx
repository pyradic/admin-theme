import { component, prop, Styles, StylesProp, TsxComponent, uniqueId } from '@crvs/platform';
import 'vue-tsx-support/enable-check';
import classNames                                                              from 'classnames';
import { MenuNode }                                                            from './MenuNode';
import { MenuItem }                                                            from './MenuItem';
import './menu.scss';
import { CreateElement }                                                       from 'vue';
import { styles } from './styling';


@component({
    provide() {
        return {
            menu  : this,
            parent: this,
        };
    },
})
export class Menu extends TsxComponent {
    @prop.classPrefix('menu') classPrefix: string;
    @prop.string('auto') grow;
    @prop.string('div') tag: string;
    @prop.string('default') theme: string;
    @prop.string('default') behaviour: string;
    @prop.string(uniqueId()) slug: string;
    @prop.boolean(false) collapsed: boolean;
    @prop.boolean(false) horizontal: boolean;
    @prop.boolean(false) inline: boolean;
    @prop.boolean(false) dropdown: boolean;
    // @styles<Menu>(({ self, theme, util }) => ({
    //     collapsed: {
    //         background: 'blue',
    //     },
    // })) styles: StylesProp;

    get vertical() {return !this.horizontal;}

    get slide() {return !this.dropdown;}

    node: MenuNode;
    items: MenuItem[];
    currentBehaviourName:string

    get classes() {
        return classNames({
            // [ styles.class('menu') ]                 : true,
            [ this.classPrefix ]                 : true,
            [ `${this.classPrefix}--collapsed` ] : this.collapsed,
            [ `${this.classPrefix}--horizontal` ]: this.horizontal,
            [ `${this.classPrefix}--vertical` ]  : this.vertical,
            [ `${this.classPrefix}--inline` ]    : this.inline,
            [ `${this.classPrefix}--dropdown` ]  : this.dropdown,
            [ `${this.classPrefix}--slide` ]     : this.slide,
        });
    }

    get style(): Styles {return {}; }
    created() {
        this.node  = new MenuNode(this);
        this.items = [];
        this.$py.menus.register(this);
    }

    mounted() {
        this.$log('mounted', this.slug, this);
        this.$py.menus.bindMenuBehaviour(this)
    }

    beforeDestroy() {
        this.$log('beforeDestroy Menu', this);
    }

    registerItem(item: MenuItem) {
        let node = this.node.createMenuItemNode(item);
        item.parent.node.addChild(node);
        return node;
    }

    render(h: CreateElement) {
        const { tag: Tag, classes, style, $slots, slug } = this;
        return <Tag class={classes} style={style} data-slug={slug}>{this.$slots.default}</Tag>;
    }
}