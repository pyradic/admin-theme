import Vue from 'vue';
import { Collection } from '@pyro/platform';
import { injectable } from 'inversify';


export interface MenuType {
    name: string
    component: typeof Vue
}

@injectable()
export class MenuTypeRegistry {
    public items: Collection<MenuType> = new Collection<MenuType>();

    register(type: MenuType) {
        if ( this.items.where('name', type.name).isNotEmpty() ) {
            this.items = this.items.whereNotIn('name', [ type.name ])
        }
        this.items.push(type)
    }

    find(name: string): MenuType | undefined {
        return this.items.findBy('name', name)
    }

    isRegistered(type: string | MenuType): boolean {
        if ( ! type ) {
            return false
        }
        return this.find(this.toTypeName(type)) !== undefined
    }

    unregister(type: string | MenuType): boolean {
        let length = this.items.length
        if ( this.isRegistered(type) ) {
            this.items = this.items.whereNotIn('name', [ this.toTypeName(type) ])
        }
        return length - this.items.length > 0
    }

    protected toTypeName(type: string | MenuType): string {
        if ( typeof type === 'string' ) {
            return type
        }
        return type.name;
    }

    public getNames():string[] {
        return Object.keys(this.items).map(key => this.items[key].name)
    }
}
