import { injectable } from 'inversify';
import { Menu }       from './Menu';
import { SyncHook }   from 'tapable';
import { app }        from '@pyro/platform';

@injectable()
export class MenuManager {
    public readonly hooks       = {
        register: new SyncHook<Menu>([ 'menu' ]),
    };
    menus: Record<string, Menu> = {};
    types: Record<string, any> = {};

    register(menu: Menu) {
        this.hooks.register.call(menu);
        this.menus[ menu.slug ] = menu;
    }

    get(slug: string) {return this.menus[ slug ]; }

    has(slug: string) {return slug in this.menus; }

    @app.inject('menus.icon.renderer')
    renderMenuIcon;

    setupDefaultMenuBehaviour(menu: Menu) {
        const { node } = menu;
        node.on('item:expand', (item) => {
            console.log('demo', 'item:expand', item);
            if ( item.isRoot(true) ) {
                node.getChildren().without([ item ]).collapse();
            }
        });
        node.on('item:collapse', (item) => {
            console.log('demo', 'item:collapse', item);
            item.getAllDescendants().collapse();
        });
        menu.$watch('collapsed', collapsed => {
            if(collapsed){
                node.getAllDescendants().expanded().collapse();
            }
        })
    }

    registerType(slug: string, component:string) {
        this.types[slug]=component
    }

    hasType(slug: string) {return slug in this.types}

    getType(slug: string) {return this.types[slug]}

    // get renderMenuIcon():RenderMenuIcon{return app.get<RenderMenuIcon>('menu.icon.render');    }
}