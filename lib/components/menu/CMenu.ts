import Vue from 'vue';
import { component, inject, prop, provide, rprovide } from '@/decorators';
import { CMenuItemArray } from './CMenuItemArray';
import CMenuItem from './CMenuItem';
import { Styles } from '@/interfaces';
import { IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags, PyroMenuLink } from './types';
import { MenuNode } from './MenuNode';
import classNames from 'classnames';
import { CLayout } from '#/layout';

const log = require('debug')('components:c-menu');


export { CMenu };
@component()
export default class CMenu extends Vue {
    // language=Vue
    static template = `
        <component :is="tag" :class="classes">
            <slot name="start"></slot>
            <slot>
                <template v-if="hasLinks">
                    <template v-for="(link,ilink) in links">
                        <c-menu-item v-bind="link" :link="link" :links="link.children"/>
                    </template>
                </template>
            </slot>
            <slot name="end"></slot>
        </component>`;

    @inject({ from: 'layout', default: null }) layout: CLayout
    @inject({ from: 'layoutArea', default: null }) layoutArea: string
    @prop.classPrefix('menu') classPrefix: string
    @prop(Array) links: PyroMenuLink[];
    @prop(Boolean) compact: boolean;
    @prop.boolean() sidebar: boolean;
    @prop(Boolean) horizontal: boolean;
    @prop(Boolean) fullHeight: boolean;
    @prop([ String, Number ]) height: string | number;
    @prop(String, 'default') theme: string;
    @prop(String, 'ul') tag: string;
    @prop(String, 'li') itemTag: string;
    @prop(String, 'a') itemLinkTag: string;
    @prop(String, 'i') itemIconTag: string;
    @prop(String, 'ul') submenuTag: string;
    @provide() @prop(String, 'anchor') defaultItemType: string
    @provide() @prop(String, 'slide') submenuType: IMenuSubmenuType;
    @provide() @prop(String, 'click') submenuTrigger: IMenuSubmenuTrigger;
    @provide() dynamic: boolean = false
    @provide() menuEvents       = new Vue;
    @provide() menu: CMenu      = this;

    node: MenuNode;
    selected: CMenuItem = null;
    items: CMenuItemArray;

    beforeCreate() {
        this.node  = new MenuNode()
        // this.node.onAny((event, values) => console.dir({event,values}))
        this.items = new CMenuItemArray();
    }

    @rprovide() get tags(): IMenuTags { return { item: this.itemTag, itemLink: this.itemLinkTag, itemIcon: this.itemLinkTag, submenu: this.submenuTag };}

    @provide('registerItem') registerItem = (item: CMenuItem) => {
        this.items.push(item);
        this.menuEvents.$emit('registered', [ item ])
    };

    mounted(){
        if(this.inLayout){
            this.$watch('layout.' + this.layoutArea + '.collapsed', (collapsed) => {

            })
        }
    }

    get hasLinks(): boolean { return Array.isArray(this.links) && this.links.length > 0; }

    getItems(): CMenuItemArray {return new CMenuItemArray(...this.items); }

    get inLayout() {return this.layout != null && this.layoutArea != null}

    get layoutPart() {return this.layout.instances[ this.layoutArea ] }

    get classes() {
        return classNames(
            this.classPrefix,
            `${this.classPrefix}--${this.submenuType}`,
            `${this.classPrefix}--theme-${this.theme}`,
            this.compact && `${this.classPrefix}--compact`,
            this.horizontal && `${this.classPrefix}--horizontal`,
            this.sidebar && `${this.classPrefix}--sidebar`,
        )
    }

    get styles() {
        let styles: Styles = {};
        if ( this.fullHeight ) {
            styles.height = '100%';
        }
        if ( this.height ) {
            styles.height = this.height;
        }
        return styles;
    }

    get(fullKey: string): CMenuItem {
        let component: Vue = this;
        let current        = [ 'menu' ];
        for ( let key of fullKey.split('.') ) {
            if ( component.$children[ key ] === undefined ) {
                throw new Error('could not get key ' + key + ' in ' + current.join('.'));
            }
            current.push(key);

            component = component.$children[ key ];
        }
        return component as any;
    }
}
