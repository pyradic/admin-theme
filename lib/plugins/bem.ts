import Vue                                 from 'vue';
import originNaming                        from '@bem/sdk.naming.presets/origin';
import { Stringify, stringifyWrapper }     from '@bem/sdk.naming.entity.stringify';
import { EntityName }                      from '@bem/sdk.entity-name';
import { Component, component, VuePlugin } from '@pyro/platform';

const log = require('debug')('plugins:bem:install');

export class Bem {
    current: any = {
        b: null,
        e: null,
    };

    constructor(protected stringify: Stringify) {}

    b(name) {
        this.current.b = name;
        this.current.e = null;
        return this.stringify({ block: this.current.b });
    }

    e(name, modifiers: string[] = []) {
        this.current.e = name;
        let classes    = modifiers.map(mod => this.stringify({ block: this.current.b, elem: this.current.e, mod }));
        classes.unshift(this.stringify({ block: this.current.b, elem: this.current.e }));
        return classes.join(' ');
    }

    m(names) {
        return names.map(mod => this.stringify({ block: this.current.b, elem: this.current.e, mod })).join(' ');
    }

    is(name, enabled: boolean = true) {
        return enabled ? 'is-' + name.replace(/^is-/gm, '') : null;
    }

    has(name, enabled: boolean = true) {
        return enabled ? 'has-' + name.replace(/^has-/gm, '') : null;
    }
}

@component()
export class BemMixin extends Component {
    classPrefix?: string;
    bem: Bem;

    B(name) {
        if ( this.classPrefix ) {
            name = this.classPrefix + '-' + name;
        }
        return this.bem.b(name);
    }

    E(name, modifiers: string[] = []) {
        return this.bem.e(name, modifiers);
    }

    M(names: string[] = []) {return this.bem.m(names); }

    S(name, enabled: boolean, type: 'is' | 'has' = 'is') {return this.bem[ type ](name, enabled); }
}

export interface BemMethods {
    bem: Bem;

    B(name): string

    E(name, modifiers?: string[]): string

    M(names?: string[]): string

    S(name, enabled: boolean, type?: 'is' | 'has'): string
}

export interface BEMPluginOptions {
    delimiters?: {
        ns?: string
        el?: string
        mod?: string
        modVal?: string
    }
}

export { BEMPlugin };
export default class BEMPlugin extends VuePlugin {
    static __installed: boolean = false;
    static stringify: Stringify;

    static install(_Vue: typeof Vue, opts: BEMPluginOptions = {}) {
        opts = {
            ...opts,
            delimiters: {
                ...opts.delimiters || {},
            },
        };
        log('install', { _Vue, opts });
        if ( this.__installed ) { return; }
        this.__installed = true;


        originNaming.delims.elem = opts.delimiters.el;
        originNaming.delims.mod  = { name: opts.delimiters.mod, val: opts.delimiters.modVal }; //{ name: '--', val: ':' };
        const _stringify         = stringifyWrapper(originNaming);
        const stringify          = (o: EntityName.IOptions) => {
            if ( opts.delimiters.ns ) {
                let ns  = opts.delimiters.ns.endsWith('-') ? opts.delimiters.ns : opts.delimiters.ns + '-';
                o.block = o.block.startsWith(ns) ? o.block : ns + o.block;
            }
            return _stringify(o);
        };

        _Vue.mixin(BemMixin.extend({
            created() {

                this.bem = new Bem(stringify);
                if ( this.$options.block ) {
                    this.bem.current.b = this.$options.block;
                }
            },
        }));
        const directiveFn = (el, binding, vnode, oldVnode) => {
            log('v-bem bind', { el, binding, vnode });
            if(binding.arg === undefined){
                return;
            }
            if ( ![ 'b', 'e', 'm', 'is', 'has' ].includes(binding.arg) ) {
                throw new Error('v-bem directive requires argument to be one of "b", "e", "m", "is" or "has"');
            }
            const bem: Bem = vnode.context.bem;
            if ( !bem ) {
                throw new Error('v-bem directive requires the vnode context (vue component instance) to have the "bem" instance');
            }
            let restArgs = Object.values(binding.modifiers);
            log('v-bem call', 'bem.', binding.arg, '(', binding.value, ',', ...restArgs.map(arg => arg.toString() + ','), ')', {
                bem,
                bem_current: bem.current
            });
            bem[ binding.arg ](binding.value, ...Object.values(binding.modifiers));
        };
        _Vue.directive('bem', {
            bind            : directiveFn,
            update          : directiveFn,
            componentUpdated: directiveFn,
        });

    }
}
