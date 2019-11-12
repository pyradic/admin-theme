import { Config, ServiceProvider } from '@pyro/platform';
import { AdminThemeVuePlugin } from './AdminThemeVuePlugin';
import { styleVars } from './styling/export';


export class AdminThemeServiceProvider extends ServiceProvider {
    providers = []

    public register() {
        this.app.extendRoot({
            data() {
                return {
                    layout: null
                }
            },
            methods: {
                setLayout(layout) {this.layout = layout; },
                getLayout() {return this.layout },
                hasLayout() {return this.layout !== null}
            }
        })
        this.vuePlugin(AdminThemeVuePlugin);
    }

    public boot() {
        if ( this.app.isBound('styling') ) {
            let styling = this.app.get<Config<Record<string, string>>>('styling')
            styling.merge(styleVars.raw())
        }
    }
}