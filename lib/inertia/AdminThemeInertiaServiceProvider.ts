import { ServiceProvider } from '@pyro/platform';
import Vue                 from 'vue';
import {Inertia}                                             from '@inertiajs/inertia'
import {InertiaLink}                                         from '@inertiajs/inertia-vue'

export class AdminThemeInertiaServiceProvider extends ServiceProvider {
    public register(): any | Promise<any> {

        this.app.extendRoot({
            props: {
                // initialPage: {
                //     type: Object,
                //     required: true,
                //     default: _ => ({})n
                // },
                // resolveComponent: {
                //     type: Function,
                //     // required: true,
                //     default: name => ({
                //         name,
                //         render(createElement: CreateElement, ctx:RenderContext): VNode {
                //             return createElement('div', )
                //         }
                //     } as ComponentOptions)
                // },
                transformProps: {
                    type: Function,
                    default: props => props,
                },
            },
            data() {
                return {
                    component: null,
                    props: {},
                    key: null,
                }
            },
            created() {
                Inertia.init({
                    initialPage: window['inertiaPage'],
                    resolveComponent: name => Vue.options.components[name],
                    updatePage: (component, props, { preserveState }) => {
                        this.component = component
                        this.props = this.transformProps(props)
                        this.key = preserveState ? this.key : Date.now()
                    },

                })
            },
            render(h) {
                if (this.component) {
                    const child = h(this.component, {
                        key: this.key,
                        props: this.props,
                    })

                    if (this.component.layout) {
                        if (typeof this.component.layout === 'function') {
                            return this.component.layout(h, child)
                        }

                        return h(this.component.layout, [child])
                    }

                    return child
                }
            },
            install(Vue) {
                Object.defineProperty(Vue.prototype, '$inertia', { get: () => Inertia })
                Object.defineProperty(Vue.prototype, '$page', { get: () => this.props })
                Vue.mixin( {
                    created() {
                        if (!this.$options.remember) {
                            return
                        }

                        if (Array.isArray(this.$options.remember)) {
                            this.$options.remember = { data: this.$options.remember }
                        }

                        if (typeof this.$options.remember === 'string') {
                            this.$options.remember = { data: [this.$options.remember] }
                        }

                        if (typeof this.$options.remember.data === 'string') {
                            this.$options.remember = { data: [this.$options.remember.data] }
                        }

                        const stateKey = this.$options.remember.key instanceof Function
                                         ? this.$options.remember.key()
                                         : this.$options.remember.key

                        const restored = Inertia.restore(stateKey)

                        this.$options.remember.data.forEach(key => {
                            if (restored !== undefined && restored[key] !== undefined) {
                                this[key] = restored[key]
                            }

                            this.$watch(key, () => {
                                Inertia.remember(
                                    this.$options.remember.data.reduce((data, key) => ({ ...data, [key]: this[key] }), {}),
                                    stateKey
                                )
                            }, { immediate: true, deep: true })
                        })
                    },
                })
                Vue.component('InertiaLink', InertiaLink)
            },
        });
    }
}