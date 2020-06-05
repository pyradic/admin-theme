<template>
    <footer :class="classes" :style="styles">
        <slot></slot>
    </footer>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, inject, prop, Styles } from '@crvs/platform';
    import Layout from './Layout.vue';

    @component()
    export default class LayoutFooter extends Vue {
        @inject() layout: typeof Layout.prototype
        @prop.classPrefix('layout__footer') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true,
            }
        }
        get styles():Styles {return {}}
    }
</script>