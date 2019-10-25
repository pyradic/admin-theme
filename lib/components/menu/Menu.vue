<template>
    <component :is="tag" :class="classes" :style="styles">
        <slot name="start"></slot>
        <slot>
            <template v-if="hasLinks">
                <template v-for="(link,ilink) in links">
                    <py-menu-item v-bind="link" :link="link" :links="link.children"/>
                </template>
            </template>
        </slot>
        <slot name="end"></slot>
    </component>
</template>
<script lang="ts">
    import { component, inject, prop, provide, rprovide, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import { IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags, PyroMenuLink } from './types';
    import Layout from '../layout/Layout.vue';
    import { MenuNode } from './tree';
    import MenuItem from './MenuItem.vue';
    import { MenuItemArray } from './MenuItemArray';

    @component()
    export default class Menu extends Vue {
        @prop.classPrefix('menu') classPrefix: string
        @inject() layout: typeof Layout.prototype
        // @inject({ from: 'layoutArea', default: null }) layoutArea: string
        @prop.array() links: PyroMenuLink[];
        @prop.boolean() compact: boolean;
        @prop.boolean() sidebar: boolean;
        @prop.boolean() horizontal: boolean;
        @prop.boolean() fullHeight: boolean;
        @prop([ String, Number ]) height: string | number;
        @prop.string('default') theme: string;
        @prop.string('ul') tag: string;
        @prop.string('li') itemTag: string;
        @prop.string('a') itemLinkTag: string;
        @prop.string('i') itemIconTag: string;
        @prop.string('ul') submenuTag: string;
        @provide() @prop.string('anchor') defaultItemType: string
        @provide() @prop.string('slide') submenuType: IMenuSubmenuType;
        @provide() @prop.string('click') submenuTrigger: IMenuSubmenuTrigger;
        @provide() dynamic: boolean = false
        @provide() menuEvents       = new Vue;
        @provide() menu: Menu       = this;

        node: MenuNode;
        selected: typeof MenuItem.prototype = null;
        items: any[]; //CMenuItemArray;

        beforeCreate() {
            this.node  = new MenuNode()
            // this.node.onAny((event, values) => console.dir({event,values}))
            this.items = new MenuItemArray();
        }

        @rprovide() get tags(): IMenuTags { return { item: this.itemTag, itemLink: this.itemLinkTag, itemIcon: this.itemLinkTag, submenu: this.submenuTag };}

        @provide('registerItem') registerItem = (item: typeof MenuItem.prototype) => {
            this.items.push(item);
            this.menuEvents.$emit('registered', [ item ])
        };

        mounted() {
            // if ( this.inLayout ) {
            // this.$watch('layout.' + this.layoutArea + '.collapsed', (collapsed) => {
            //
            // })
            // }
        }

        get hasLinks(): boolean { return Array.isArray(this.links) && this.links.length > 0; }

        getItems(): MenuItemArray {return new MenuItemArray(...this.items); }

        // get inLayout() {return this.layout != null && this.layoutArea != null}

        // get layoutPart() {return this.layout.instances[ this.layoutArea ] }

        get classes() {
            return {
                [ this.classPrefix ]                          : true,
                [ `${this.classPrefix}--${this.submenuType}` ]: true,
                [ `${this.classPrefix}--theme-${this.theme}` ]: true,
                [ `${this.classPrefix}--compact` ]            : this.compact,
                [ `${this.classPrefix}--horizontal` ]         : this.horizontal,
                [ `${this.classPrefix}--sidebar` ]            : this.sidebar
            }
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

        get(fullKey: string): typeof MenuItem.prototype {
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
</script>