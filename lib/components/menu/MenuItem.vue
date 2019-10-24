<template>
    <component
            :is="tags.item"
            :class="classes"
            :style="style"
            :data-key="fullKey"
            v-on-clickaway="clickaway"
            v-on:mouseover="handleMouseOver"
            v-on:mouseleave="handleMouseOut">
        <slot name="type">
            <py-menu-item-type
                    v-if="isMounted && menuItemType"
                    ref="type"
                    :type="menuItemType"
                    :menu-item="this"
            />
        </slot>
        <template v-if="hasChildren">
            <c-expand-transition :enabled="isSlide" :show="!state.collapsed">
                <slot name="submenu" v-bind:submenuStyle="submenuStyle">
                    <c-menu-submenu ref="submenu" :style="submenuStyle" v-show="!state.collapsed">
                        <slot>
                            <template v-if="hasLinks" v-for="(link,ilink) in links">
                                <c-menu-item v-bind="link" :link="link" :links="link.children"/>
                            </template>
                        </slot>
                    </c-menu-submenu>
                </slot>
            </c-expand-transition>

        </template>
    </component>
</template>
<script lang="ts">
    import { component, inject, merge, prop, Styles, watch } from '@pyro/platform';
    import Vue from 'vue';
    import { MenuItemNode } from './tree';
    import Popper from 'popper.js';
    import Menu from './Menu.vue';
    import { mixin as clickaway } from 'vue-clickaway';
    import { IMenuItemState, IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags, PyroMenuLink } from './types';
    import { MenuItemArray } from './MenuItemArray';

    @component({
        mixins: [ clickaway ],
    })
    export default class MenuItem extends Vue {
        @prop.classPrefix('menu__item') classPrefix: string
        $refs: { submenu: any, type: any };

        @inject() menu: typeof Menu.prototype;
        @inject('defaultItemType') defaultItemType: string;
        @inject('menuEvents') menuEvents: Vue;
        @inject() tags: IMenuTags;
        @inject('submenuType') submenuType: IMenuSubmenuType
        @inject('submenuTrigger') submenuTrigger: IMenuSubmenuTrigger
        @inject() registerItem: (item) => any;
        @prop(Array) links: PyroMenuLink[];

        @prop(String) type: string;
        @prop(String) title: string;
        @prop(String) target: string;
        @prop(String) url: string;
        @prop([ String, Object ], null) link: any;
        @prop(String) href: string;
        @prop(String) slug: string;
        @prop(String) icon: string;
        @prop(String) dataToggle: string;
        @prop(String) dataTarget: string;
        @prop(Boolean) selected: boolean;
        @prop(Boolean) active: boolean;
        @prop(Boolean) expanded: boolean;


        isHovering = false;
        isMounted  = false;

        mouseOutDelay: number = 1500;
        hoverTimer            = null
        node: MenuItemNode

        menuItemType: string = null

        state: IMenuItemState = {
            collapsed: false,
            selected : false,
            focused  : false,
            hidden   : false
        }

        get classes() {
            return {
                [ `${this.classPrefix}` ]           : true,
                [ `${this.classPrefix}--open` ]     : !this.state.collapsed,
                [ `${this.classPrefix}--collapsed` ]: this.state.collapsed,
                [ `${this.classPrefix}--focused` ]  : this.state.focused,
                [ `${this.classPrefix}--selected` ] : this.state.selected,
                [ `${this.classPrefix}--hover` ]    : this.isHovering
            }
        }

        get $submenu() {return this.$refs.submenu.$el ? $(this.$refs.submenu.$el) : $(this.$refs.submenu);}

        get computedHref() { return this.url || this.href || (typeof this.link === 'string' ? this.link : 'javascript:void(0);')}

        get style(): Styles {return {}; }

        get submenuStyle(): Styles {return {}; }

        protected setupLogger() {return { suffix: ':' + (this.fullKey || this.key).replace(/\./g, ':'), prepend: [ this.title ] } }

        protected created() {
            this.node = this.menu.node.createNode()
            this.registerItem(this);
            const parent = this.getFirstMatchingParent<typeof MenuItem.prototype>(c => !!c.node);
            if ( parent ) {
                parent.node.addChild(this.node)
            }
            this.node.observe(change => this.update())
            this.menuItemType = this.defaultItemType
        }

        update() {
            Object.entries(this.node.getState()).forEach(([ k, v ]) => this.$set(this.state, k, v))
        }

        protected mounted() {
            this.isMounted = true;
            this.$nextTick(() => {
                this.$watch('selected', v => v === true ? this.select() : this.deselect(), { immediate: true })
                this.$watch('active', v => v === true ? this.activate() : this.deactivate(), { immediate: true })
                this.$watch('expanded', v => v === true ? this.expand() : this.collapse(), { immediate: true })
                if ( this.parentItem && this.parentItem.popper ) {
                    this.popperHorizontalPlacement = this.parentItem.popperHorizontalPlacement
                    this.popperVerticalPlacement   = this.parentItem.popperVerticalPlacement
                }
            })
        }

        protected handleClick(event: MouseEvent) {
            this.emit('click', this, event);
            if ( this.isClickTrigger ) {
                if ( this.dataToggle === 'modal' ) {
                    event.preventDefault();
                } else if ( this.hasChildren ) {
                    event.preventDefault();
                    // event.stopPropagation();
                    this.toggle(event);
                }
            }
        }

        protected handleMouseOver(event) {
            if ( !this.isHovering ) {
                this.isHovering = true;
                // this.emit('mouseover', this, event);
            }
        }

        protected handleMouseOut(event: MouseEvent) {
            if ( this.isHovering ) {
                this.isHovering = false;
                // this.emit('mouseout', this, event);
            }
        }

        activate() { this.node.select()}

        deactivate() { this.node.deselect();}

        select() { this.node.focus();}

        deselect() {this.node.blur(); }

        expand() {this.node.expand() }

        collapse() {this.node.collapse() }

        toggle(event = null) { this.node.collapsed() ? this.expand() : this.collapse(); }

        @watch('state.collapsed')
        watchCollapsed(collapsed) {
            if ( collapsed ) {
                this.node.deselect();
                if ( this.isSlide ) {
                } else if ( this.isDropdown ) {
                    this.destroyPopper();
                }
                this.emit('collapse', this);
            } else {
                this.node.select();
                if ( this.isSlide ) {
                } else if ( this.isDropdown ) {
                    this.createPopper();
                }
                this.emit('open', this);
            }
        }


        parents(includeSelf = false): MenuItemArray {
            let parents = this.getAllMatchingParents(c => c.$options.name === 'MenuItem', c => c.$options.name === 'Menu') as any[]
            return new MenuItemArray(...parents);
        }

        emit(event: string, ...args: any[]) {
            this.$emit(event, ...args);
            this.menuEvents.$emit(event, ...args);
        }

        get hasLinks(): boolean { return Array.isArray(this.links) && this.links.length > 0; }

        get hasChildren() {
            return this.hasLinks
                || this.menu.getItems().filter(item => item.parentItem === this as any).length > 0
                || (Array.isArray(this.$slots.default) && this.$slots.default.length > 0)
        }

        get isHoverTrigger() {return this.submenuTrigger === 'hover';}

        get isClickTrigger() {return this.submenuTrigger === 'click';}

        get isDropdown() { return this.submenuType === 'dropdown' && this.hasChildren; }

        get isSlide() { return this.submenuType === 'slide' && this.hasChildren; }

        get isRoot() {return this.parentItem === null}

        get depth() { return this.node.getDepth() }

        // get computedStyle() {return { zIndex: this.baseZIndex + this.depth + (this.hasChildren ? this.depth : 0) } }

        get parentItem(): typeof MenuItem.prototype | null { return this.getFirstMatchingParent(c => c.$options.name === 'MenuItem') }

        // get fullKey() { return this.parents(true).map(parent => parent.key).reverse().join('.'); }
        get fullKey() { return this.node.getAncestorsAndSelf().map(node => node.getIndex()).map(String).join('.') }

        get key() { return this.node.getIndex.toString() }


        clickaway(event) {
            if ( this.isDropdown && this.isClickTrigger && this.node.expanded() ) {
                this.$log('clickaway', {
                    event
                })
                this.collapse()
            }
        }

        popper: Popper                              = null;
        popperOptions: Popper.PopperOptions         = {
            modifiers: { offset: { offset: 0 } }
        }
        popperHorizontalPlacement: 'left' | 'right' = 'right';
        popperVerticalPlacement: 'start' | 'end'    = 'start'

        popperPlacement(): Popper.Placement {
            let horizontal: 'left' | 'right' = this.popperHorizontalPlacement;
            let vertical: 'start' | 'end'    = this.popperVerticalPlacement;
            const { x, y }                   = this.$el.getBoundingClientRect() as DOMRect;
            let verticalFraction             = (window.innerHeight / 4);
            let horizontalFraction           = (window.innerWidth / 4);
            let points                       = {
                horizontal: { a: horizontalFraction, b: horizontalFraction * 3 },
                vertical  : { a: verticalFraction, b: verticalFraction * 3 }
            }

            if ( y < points.vertical.a ) {
                vertical = 'start'
            } else if ( y > points.vertical.b ) {
                vertical = 'end'
            }
            if ( x < points.horizontal.a ) {
                horizontal = 'right'
            } else if ( x > points.horizontal.b ) {
                horizontal = 'left'
            }

            this.popperHorizontalPlacement = horizontal;
            this.popperVerticalPlacement   = vertical;
            return `${horizontal}-${vertical}` as any
        }

        destroyPopper() {
            if ( this.popper ) {
                this.popper.destroy();
            }
            return this;
        }

        createPopper() {
            const isChild                     = this.isRoot === false && this.parentItem && this.parentItem.popper instanceof Popper;
            let options: Popper.PopperOptions = merge({ modifiers: {} }, this.popperOptions);
            if ( isChild ) {
                options.placement = this.popperPlacement();
            }
            this.popper = new Popper(this.$el, this.$refs.submenu.$el, {
                eventsEnabled: true,
                ...options,
                onCreate(data: Popper.Data): void {}, //{ this.$log('popper', me.$options.name, 'onCreate', data); },
                onUpdate(data: Popper.Data): void {} //{ this.$log('popper update', data); }
            });
            this.$log('createPopper', this.fullKey, { el: this.$el, submenu: this.$refs.submenu, popper: this.popper });
            return this.popper;
        }

    }
</script>