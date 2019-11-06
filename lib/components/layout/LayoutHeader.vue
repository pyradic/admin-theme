<template>
    <header :class="classes" :style="styles">
        <!--<a href="javascript:void(0)" class="py-layout__header-sidebar-toggle" @click="handleTitleClick"><i class="fa fa-bars"></i></a>-->
        <slot></slot>
    </header>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, inject, prop, Styles } from '@pyro/platform';
    import Layout from './Layout.vue';

    @component()
    export default class LayoutHeader extends Vue {
        @inject() layout: typeof Layout.prototype
        @prop.classPrefix('layout__header') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true,
            }
        }
        get styles():Styles {return {}}

        handleTitleClick(event: MouseEvent) {
            event.preventDefault();
            this.layout.sidebar.collapsed = !this.layout.sidebar.collapsed
        }
    }
</script>