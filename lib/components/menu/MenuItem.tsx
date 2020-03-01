import { component, copy, inject, inject$, prop, slot, TsxComponent, when } from '@pyro/platform';
import 'vue-tsx-support/enable-check';
import classNames                                                           from 'classnames';
import { Menu }                                                             from './Menu';
import { MenuItemNode }                                                     from './MenuItemNode';
import { grows, mapNodeStateObservableToTarget }                            from './utils';
import { RenderMenuIcon }                                                   from './interfaces';

import { mixin as clickaway }    from 'vue-clickaway';
import Popper, { PopperOptions } from 'popper.js';
import { MenuSubmenu }           from './MenuSubmenu';
import { MenuItemType }          from './MenuItemType';
import vue,{ VNodeData }             from 'vue';

export interface VuePopperProps {
    'disabled'?: boolean // 	false
    'delay-on-mouse-over'?: number // 	10	delay in ms before showing popper during a mouse over
    'delay-on-mouse-out'?: number // 	10	delay in ms before hiding popper during a mouse out
    'append-to-body'?: boolean // 	false
    'visible-arrow'?: boolean // 	true
    'force-show'?: boolean // 	false
    'trigger'?: string // 	hover	optional value:
    'content'?: string // 	null
    'enter-active-class'?: string // 	null
    'leave-active-class'?: string // 	null
    'boundaries-selector'?: string // 	null
    'transition'?: string // 	empty
    'options'?: PopperOptions // 	{ placement: 'bottom', gpuacceleration: false }	popper.js options
    'data-value'?: any // 	null	data of popper
    'stop-propagation'?: boolean // 	false
    'prevent-default'?: boolean // 	false
}

@component({
    provide() {
        return {
            parent: this,
        };
    },
    components: {
        // 'popper': Popper
    },
    mixins    : [ clickaway ],
    block     : 'menu-item',
})
export class MenuItem extends TsxComponent<{ tag: string, slug?: string }> {
    $refs: {
        root: HTMLElement,
        content: HTMLAnchorElement,
        type: MenuItemType,
        icon: HTMLSpanElement, title: HTMLSpanElement, spacing: HTMLSpanElement, arrow: HTMLSpanElement,
        submenu: MenuSubmenu
    };
    @inject$('menus.icon.renderer') renderMenuIcon;
    @inject() menu: Menu;
    @inject() parent: Menu | MenuItem;

    @prop.classPrefix('menu-item') classPrefix: string;
    @prop.string('div') tag;
    @prop.string() title: string;
    @prop.string() slug: string;
    @prop.string() url: string;
    @prop.string() icon: string;
    @prop.string('default') type: string;
    @prop.boolean() active: boolean;
    @prop.boolean() noSubmenuIcons: boolean;
    @prop.object() attributes: any;

    // @styles<MenuItem>(({ util, theme, ctx }) => ({
    //     sdf: {},
    // })) styles: StylesProp;

    node: MenuItemNode;
    popper: Popper;

    isHidden: boolean   = false;
    isHovered: boolean  = false;
    isExpanded: boolean = false;
    isSelected: boolean = false;
    isFocused: boolean  = false;
    isActive: boolean   = false;

    popperOptions: PopperOptions = {
        placement      : 'bottom',
        modifiers      : {
            offset: {
                offset : 0,
                enabled: true,
            },
        },
        gpuAcceleration: false,
    };

    get isDropdown(): boolean {return this.menu.dropdown;}

    get isSlide(): boolean {return this.menu.slide;}

    get isHorizontal(): boolean {return this.menu.horizontal;}

    get hasChildren() {return this.$slots.submenu != null || this.node.hasChildren();}

    get classes() {
        return classNames({
            // [ styles.class('item') ]             : true,
            // [ styles.class('item_is-hidden') ]   : this.isHidden,
            // [ styles.class('item_is-hovered') ]  : this.isHovered,
            // [ styles.class('item_is-expanded') ] : this.isExpanded,
            // [ styles.class('item_is-selected') ] : this.isSelected,
            // [ styles.class('item_is-focused') ]  : this.isFocused,
            // [ styles.class('item_is-active') ]   : this.isActive,
            // [ styles.class('item_has-children') ]: this.hasChildren,

            [ this.classPrefix ]                                         : true,
            [ `${this.classPrefix}--${this.type.replace(/\./gmi, '_')}` ]: true,
            'is-hidden'                                                  : this.isHidden,
            'is-hovered'                                                 : this.isHovered,
            'is-expanded'                                                : this.isExpanded,
            'is-selected'                                                : this.isSelected,
            'is-focused'                                                 : this.isFocused,
            'is-active'                                                  : this.isActive,
            'has-children'                                               : this.hasChildren,
        });
    }

    get href() {
        switch(true){//formatter:off
            case this.hasChildren: return 'javascript:void(0);';
            case this?.attributes?.href: return this.attributes.href
            case !!this.url: return this.url // case this.url != null: return this.url
            case !!this.$attrs.href: return this.$attrs.href
            default:
                return null;//formatter:on
        }
    }

    created() {
        this.node = this.menu.registerItem(this);
        mapNodeStateObservableToTarget(this.node, this, {
            hidden  : 'isHidden',
            focused : 'isFocused',
            expanded: 'isExpanded',
            hovered : 'isHovered',
            active  : 'isActive',
            selected: 'isSelected',
        });
        if ( this.active && this.hasChildren ) {
            this.node.expand();
        }
    }

    beforeMount() {
        this.$watch('active', value => value ? this.node.activate() : this.node.deactivate(), { immediate: true });
        this.$watch('isExpanded', value => value ? this.handleExpand() : this.handleCollapse());
    }

