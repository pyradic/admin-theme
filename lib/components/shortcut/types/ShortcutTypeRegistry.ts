import { injectable }            from 'inversify';
import { VueConstructor }        from 'vue';
import { AsyncComponentPromise } from 'vue/types/options';

export interface IShortcutType<VC extends VueConstructor> {
    name: string
    Component: VC | (()=>any)
    tag?: string
}

@injectable()
export class ShortcutTypeRegistry {
    items: Record<IShortcutType<any>['name'], IShortcutType<any>> = {};

    register<VC extends VueConstructor>(type: IShortcutType<VC>) {
        this.items[ type.name ] = type;
        return this;
    }

    get<VC extends VueConstructor>(name): IShortcutType<VC> {return this.items[ name ]; }

    isRegistered(name) {return name in this.items; }


}