import Vue from 'vue';
import { prefixAndRegisterComponents } from '@pyro/platform';


export class AdminThemeVuePlugin {

    private static __installed = false

    public static install(_Vue: typeof Vue, opts: any = {}) {
        if ( this.__installed ) {
            return;
        }
        this.__installed = true

        prefixAndRegisterComponents(_Vue, {
        })

    }
}