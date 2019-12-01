import { MenuNode } from './MenuNode';
import { MenuItemNode } from './MenuItemNode';
import { NodeArray } from '@radic/tree';
import { MenuItemState } from './interfaces';


export class MenuItemNodeArray extends NodeArray<MenuItemNode> {
    _menu: MenuNode;

    menu(): MenuNode {return this._menu;}

    findBySlug(slug: string) {return this.find(item => item.slug() === slug);}

    call<K extends keyof MenuItemNode>(name: K, type: 'each' | 'filter' | 'map' = 'each', ...params: any[]) {return this[ type ](item => item[ name ](...params));}

    filterCall<K extends keyof MenuItemNode>(name: K) {return this.call(name, 'filter'); } // filterCall<K extends keyof MenuItemNode>(name: K) {return this.filter(item => item[ name ]());}

    filterState<K extends keyof MenuItemState>(key: K) {return this.filter(item => item.state(key));}

    set<K extends keyof MenuItemState>(key: K, value: MenuItemState[K], fire?: string): this {return this.each(item => item.set(key, value, fire)); }


    focused() {return this.filter(item => item.focused()); }

    focus() {return this.each(item => item.focus()); }

    blur() {return this.each(item => item.blur()); }

    setFocused(value: boolean) {return this.filter(item => item.setFocused(value)); }


    active() {return this.filter(item => item.active()); }

    activate() {return this.each(item => item.activate()); }

    deactivate() {return this.each(item => item.deactivate()); }

    setActive(value: boolean) {return this.filter(item => item.setActive(value)); }


    selected() {return this.filter(item => item.selected()); }

    select() {return this.each(item => item.select()); }

    deselect() {return this.each(item => item.deselect()); }

    setSelected(value: boolean) {return this.filter(item => item.setSelected(value)); }


    expanded() {return this.filter(item => item.expanded()); }

    collapsed() {return this.filter(item => item.collapsed()); }

    expand() {return this.each(item => item.expand()); }

    collapse() {return this.each(item => item.collapse()); }

    toggle() {return this.each(item => item.toggle()); }

    setExpanded(value: boolean) {return this.filter(item => item.setExpanded(value)); }


    show() {return this.filter(item => item.show()); }

    hide() {return this.each(item => item.hide()); }

    hidden() {return this.each(item => item.hidden()); }

    visible() {return this.each(item => item.visible()); }

    setHidden(value: boolean) {return this.filter(item => item.setHidden(value)); }


    hover() {return this.set('hovered', true);}

    unhover() {return this.set('hovered', false);}

    hovered() {return this.filter(item => item.state('hovered')); }

    unhovered() {return this.filter(item => !item.state('hovered')); }

    setHover(value: boolean) {return this.filter(item => item.setHover(value)); }


    children(parent: MenuItemNode) { return parent.getChildren();}

    nodes() { return new MenuItemNodeArray(...this); }
}
