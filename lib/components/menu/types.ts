export type IMenuSubmenuType = 'dropdown' | 'slide';
export type IMenuSubmenuTrigger = 'click' | 'hover';

export interface IMenuTags {
    item: string
    itemLink: string
    itemIcon: string
    submenu: string
}

export interface PyroMenuLink {
    class: null | string
    entry_id: number
    id: number
    parent_id: null | number
    sort_order: number
    target: string
    title: string
    type: string
    url: string
    children: PyroMenuLink[]
}

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
    open?: {
        closeSiblings?: boolean
    }
    events?: MenuConfigEvents
}

export interface IMenuItemState {
    collapsed: boolean
    hidden: boolean
    focused: boolean
    selected: boolean
}
