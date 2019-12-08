<template>

    <component
            :is="tag"
            :class="classes"
            :style="style"
            :title="title"
            :data-slug="slug"
            v-bind="computedAttributes">
        <div class="py-shortcut__inner"
             @click="handleClick"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseOut">
        <slot><i v-if="icon" :icon="icon" :class="classNames.icon"/></slot>
        <span v-if="label" :class="classNames.label">{{label}}</span>
        </div>
        <template v-if="isDropdown">
            <el-dropdown-menu class="py-shortcut__dropdown-menu" slot="dropdown">
                <el-dropdown-item class="py-shortcut__dropdown-item" v-for="(child,ichild) in children" :key="ichild">
                    <a :href="child.href">{{child.label || child.title }}</a>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </component>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';
    import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui';

    @component({
        components: {
        }
    })
    export default class Shortcut extends Vue {
        @prop.classPrefix('shortcut') classPrefix: string
        @prop.string() label: string
        @prop.string() title: string
        @prop.string() href: string
        @prop.string() slug: string
        @prop.string() icon: string
        @prop.boolean() highlighted: boolean
        @prop.array() children: any[]
        @prop.object(() => ({})) attributes: string

        get computedAttributes() {
            const attributes: Dropdown & any = this.attributes as any
            if ( 'href' in attributes === false ) {
                attributes.href = 'javascript:void(0)'
            }
            if(this.isDropdown){
                let attrs:Partial<Dropdown> = {
                    trigger: 'click',
                    size: 'small',

                }

                attributes.trigger = 'click';
                attributes.size = 'small'
            }
            return attributes;
        }

        get tag() {
            if ( this.isDropdown ) {
                return 'el-dropdown'
            }
            return 'a';
        }

        get classes() {
            return {
                [ this.classPrefix ]                  : true,
                [ `${this.classPrefix}--highlighted` ]: this.highlighted
            }
        }

        get classNames() {
            return {
                icon : { [ `${this.classPrefix}__icon` ]: true, [ this.icon ]: true },
                label: `${this.classPrefix}__label`
            }
        }

        get style(): Styles {
            let style: Styles = {
                cursor: 'pointer'
            }
            return style;
        }

        get isDropdown() {return this.children && this.children.length}

        handleMouseEnter(event: MouseEvent) {
            this.$log('handleMouseEnter','shortcut-info:set', this.title,event)
            this.$py.events.emit('shortcut-info:set', this.title)
        }

        handleMouseOut(event: MouseEvent) {
            this.$log('handleMouseOut','shortcut-info:unset',event)
            this.$py.events.emit('shortcut-info:unset')
        }
        handleClick(event: MouseEvent) {
            this.$log('handleClick',event)
            this.$emit('click',event);
        }
    }
</script>