    handleClick(event: MouseEvent) {
        this.$emit('click', { event, me: this });
        // event.preventDefault();
        // event.stopPropagation();
        if(this.$attrs['data-toggle'] === 'modal'){
            let $target=$(this.$attrs['data-target'])
            this.$log('click for modal', $target)
            $target.modal('show');
        }
        if ( this.hasChildren ) {
            event.preventDefault();
            this.node.toggle();
        }
    }

    async openModal(href){
        let response = await this.$http.get(href);
        const {staticRenderFns,render} = vue.compile(response.data);
        const el = new vue({staticRenderFns, render})

        $().modal('show')
        this.showModal =true;
        this.$nextTick(() => {
            el.$mount(this.$refs['modalContent']);
        })
    }

    handleMouseOver(event: MouseEvent) { !this.node.hovered() && this.node.hover(); }

    handleMouseLeave(event: MouseEvent) {this.node.hovered() && this.node.unhover(); }

    handleClickAway(event) {
        if ( this.isDropdown && this.node.expanded() ) {
            this.$log('clickaway', { event });
            this.node.collapse();
        }
    }

    handleExpand() {
        if ( this.usePopper ) {
            this.createPopper();
        }
    }

    handleCollapse() {
        if ( this.usePopper ) {
            this.destroyPopper();
        }
    }

    get usePopper() {
        return this.isDropdown;
    }

    getParentPoppers() {
        let parent            = this.parent;
        let poppers: Popper[] = [];
        while ( parent ) {
            if ( parent && parent[ 'popper' ] !== undefined ) {
                poppers.push(parent[ 'popper' ]);
            }
            parent = parent[ 'popper' ];
        }
        return poppers;
    }

    popperPlacement(): Popper.Placement {
        let horizontal: 'left' | 'right' = 'right';
        let vertical: 'start' | 'end'    = 'start';
        const { x, y }                   = this.$el.getBoundingClientRect() as DOMRect;
        let verticalFraction             = (window.innerHeight / 4);
        let horizontalFraction           = (window.innerWidth / 4);
        let points                       = {
            horizontal: { a: horizontalFraction, b: horizontalFraction * 3 },
            vertical  : { a: verticalFraction, b: verticalFraction * 3 },
        };

        if ( y < points.vertical.a ) {
            vertical = 'start';
        } else if ( y > points.vertical.b ) {
            vertical = 'end';
        }
        if ( x < points.horizontal.a ) {
            horizontal = 'right';
        } else if ( x > points.horizontal.b ) {
            horizontal = 'left';
        }

        return `${horizontal}-${vertical}` as any;
    }


    createPopper() {
        let options                 = copy(this.popperOptions);
        let grow                    = this.menu.grow;
        let [ position, placement ] = grows[ grow ];

        if ( this.getParentPoppers().length === 0 ) {
            options.placement = position;
        } else {
            if ( placement === 'auto' ) {
                placement = this.popperPlacement();
            }
            options.placement = placement;
        }
        this.popper           = new Popper(this.$refs.type.$refs.component.$el, this.$refs.submenu.$el, options);
        this.node.data.popper = this.popper;
    }

    destroyPopper() {
        if ( this.popper ) {
            this.popper.destroy();
        }
    }

    render(h) {
        const { classes, tag: Tag, attributes, usePopper, popperOptions } = this;
        const renderMenuIcon                                              = this.$py.get<RenderMenuIcon>('menus.icon.renderer');
        const contentExtras                                               = { attrs: { ...attributes } };
        const content                                                     = (
            <a ref="content"
               {...contentExtras}
               slot={usePopper ? 'reference' : null}
               class={this.E('content')}
               href={this.href}
               onclick={this.handleClick as any}
            >
                <span class={this.E('icon')} ref="icon">
                    {slot(this, 'icon', when(this.icon, this.renderMenuIcon(h, this.icon)))}
                </span>
                <span class={this.E('title')} ref="title">
                    {slot(this, 'default', this.title)}
                </span>
                <span class={this.E('spacing')} ref="spacing"/>
                <span class={this.E('arrow')} ref="arrow">
                    {slot(this, 'arrow', <i/>)}
                </span>
            </a>
        );
        let a: VNodeData;

        // @ts-ignore
        const cont    = (
            <py-menu-item-type
                ref="type"
                menu-item={this}
                attributes={attributes}
                type={this.type}
                slot={usePopper ? 'reference' : null}
                class={this.E('content')}
                {...{
                    nativeOn: {
                        mouseover : this.handleMouseOver,
                        mouseleave: this.handleMouseLeave,
                    },
                }}
            />
        );
        const submenu = (
            <py-expand-transition enabled={this.menu.slide} show={this.isExpanded}>
                <py-menu-submenu ref="submenu" class={classNames({})} v-show={this.isExpanded} no-icons={this.noSubmenuIcons}>
                    {this.$slots.submenu}
                </py-menu-submenu>
            </py-expand-transition>
        );

        const modal = this.showModal ? (
                <py-dialog before-close={this.onBeforeClose} visible append-to-body close-on-click-modal close-on-press-escape destroy-on-close>
                    <div ref="modalContent" />
                </py-dialog>
        ) : null;

        return (
            <Tag ref="root"
                 class={classes}
                 onMouseOver={this.handleMouseOver}
                 onMouseLeave={this.handleMouseLeave}
                 data-slug={this.slug}
                 vOnClickaway={this.handleClickAway}
            >
                {cont}
                {when(this.$slots.submenu, submenu)}
                {modal}
            </Tag>
        );
    }
    modalContent=null
    showModal=false
    onBeforeClose(hide) {
        hide();
        this.showModal = false;
    }
}