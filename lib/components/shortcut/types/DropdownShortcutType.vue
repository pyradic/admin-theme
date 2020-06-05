<template>
    <el-dropdown :class="classes" :style="style" size="mini" trigger="click">
        <div class="py-shortcut__inner"
             @click="handleClick"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseOut">
            <slot><el-icon v-if="icon" :name="icon" :class="classNames.icon"/></slot>
            <span v-if="label" :class="classNames.label">{{label}}</span>
        </div>
        <el-dropdown-menu class="py-shortcut__dropdown-menu">
            <el-dropdown-item class="py-shortcut__dropdown-item" v-for="(child,ichild) in children" :key="ichild">
                <a :href="child.href">{{child.label || child.title }}</a>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script lang="ts">
import { component, prop,mixins }   from '@crvs/platform';
import { ShortcutTypeMixin }      from './ShortcutTypeMixin';
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui';

@component({
    components: {
        [ Dropdown.name ]    : Dropdown,
        [ DropdownItem.name ]: DropdownItem,
        [ DropdownMenu.name ]: DropdownMenu
    }
})
export default class DropdownShortcutType extends mixins(ShortcutTypeMixin) {
    @prop.classPrefix('defaultshortcuttype') classPrefix: string;

    handleClick(event: MouseEvent) {
        this.$log('handleClick', event);
        this.$emit('click', event);
    }
}
</script>