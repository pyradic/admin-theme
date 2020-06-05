import { injectable }                               from 'inversify';
import { Menu }                                     from './Menu';
import { SyncHook }                                 from 'tapable';
import { app }                                      from '@crvs/platform';
import { MenuItemNodeEvent, MenuItemNodeEventName } from './interfaces';

@injectable()
export class MenuManager {
    public readonly hooks       = {
        register: new SyncHook<Menu>([ 'menu' ]),
    };
    menus: Record<string, Menu> = {};
    types: Record<string, any>  = {};
    behaviours: Record<string,MenuBehaviourDefinition> = {};

    register(menu: Menu, setupBehaviour = true) {
        this.hooks.register.call(menu);
        this.menus[ menu.slug ] = menu;
        setupBehaviour && this.bindMenuBehaviour(menu, menu.behaviour);
    }

    get(slug: string) {return this.menus[ slug ]; }

    has(slug: string) {return slug in this.menus; }

    registerBehaviour(behaviour:MenuBehaviourDefinition){
        this.behaviours[behaviour.name] = behaviour
    }

    bindMenuBehaviour(menu: Menu, name:string ='default') {
        if(menu.currentBehaviourName){
            this.unbindMenuBehaviour(menu, menu.currentBehaviourName);
        }
        let behaviour = this.behaviours[ name ];
        Object.keys(behaviour.on).forEach(key => {
            console.log('bindMenuBehaviour', key, menu.node, behaviour.on)
            menu.node.on(key, (...args) =>{
                console.log(key, {args});
                behaviour.on[key](...args)
            })
        })
        menu.currentBehaviourName = name;

    }

    unbindMenuBehaviour(menu:Menu, name:string){
        let behaviour = this.behaviours[ name ];
        Object.keys(behaviour.on).forEach(key => {
            console.log('unbindMenuBehaviour', key, menu.node, behaviour.on)
            menu.node.off(key, (...args) =>{
                console.log(key, {args});
                behaviour.on[key](...args)
            })
        })
        menu.currentBehaviourName = null
    }

    defaultBehaviour:string = 'default';

    @app.inject('menus.icon.renderer')
    renderMenuIcon;


    registerType(slug: string, component: string) {
        this.types[ slug ] = component;
    }

    hasType(slug: string) {return slug in this.types;}

    getType(slug: string) {return this.types[ slug ];}

    // get renderMenuIcon():RenderMenuIcon{return app.get<RenderMenuIcon>('menu.icon.render');    }
}

export type MenuBehaviourDefinitionOn = Partial<Record<MenuItemNodeEventName, (event: MenuItemNodeEvent) => any>>

export interface MenuBehaviourDefinition {
    name:string
    on: MenuBehaviourDefinitionOn
}

export const defaultMenuBehaviourDefinition:MenuBehaviourDefinition =  {
    name: 'default',
    on: {
        'item:expand'  : event => {
            console.log('demo', 'item:expand', event.item);
            event.node.getParent().getAllDescendants().without([event.node].concat(event.node.getAllDescendants())).collapse()
        },
        'item:collapse': event => event.node.getAllDescendants().collapse()
    }
}