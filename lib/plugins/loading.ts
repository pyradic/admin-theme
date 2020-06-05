import { VuePlugin }                                 from '@crvs/platform';
import Vue                                           from 'vue';
import { ElLoadingComponent, LoadingServiceOptions } from 'element-ui/types/loading';
import { Loading }                                   from 'element-ui';

const log = require('debug')('plugins:loading:install');

export { LoadingPlugin };
export default class LoadingPlugin extends VuePlugin {
    static __installed: boolean = false;

    static install(_Vue: typeof Vue, opts?: any) {
        log('install', { _Vue, opts });
        if ( this.__installed ) { return; }
        this.__installed = true;
        _Vue.mixin({
            methods: {
                $loading(options: LoadingServiceOptions) {
                    return Loading.service(options);
                },
                async $loader<T>(callback: (loading: ElLoadingComponent) => Promise<T>, options: LoadingServiceOptions):Promise<T> {
                    const loading = Loading.service(options);
                    let result = await callback(loading);
                    this.$nextTick(() => loading.close())
                    return result;
                },
            },
        });
    }
}
