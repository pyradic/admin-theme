<template>
    <form :class="classes" :style="style">
        <slot></slot>
    </form>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@crvs/platform';
    import Vue from 'vue';

    @component({
        delimiters: ['\{\{\{', '}}}']
    })
    export default class Form extends Vue {
        @prop.classPrefix('form') classPrefix: string

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