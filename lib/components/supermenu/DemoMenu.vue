<template>
    <div :class="classes" :style="style">
    </div>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import { IMenu } from '@pyro/menus/lib/interfaces';

    @component()
    export default class DemoMenu extends Vue {
        @prop.classPrefix('demomenu') classPrefix: string
        @prop.object() menu: IMenu

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style(): Styles {
            return {}
        }


        created() {
            this.$log('created', this)
        }

        mounted() {
            this.$log('mounted', this)
        }
    }
</script>