<template>
    <div :class="classes">{{text}}</div>
</template>
<script lang="ts">
    import { component, prop } from '@crvs/platform';
    import Vue from 'vue';

    @component()
    export default class ShortcutInfo extends Vue {
        @prop.classPrefix('shortcut-info') classPrefix: string

        text = ''

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }


        mounted() {
            this.$py.events.on('shortcut-info:set', (title) => {
                this.$log('shortcut-info:set',title)
                this.text = title;
            })
            this.$py.events.on('shortcut-info:unset', () => {
                this.text=null
            })
        }
    }
</script>