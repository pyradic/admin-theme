<template>
    <footer :class="classes" :style="styles">
        <slot></slot>
    </footer>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, inject, prop, Styles } from '@pyro/platform';
    import Layout from './Layout.vue';

    @component()
    export default class LayoutMain extends Vue {
        @inject() layout: typeof Layout.prototype
        @prop.classPrefix('layout__main') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true,
                [ `el-footer` ]: true,
            }
        }
        get styles():Styles {return {}}
    }
</script>