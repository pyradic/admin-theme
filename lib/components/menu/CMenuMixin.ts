import Vue from 'vue';
import { component, inject, prop } from '@/decorators';
import { CMenu } from './CMenu';
import { CMenuItemArray } from './CMenuItemArray';
import { CMenuItem } from './CMenuItem';
import { IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags, PyroMenuLink } from './types';
import { MenuItemNode } from './MenuItemNode';


const log = require('debug')('components:c-menu-item');

@component({
    name: 'CMenuItem'
})
export class CMenuMixin extends Vue {

    @inject() menu: CMenu;
    @inject('defaultItemType') defaultItemType: string;
    @inject('menuEvents') menuEvents: Vue;
    @inject() tags: IMenuTags;
    @inject('submenuType') submenuType: IMenuSubmenuType
    @inject('submenuTrigger') submenuTrigger: IMenuSubmenuTrigger
    @inject() registerItem: (item) => any;
    @prop(Array) links: PyroMenuLink[];

    $parent: CMenu | CMenuItem | any;
    node?: MenuItemNode
    zIndexModifier?: number

    parents(includeSelf = false): CMenuItemArray {
        let parents = this.getAllMatchingParents(c => c.$options.name === 'CMenuItem', c => c.$options.name === 'CMenu') as any[]
        return new CMenuItemArray(...parents);
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

    get parentItem(): CMenuItem | null { return this.getFirstMatchingParent(c => c.$options.name === 'CMenuItem') }

    // get fullKey() { return this.parents(true).map(parent => parent.key).reverse().join('.'); }
    get fullKey() {
        return this.node.getAncestorsAndSelf().map(node => node.getIndex()).map(String).join('.')
    }

    get key() {
        return this.node.getIndex.toString()
    }
}
