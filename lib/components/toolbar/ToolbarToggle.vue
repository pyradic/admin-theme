<template>
    <component :is="tag" :class="classes" @click="handleClick">
        <slot>
            <i :class="icon"></i>
        </slot>
    </component>
</template>
<script lang="ts">
    import { component, inject, prop } from '@pyro/platform';
    import Vue from 'vue';
    import Layout from '../layout/Layout.vue';

    @component()
    export default class ToolbarToggle extends Vue {
        @prop.classPrefix('toolbar__toggle') classPrefix: string
        @prop.string('button') tag: string
        // @prop.string('el-icon-arrow-right') icon: string
        @inject() layout: typeof Layout.prototype

        get icon(){
            return this.layout.sidebar.collapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'
        }
        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        handleClick(event: MouseEvent) {
            event.preventDefault()
            this.layout.toggleSidebarCollapse()
            this.$emit('toggle', this.layout.sidebar.collapsed)
        }
    }
</script>