import { component, Platform, prop, ref, streams, TsxComponent } from '@pyro/platform';
import { CreateElement }                                         from 'vue';
import { Menu }                                                  from './Menu';
import StructureNavigtion = Platform.StructureNavigtion;
import MenusLinks = streams.menus_links.MenusLinks;

export interface MenuProps {
    tag?: string;
    collapsed?: boolean
    horizontal?: boolean
    inline?: boolean
    dropdown?: boolean
    slug?: string
    theme?: string

}

@component()
export default class MenuDemo extends TsxComponent {
    @prop.array.required() items: StructureNavigtion[];
    @prop.object.required() options: MenuProps;
    @prop.number(5) maxDepth: number;
    @prop.string() active: string;
    @ref() menu: Menu;

    render(h) {
        this.$log('render', this?.options?.slug, { options: this.options, items: this.items });
        const { items, options, maxDepth } = this;
        let opt                            = { ...this.options };
        return h('py-menu', { ref: 'menu', props: this.options }, items.map(item => this.renderItem(h, item)));
    }

    renderItem(h: CreateElement, item: StructureNavigtion | MenusLinks, depth: number = 1) {
        const { title, active, attributes, children, icon, key, url, type } = item;
        // this.$log('renderItem:' + depth, title, key, item);
        let childNodes: any[]                                               = [
            title,
        ];
        if ( depth < this.maxDepth && children && children.length > 0 ) {
            childNodes.push(h('template', { slot: 'submenu' }, children.map(child => this.renderItem(h, child as any, depth + 1))));
        }
        return h('py-menu-item', {

            props: { attributes, title, active, children, icon, slug: key, url, type },
            attrs: {},
        }, childNodes);
    }
}
