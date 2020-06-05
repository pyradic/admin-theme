<template>
    <div :class="classes" :style="style">
        <div class="py-shortcut__inner"
             @click="handleClick"
             @mouseenter="handleMouseEnter"
             @mouseleave="handleMouseOut">
            <slot><el-icon v-if="icon" :name="icon" :class="classNames.icon"/></slot>
            <span v-if="label" :class="classNames.label">{{label}}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { component, mixins, prop, Styles } from '@crvs/platform';
import { ShortcutTypeMixin }               from './ShortcutTypeMixin';

@component()
export default class DefaultShortcutType extends mixins(ShortcutTypeMixin) {

}
</script>