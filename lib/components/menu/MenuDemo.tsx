import { component, Platform, prop, TsxComponent } from '@pyro/platform';
import { CreateElement } from 'vue';
import StructureNavigtion = Platform.StructureNavigtion;

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
    @prop.array.required() items: StructureNavigtion[]
    @prop.object.required() options: MenuProps
    @prop.number(2) maxDepth: number

    render(h) {
        this.$log('render', this?.options?.slug, { options: this.options, items: this.items })
        const { items, options, maxDepth } = this
        let opt                            = { ...this.options }
        return h('py-menu', { props: this.options }, items.map(item => this.renderItem(h, item)));
        // return (
        //     <py-menu {...this.options} horizontal={opt.horizontal} collapsed={opt.collapsed}>
        //         {items.map(item => this.renderItem(h, item))}
        //     </py-menu>
        // )
    }

    renderItem(h: CreateElement, item: StructureNavigtion, depth: number = 1) {
        const { title, active, attributes, children, icon, key, url } = item
        this.$log('renderItem:' + depth, title, key, item);
        let childNodes: any[] = [
            title
        ]
        if ( depth < this.maxDepth && children ) {
            childNodes.push(h('template', { slot: 'submenu' }, children.map(child => this.renderItem(h, child as any, depth + 1))))
        }
        return h('py-menu-item', {
            props: { attributes, title, active, children, icon, slug: key, url },
            attrs: { ...attributes }
        }, childNodes);

        // return (
        //     <py-menu-item
        //         {...attributes}
        //         slug={key}
        //         class={item.class}
        //         active={active}
        //         icon={icon}
        //         url={url}
        //     >
        //         {title}
        //         {depth < this.maxDepth && children ?
        //          <template slot="submenu">
        //              {children.map(child => this.renderItem(h,child as any, depth + 1))}
        //          </template> : null
        //         }
        //     </py-menu-item>
        // )
    }
}
//
// export function renderMenu(h, items: StructureNavigtion[], options: {
//     tag?: string;
//     collapsed?: boolean
//     horizontal?: boolean
//     inline?: boolean
//     dropdown?: boolean
//     slug?: string
//     theme?: string
// }, maxDepth = 2) {
//
//     console.log('renderMenu', options)
//     return (
//         <py-menu {...options} slug={options.slug} >
//             {items.map(item => renderItem(item))}
//         </py-menu>
//     )
//
//     function renderItem(item: StructureNavigtion, depth: number = 1) {
//         const { title, active, attributes, children, icon, key, url } = item
//         return (
//             <py-menu-item
//                 {...attributes}
//                 slug={key}
//                 class={item.class}
//                 active={active}
//                 icon={icon}
//                 url={url}
//             >
//                 {title}
//                 {depth < maxDepth && children ?
//                  <template slot="submenu">
//                      {children.map(child => renderItem(child as any, depth + 1))}
//                  </template> : null
//                 }
//             </py-menu-item>
//         )
//     }
// }