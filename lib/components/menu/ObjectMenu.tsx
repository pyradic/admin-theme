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
export default class ObjectMenu extends TsxComponent {
    @prop.array.required() items: StructureNavigtion[];
    @prop.object.required() options: MenuProps;
    @prop.number(2) maxDepth: number;
    @prop.string() active: string;
    @ref() menu: Menu;

    mounted() {
        this.$nextTick(() => {
            let lastActive = this.menu.node.getAllDescendants().active().last();
            if ( lastActive ) {
                lastActive.getAncestorsAndSelf().withoutRoot().activate().expand();
            }
        });
    }

    render(h) {
        this.$log('render', this?.options?.slug, { options: this.options, items: this.items });
        const { items, options, maxDepth } = this;
        let opt                            = { ...this.options };
        return h('py-menu', { ref: 'menu', props: this.options }, items.map(item => this.renderItem(h, item)));
    }

    renderItem(h: CreateElement, item: StructureNavigtion | MenusLinks, depth: number = 1) {
        const { title, active, attributes, children, icon, key, url, type } = item;

        const props             = { attributes, title, active, children, icon, slug: key, url, type };
        const attrs             = {};
        const childNodes: any[] = [ title ];

        Object.keys(attributes).forEach(key => {
            if ( key.startsWith(':') ) {
                props[ key.slice(1) ] = attributes[ key ];
            } else {
                attrs[ key ] = attributes[ key ];
            }
        });

        if ( depth < this.maxDepth && children && children.length > 1 ) {
            childNodes.push(h('template', { slot: 'submenu' }, children.map(child => this.renderItem(h, child as any, depth + 1))));
        }

        return h('py-menu-item', { props, attrs }, childNodes);

    }
}
