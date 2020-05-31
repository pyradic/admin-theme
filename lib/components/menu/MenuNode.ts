import EventEmitter, { EventEmitter2, Listener }                                     from 'eventemitter2';
import { MenuItemNode }                                                              from './MenuItemNode';
import { MenuItemNodeArray }                                                         from './MenuItemNodeArray';
import { RootNode }                                                                  from '@radic/tree';
import { MenuConfig, MenuItemNodeClickEvent, MenuItemNodeStateEvent, MenuItemState } from './interfaces';
import { MenuItem }                                                                  from './MenuItem';

import { Menu }                     from './Menu';
import { bindEventEmitter, Config } from '@pyro/platform';

export interface MenuNode extends EventEmitter2 {
    constructor: typeof MenuNode

    //@formatter:off
    on(event: string | string[], listener: Listener): this;
    on(event: 'item:click', listener: (event:MenuItemNodeClickEvent) => any): this
    on(event: 'item:focused', listener: (event:MenuItemNodeStateEvent<'focused'>) => any): this
    on(event: 'item:focus', listener: (event:MenuItemNodeStateEvent<'focused'>) => any): this
    on(event: 'item:blur', listener: (event:MenuItemNodeStateEvent<'focused'>) => any): this
    on(event: 'item:active', listener: (event:MenuItemNodeStateEvent<'active'>) => any): this
    on(event: 'item:activate', listener: (event:MenuItemNodeStateEvent<'active'>) => any): this
    on(event: 'item:deactivate', listener: (event:MenuItemNodeStateEvent<'active'>) => any): this
    on(event: 'item:hidden', listener: (event:MenuItemNodeStateEvent<'hidden'>) => any): this
    on(event: 'item:show', listener: (event:MenuItemNodeStateEvent<'hidden'>) => any): this
    on(event: 'item:hide', listener: (event:MenuItemNodeStateEvent<'hidden'>) => any): this
    on(event: 'item:expanded', listener: (event:MenuItemNodeStateEvent<'expanded'>) => any): this
    on(event: 'item:expand', listener: (event:MenuItemNodeStateEvent<'expanded'>) => any): this
    on(event: 'item:collapse', listener: (event:MenuItemNodeStateEvent<'expanded'>) => any): this
    on(event: 'item:selected', listener: (event:MenuItemNodeStateEvent<'selected'>) => any): this
    on(event: 'item:select', listener: (event:MenuItemNodeStateEvent<'selected'>) => any): this
    on(event: 'item:deselect', listener: (event:MenuItemNodeStateEvent<'selected'>) => any): this
    on(event: 'item:hovered', listener: (event:MenuItemNodeStateEvent<'hovered'>) => any): this
    on(event: 'item:hover', listener: (event:MenuItemNodeStateEvent<'hovered'>) => any): this
    on(event: 'item:unhover', listener: (event: MenuItemNodeStateEvent<'hovered'>) => any): this
    //@formatter:on
}

export class MenuNode<C extends MenuItemNodeArray = MenuItemNodeArray> extends RootNode<C> {
    static defaultConfig: MenuConfig   = {
        events: {
            delimiter   : ':',
            maxListeners: Infinity,
            newListener : true,
            wildcard    : true,
            itemPrefix  : 'item',
        },
    };
    static defaultState: MenuItemState = {
        focused : false,
        hidden  : false,
        expanded: false,
        selected: false,
        hovered : false,
        active  : false,
    };

    data            = Config.proxied({});
    nodeClass       = MenuItemNode;
    collectionClass = MenuItemNodeArray;
    events: EventEmitter2;
    config: MenuConfig;


    constructor(public readonly menu: Menu, config: Partial<MenuConfig> = {}) {
        super();
        this.events = new (EventEmitter as any)({
            delimiter   : ':',
            maxListeners: Infinity,
            newListener : true,
            wildcard    : true,
        }) as any;
        bindEventEmitter(this.events as any, this);
        // [ 'emit', 'emitAsync', 'addListener', 'on', 'prependListener', 'once', 'prependOnceListener', 'many', 'prependMany', 'onAny', 'prependAny', 'offAny', 'removeListener', 'off', 'removeAllListeners', 'setMaxListeners', 'eventNames', 'listeners', 'listenersAny' ].forEach(name => { this[ name ] = this.events[ name ].bind(this.events); });
        this.configure(config);
    }

    emitItemState<K extends keyof MenuItemState>(event: string | string[], node: MenuItemNode, key: K, value: MenuItemState[K], state: MenuItemState, ...args: any[]) {
        const { itemPrefix, delimiter } = this.config.events;
        let names: string[]             = Array.isArray(event) ? event : [ event ];
        for ( const name of names ) {
            const eventName                                 = `${itemPrefix}${delimiter}${name}`;
            const itemStateEvent: MenuItemNodeStateEvent<K> = { name, key, value, state, args, node, item: node.item, menu: this };
            this.events.emit(eventName, itemStateEvent);
        }
    }

    emitItemClick(item: MenuItem, event: MouseEvent, state?: MenuItemState) {
        const name                                   = 'item:click';
        state                                        = state || item.node.getState();
        const itemClickEvent: MenuItemNodeClickEvent = { name, item, node: item.node, event, state };
        this.events.emit(name, itemClickEvent);
    }

    createMenuItemNode(menuItem: MenuItem) {
        const node = new this.nodeClass(menuItem, this);
        node.setCollectionClass(this.collectionClass);
        return node;
    }

    configure(config: Partial<MenuConfig>) {
        this.config = {
            ...this.constructor.defaultConfig,
            ...config,
            events: {
                ...this.constructor.defaultConfig.events,
                ...config.events,
            },
        };//merge({}, this.constructor.defaultConfig, config) as MenuConfig;
    }

    getDefaultState(): MenuItemState {
        return { ...this.constructor.defaultState } as any;
    }

    findByIndex(key: string) {
        let keys               = key.split('.').map(v => parseInt(v));
        let node: MenuItemNode = this as any;
        while ( keys.length > 0 ) {
            let currentKey = keys.shift();
            if ( !node.getChildren().hasItem(currentKey) ) {
                console.warn('could not get item ', currentKey, 'of node', node, 'children', node.getChildren());
                return node;
            }
            node = node.getChildren().item(currentKey);
        }
        return node;
    }

    findBySlug(slug: string) {
        return this.getAllDescendants().findBySlug(slug);
    }
}
