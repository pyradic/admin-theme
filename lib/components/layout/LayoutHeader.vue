<template>
    <el-header height="50px" class="py-layout__header">
        <a href="javascript:void(0)" class="py-layout__header-sidebar-toggle" @click="handleTitleClick">
            <i class="fa fa-bars"></i>
        </a>
        <slot></slot>
    </el-header>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, inject, prop } from '@pyro/platform';
    import Layout from './Layout.vue';

    @component()
    export default class LayoutHeader extends Vue {
        static template = ``
        @inject() layout: typeof Layout.prototype
        @prop.classPrefix('layout__header') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        mounted() {
            this.$log('mounted', { me: this, layout: this.layout, classes: this.classes })
        }

        handleTitleClick(event: MouseEvent) {
            event.preventDefault();
            this.layout.sidebar.collapsed = !this.layout.sidebar.collapsed
        }
    }
</script>