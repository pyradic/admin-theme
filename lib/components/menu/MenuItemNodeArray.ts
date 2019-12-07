import { MenuNode } from './MenuNode';
import { MenuItemNode } from './MenuItemNode';
import { NodeArray } from '@radic/tree';
import { MenuItemState } from './interfaces';


export class MenuItemNodeArray extends NodeArray<MenuItemNode> {
    _menu: MenuNode;

    menu(): MenuNode {return this._menu;}

    findBySlug(slug: string) {return this.find(node => node.item.slug === slug);}

    call<K extends keyof MenuItemNode>(name: K, type: 'each' | 'filter' | 'map' = 'each', ...params: any[]) {return this[ type ](node => node[ name ](...params));}

    filterCall<K extends keyof MenuItemNode>(name: K) {return this.call(name, 'filter'); } // filterCall<K extends keyof MenuItemNode>(name: K) {return this.filter(node => node[ name ]());}

    filterState<K extends keyof MenuItemState>(key: K) {return this.filter(node => node.state(key));}

    set<K extends keyof MenuItemState>(key: K, value: MenuItemState[K], fire?: string): this {return this.each(node => node.set(key, value, fire)); }


    focused() {return this.filter(node => node.focused()); }

    focus() {return this.each(node => node.focus()); }

    blur() {return this.each(node => node.blur()); }

    setFocused(value: boolean) {return this.filter(node => node.setFocused(value)); }


    active() {return this.filter(node => node.active()); }

    activate() {return this.each(node => node.activate()); }

    deactivate() {return this.each(node => node.deactivate()); }

    setActive(value: boolean) {return this.filter(node => node.setActive(value)); }


    selected() {return this.filter(node => node.selected()); }

    select() {return this.each(node => node.select()); }

    deselect() {return this.each(node => node.deselect()); }

    setSelected(value: boolean) {return this.filter(node => node.setSelected(value)); }


    expanded() {return this.filter(node => node.expanded()); }

    collapsed() {return this.filter(node => node.collapsed()); }

    expand() {return this.each(node => node.expand()); }

    collapse() {return this.each(node => node.collapse()); }

    toggle() {return this.each(node => node.toggle()); }

    setExpanded(value: boolean) {return this.filter(node => node.setExpanded(value)); }


    show() {return this.filter(node => node.show()); }

    hide() {return this.each(node => node.hide()); }

    hidden() {return this.each(node => node.hidden()); }

    visible() {return this.each(node => node.visible()); }

    setHidden(value: boolean) {return this.filter(node => node.setHidden(value)); }


    hover() {return this.set('hovered', true);}

    unhover() {return this.set('hovered', false);}

    hovered() {return this.filter(node => node.state('hovered')); }

    unhovered() {return this.filter(node => !node.state('hovered')); }

    setHover(value: boolean) {return this.filter(node => node.setHover(value)); }


    children(parent: MenuItemNode) { return parent.getChildren();}

    nodes() { return new MenuItemNodeArray(...this); }
}
