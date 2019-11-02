<template2>
    <a :class="classes" :title="title" :href="href">
        <slot><i :class="icon" v-if="icon"></i></slot>
        <slot name="label"><span v-if="label">{{label}}</span></slot>
    </a>
</template2>
<template>

    <component
            :is="tag"
            :class="classes"
            :style="style"
            :title="title"
            :data-slug="slug"
            v-bind="computedAttributes"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseOut">
        <slot><i v-if="icon" :icon="icon" :class="classNames.icon"/></slot>
        <span v-if="label" :class="classNames.label">{{label}}</span>


        <template v-if="isDropdown">
            <el-dropdown-menu class="py-shortcut__dropdown-menu" slot="dropdown" size="small">
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
            [ Dropdown.name ]    : Dropdown,
            [ DropdownItem.name ]: DropdownItem,
            [ DropdownMenu.name ]: DropdownMenu
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
                    size: 'mini',

                }

                attributes.trigger = 'click';
                attributes.size = 'mini'
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
            let style: Styles = {}
            return style;
        }

        get isDropdown() {return this.children && this.children.length}

        handleMouseEnter(event: MouseEvent) {
            this.$py.events.emit('shortcut-info:set', this.title)
        }

        handleMouseOut(event: MouseEvent) {
            this.$py.events.emit('shortcut-info:unset')
        }
    }
</script>