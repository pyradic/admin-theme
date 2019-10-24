<template>
    <div :class="classes" :style="style">
        <py-menu
                horizontal
        >

        </py-menu>
    </div>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import Menu from './Menu.vue';
    @component()
    export default class DemoMenu extends Vue {
        @prop.classPrefix('demomenu') classPrefix: string

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