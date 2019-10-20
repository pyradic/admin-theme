<template2>
    <a :class="classes" :title="title" :href="href">
        <slot><i :class="icon" v-if="icon"></i></slot>
        <slot name="label"><span v-if="label">{{label}}</span></slot>
    </a>
</template2>
<template>

    <a
            :class="classes"
            :style="style"
            :title="title"
            :data-slug="slug"
            v-bind="computedAttributes"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseOut">
        <slot><i v-if="icon" :icon="icon" :class="classNames.icon"/></slot>
        <span v-if="label" :class="classNames.label">{{label}}</span>
    </a>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';

    @component()
    export default class Shortcut extends Vue {
        @prop.classPrefix('shortcut') classPrefix: string
        @prop.string() label: string
        @prop.string() title: string
        @prop.string() href: string
        @prop.string() slug: string
        @prop.string() icon: string
        @prop.boolean() highlighted: boolean
        @prop.object(() => ({})) attributes: string

        get computedAttributes() {
            const attributes: any = this.attributes
            if ( 'href' in attributes === false ) {
                attributes.href = 'javascript:void(0)'
            }
            return attributes;
        }

        get classes() {
            return {
                [ this.classPrefix ]                  : true,
                [ `${this.classPrefix}--highlighted` ]: this.highlighted
            }
        }

        get classNames() {
            return {
                icon : `${this.classPrefix}__icon`,
                label: `${this.classPrefix}__label`
            }
        }

        get style(): Styles {
            let style: Styles = {}
            return style;
        }

        handleMouseEnter(event: MouseEvent) {
            this.$py.events.emit('shortcut-info:set', this.title)
        }

        handleMouseOut(event: MouseEvent) {
            this.$py.events.emit('shortcut-info:unset')
        }
    }
</script>