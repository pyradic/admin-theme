<template>
    <component :is="shortcutComponent" v-bind="this.$props"></component>
</template>

<script lang="ts">
import { component, inject$, prop, Styles } from '@pyro/platform';
import Vue, { CreateElement }               from 'vue';
import { Dropdown }                         from 'element-ui';
import { ShortcutTypeRegistry }             from './types';

@component({
    components: {},
})
export default class Shortcut extends Vue {
    @prop.classPrefix('shortcut') classPrefix: string;
    @prop.string() label: string;
    @prop.string() title: string;
    @prop.string() href: string;
    @prop.string() slug: string;
    @prop.string() icon: string;
    @prop.string('default') type: string;
    @prop.boolean() highlighted: boolean;
    @prop.array() children: any[];
    @prop.object(() => ({})) attributes: string;

    @inject$('shortcut.types') registry: ShortcutTypeRegistry;

    get isDropdown() {return this.children && this.children.length;}

    get computedAttributes() {
        const attributes: Dropdown & any = this.attributes as any;
        if ( 'href' in attributes === false ) {
            attributes.href = 'javascript:void(0)';
        }
        if ( this.isDropdown ) {
            let attrs: Partial<Dropdown> = {
                trigger: 'click',
                size   : 'small',

            };

            attributes.trigger = 'click';
            attributes.size    = 'small';
        }
        return attributes;
    }


    get tag() {
        if ( this.isDropdown ) {
            return 'el-dropdown';
        }
        return 'a';
    }

    get classes() {
        return {
            [ this.classPrefix ]                  : true,
            [ `${this.classPrefix}--highlighted` ]: this.highlighted,
        };
    }

    get style(): Styles {
        let style: Styles = {
            cursor: 'pointer',
        };
        return style;
    }

    get shortcutType() {return this.registry.get(this.type); }
    get shortcutComponent() {return this.shortcutType.Component; }

    get shortcutAttributes() {return {};}

    mounted() {
        this.$log('mounted', 'registry: ', this.registry);
    }

}
</script>