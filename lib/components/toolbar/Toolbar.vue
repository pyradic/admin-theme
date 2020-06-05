<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">

    import { component, prop } from '@crvs/platform';
    import Vue from 'vue';
import vars from '../../styling/export.scss';

    @component()
    export default class Toolbar extends Vue {
        @prop.classPrefix('toolbar') classPrefix: string
        @prop.string() title: string
        @prop([ String, Number ], '200px') titleWidth: string | number
        @prop.string() titleLink: string
        @prop.boolean() showTitle: boolean
        @prop.boolean() showToggle: boolean
        @prop(String, 'start') justify: 'start' | 'end' | 'between' | 'even' | 'around'

        get classes() {
            return {
                [ this.classPrefix ]                      : true,
                [ `${this.classPrefix}--${this.justify}` ]: true
            }
        }
        mounted() {
            this.$log('mounted', this)
            this.$log('export.scss', vars)
            window[ 'py_toolbar' ] = this;
        }
    }
</script>