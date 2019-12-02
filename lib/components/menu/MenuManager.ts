import {injectable} from 'inversify'
import { Menu } from './Menu';
import { SyncHook } from 'tapable';
import { RenderMenuIcon } from './interfaces';
import { app } from '@pyro/platform';

@injectable()
export class MenuManager {
    public readonly hooks = {
        register: new SyncHook<Menu>(['menu'])
    }
    menus:Record<string,Menu>={}

    register(menu:Menu){
        this.hooks.register.call(menu)
        this.menus[menu.slug] = menu
    }

    @app().inject('menu.icon.render')
    renderMenuIcon:RenderMenuIcon

    // get renderMenuIcon():RenderMenuIcon{return app().get<RenderMenuIcon>('menu.icon.render');    }
}