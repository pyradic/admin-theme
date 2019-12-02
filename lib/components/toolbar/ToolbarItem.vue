<template>
    <div :class="classes" :style="style">
        <a href="#" v-if="icon">
            <i v-if="icon" :icon="icon"></i>
        </a>
        <slot></slot>
    </div>
</template>
<script lang="ts">

    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';

    @component()
    export default class ToolbarItem extends Vue {
        @prop.classPrefix('toolbar__item') classPrefix: string
        @prop(Boolean) clickable: boolean
        @prop(Boolean) separator: boolean
        @prop(Boolean) spacer: boolean
        @prop(String) icon: string
        // @prop({ type: [ String, Number ], default: '50px' }) height: string | number

        get classes() {
            return {
                [ this.classPrefix ]                : true,
                [ `${this.classPrefix}--clickable` ]: this.clickable,
                [ `${this.classPrefix}--spacer` ]   : this.spacer,
                [ `${this.classPrefix}--separator` ]: this.separator,
                [ `${this.classPrefix}--icon` ]     : this.icon
            }
        }

        get style(): Styles {
            return {};
            // let height = this.height
            // if ( typeof height === 'number' ) {
            //     height = height + 'px';
            // }
            // let style: Styles = {
            //     height
            // }
            // return style;
        }
    }
</script>