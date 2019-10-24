<template>
    <component
            :is="component"
            :class="classes"
            :style="style"
            :menu-item="menuItem"
    >
        <slot></slot>
    </component>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import MenuItem from './MenuItem.vue';
    import { MenuType, MenuTypeRegistry } from './MenuTypeRegistry';

    @component()
    export default class MenuItemType extends Vue {
        @prop.classPrefix('menu__type') classPrefix: string
        @prop(String) type: string
        @prop(Object) menuItem: typeof MenuItem.prototype

        _type: MenuType
        types: MenuTypeRegistry
        component: typeof Vue = null

        created() {
            this.types = this.$py.get('component.menu.types')
            if ( !this.types.isRegistered(this.type) ) {
                throw new Error(`Menu type [${this.type}] is not registered`)
            }
            this._type     = this.types.find(this.type)
            this.component = this._type.component
        }

        get classes() {
            return {
                [ `${this.classPrefix}` ]              : true,
                [ `${this.classPrefix}--${this.type}` ]: true
            }
        }

        get style(): Styles {return {}; }
    }
</script>