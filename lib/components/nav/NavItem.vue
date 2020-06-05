<template>
    <el-menu-item
            :class="classes"
            :style="style"
    >
        <slot>
            {{item.title}}
        </slot>
    </el-menu-item>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@crvs/platform';
    import Vue from 'vue';
    import { IMenuItem } from '@pyro/menus-module/lib/interfaces';

    @component()
    export default class MenuItem extends Vue {
        @prop.classPrefix('menu__item') classPrefix: string
        @prop.object() item: IMenuItem

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style(): Styles {
            return {}
        }

        mounted() {
            this.$log('mounted', { item: this.item, me: this })
        }
    }
</script>