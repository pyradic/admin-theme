import { injectable } from 'inversify'
import { Menu } from './Menu';
import { SyncHook } from 'tapable';
import { app } from '@pyro/platform';

@injectable()
export class MenuManager {
    public readonly hooks       = {
        register: new SyncHook<Menu>([ 'menu' ])
    }
    menus: Record<string, Menu> = {}

    register(menu: Menu) {
        this.hooks.register.call(menu)
        this.menus[ menu.slug ] = menu
    }

    @app.inject('menus.icon.renderer')
    renderMenuIcon

    setupDefaultMenuBehaviour(menu:Menu){
        const {node} = menu;
        node.on('item:expand',(item) => {
            console.log('demo','item:expand',item)
            if(item.isRoot(true)){
                node.getChildren().without([item]).collapse()
            }
        })
        node.on('item:collapse',(item) => {
            console.log('demo','item:collapse',item)
            item.getAllDescendants().collapse();
        });
    }


    // get renderMenuIcon():RenderMenuIcon{return app.get<RenderMenuIcon>('menu.icon.render');    }
}