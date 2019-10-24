import { Node, RootNode } from '@radic/tree';
import { EventEmitter2 } from 'eventemitter2';
import { MenuItemNode } from './MenuItemNode';
import { MenuItemNodeArray } from './MenuItemNodeArray';
import { MenuConfig, MenuItemState } from './types';
import { merge } from 'lodash';

const log = require('debug')('components:menu:Menu');

export interface MenuNode extends EventEmitter2 {
    constructor: typeof MenuNode

}

export type MenuEventTypes = { open: 'sf', close: any }

export class MenuNode<C extends MenuItemNodeArray = MenuItemNodeArray> extends RootNode<C> {
    static defaultConfig: MenuConfig            = {
        open  : {
            closeSiblings: true,
        },
        events: {
            delimiter   : ':',
            maxListeners: Infinity,
            newListener : true,
            wildcard    : true,
            itemPrefix  : 'item',
        },
    }
    static defaultState: MenuItemState = {
        focused  : false,
        hidden   : false,
        collapsed: true,
        selected : false,
    }

    nodeClass       = MenuItemNode
    collectionClass = MenuItemNodeArray
    events: EventEmitter2
    config: MenuConfig


    constructor(config: Partial<MenuConfig> = {}) {
        super()
        this.events = new EventEmitter2({
            delimiter   : ':',
            maxListeners: Infinity,
            newListener : true,
            wildcard    : true,
        }) as any;
        [ 'emit', 'emitAsync', 'addListener', 'on', 'prependListener', 'once', 'prependOnceListener', 'many', 'prependMany', 'onAny', 'prependAny', 'offAny', 'removeListener', 'off', 'removeAllListeners', 'setMaxListeners', 'eventNames', 'listeners', 'listenersAny' ].forEach(name => {
            this[ name ] = this.events[ name ].bind(this.events)
        })
        this.configure(config)
        this.on('item:expand', (item: MenuItemNode) => {
            log('on item:expand', {closeSiblings:this.config.open.closeSiblings,item})
            if ( this.config.open.closeSiblings ) {
                item.getNeighbors().expanded().collapse()
            }
        })
    }

    configure(config: Partial<MenuConfig>) {
        this.config = merge({}, this.constructor.defaultConfig, config) as MenuConfig
    }

    getDefaultState(): MenuItemState {
        return { ...this.constructor.defaultState } as any
    }
}
