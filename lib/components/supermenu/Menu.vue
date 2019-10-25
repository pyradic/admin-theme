<template>
    <div :class="classes" :style="style">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';

    @component()
    export default class Menu extends Vue {
        @prop.classPrefix('menu') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style(): Styles {
            return {}
        }
    }
</script>