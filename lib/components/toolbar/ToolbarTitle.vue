<template>
    <div :class="classes" :style="style">
        <a :href="link" v-if="link">{{title}}</a>
        <span v-else>{{title}}</span>
    </div>
</template>
<script lang="ts">
    import { component, prop } from '@crvs/platform';
    import Vue from 'vue';

    @component()
    export default class ToolbarTitle extends Vue {
        @prop.classPrefix('toolbar__title') classPrefix: string
        @prop.string() link: string
        @prop([ String, Number ], '200px') width: string | number
        @prop.string.required() title: string

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style() {
            const { width } = this
            return { width: typeof width === 'number' ? (width + 'px') : width }
        }
    }
</script>