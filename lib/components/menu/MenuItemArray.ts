import { Collection } from '@pyro/platform';
import MenuItem from './MenuItem.vue';
import { MenuItemNodeArray } from './tree';

export class MenuItemArray extends Collection<typeof MenuItem.prototype> {

    filterNode(callbackFn: (value: typeof MenuItem.prototype, index: number) => boolean) { return this.filter((item, index) => callbackFn(item.node, index))}

    eachNode(callbackfn: (value: typeof MenuItem.prototype, index: number) => void) { return this.each((item, index) => callbackfn(item.node, index))}

    selected() {return this.filterNode(item => item.selected()) }

    select() {return this.eachNode(item => item.select()) }

    deselect() {return this.eachNode(item => item.deselect()) }

    focused() {return this.filterNode(item => item.focused()) }

    focus() {return this.eachNode(item => item.focus()) }

    blur() {return this.eachNode(item => item.blur()) }

    depth(depth: number) {return this.filterNode(item => item.getDepth() === depth)}

    root(matchType = false) {return this.filterNode(item => item.isRoot(matchType))}


    collapsed() {return this.filterNode(item => item.collapsed()) }

    expanded() {return this.filterNode(item => item.expanded()) }

    toggle() {return this.eachNode(item => item.toggle()) }

    expand() {return this.eachNode(item => item.expand()) }

    collapse() {return this.eachNode(item => item.collapse()) }


    without(item: any[]) {return this.filter(i => ! item.includes(i)) }

    only(item: any[]) {return this.filter(i => item.includes(i)) }

    children(parent: typeof MenuItem.prototype) { return this.filter(i => i.parentItem === parent)}

    nodes() { return new MenuItemNodeArray(...this.map(i => i.node)) }
}
