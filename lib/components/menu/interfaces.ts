import { INode } from '@radic/tree';
import { CreateElement, VNode, VNodeData } from 'vue';


export interface EventEmitter2Options {
    /**
     * @default false
     * @description set this to `true` to use wildcards.
     */
    wildcard?: boolean,
    /**
     * @default '.'
     * @description the delimiter used to segment namespaces.
     */
    delimiter?: string,
    /**
     * @default true
     * @description set this to `true` if you want to emit the newListener events.
     */
    newListener?: boolean,
    /**
     * @default 10
     * @description the maximum amount of listeners that can be assigned to an event.
     */
    maxListeners?: number
    /**
     * @default false
     * @description show event name in memory leak message when more than maximum amount of listeners is assigned, default false
     */
    verboseMemoryLeak?: boolean;
}

export interface MenuConfigEvents extends EventEmitter2Options {
    itemPrefix?: string
}

export interface MenuConfig {
    events?: MenuConfigEvents
}

export interface MenuItemState {
    expanded: boolean
    hidden: boolean
    focused: boolean
    selected: boolean
    hovered: boolean
    active: boolean
    slug?:string
}


export type MenuItemNodeEventName = MenuItemNodeClickEventName | MenuItemNodeStateEventName
export type MenuItemNodeClickEventName = 'item:click' | 'item:touch'
export type MenuItemNodeStateEventName =
    'item:focused'
    | 'item:focus'
    | 'item:blur'
    | 'item:active'
    | 'item:activate'
    | 'item:deactivate'
    | 'item:hidden'
    | 'item:show'
    | 'item:hide'
    | 'item:expanded'
    | 'item:expand'
    | 'item:collapse'
    | 'item:selected'
    | 'item:select'
    | 'item:deselect'
    | 'item:hovered'
    | 'item:hover'
    | 'item:unhover'

export type MenuItemNodeEvent = MenuItemNodeStateEvent<any> | MenuItemNodeClickEvent;

export interface MenuItemNodeClickEvent {
    name: string
    node: MenuItemNode
    item: MenuItem
    event: MouseEvent
    state: MenuItemState
}

export interface MenuItemNodeStateEvent<K extends keyof MenuItemState> {
    name: string
    key: K
    value: MenuItemState[K]
    state: MenuItemState
    args: any[]
    node: MenuItemNode
    item: MenuItem
    menu: MenuNode
}



export interface IMenuNode {
    node: INode
}

export function isMenuNode(value): value is IMenuNode {
    return value && value.node;
}

export type RenderMenuIcon = (h: CreateElement, icon: string, data?: VNodeData) => VNode

import Popper           from 'popper.js';
import { MenuItemNode } from './MenuItemNode';
import { MenuItem }     from './MenuItem';
import { MenuNode }     from './MenuNode';

export type Grow =
    | 'auto'
    | 'up'
    | 'up-then-left'
    | 'up-then-right'
    | 'down'
    | 'down-then-left'
    | 'down-then-right'
    | 'left'
    | 'left-then-up'
    | 'left-then-down'
    | 'right'
    | 'right-then-up'
    | 'right-then-down'

export type GrowPosition = Popper.Position | 'auto'
export type GrowPlacement = Popper.Placement

export type Grows = Record<Grow, [ GrowPosition, GrowPlacement ]>
