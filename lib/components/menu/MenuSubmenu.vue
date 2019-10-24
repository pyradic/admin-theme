<template>

    <component
            :is="tags.submenu"
            :class="classes"
            :style="style"
    >
        <slot></slot>
    </component>
</template>
<script lang="ts">
    import { component, inject, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import { IMenuSubmenuTrigger, IMenuSubmenuType, IMenuTags } from './types';
    import Menu from './Menu.vue';

    @component()
    export default class MenuSubmenu extends Vue {
        @prop.classPrefix('menu__submenu') classPrefix: string


        @inject() menu: typeof Menu.prototype;
        @inject() menuEvents: Vue;
        @inject() submenuType: IMenuSubmenuType
        @inject() submenuTrigger: IMenuSubmenuTrigger
        @inject() tags: IMenuTags

        get classes() {
            return [
                this.classPrefix
            ]
        }

        get style(): Styles {
            return {}; //zIndex: this.baseZIndex + 1 + this.depth }
        }
    }
</script>