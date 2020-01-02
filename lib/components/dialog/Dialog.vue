<!-- The Element UI Dialog, but without the content structure (header, body footer) in order to make any component into a dialog -->
<template>
    <transition
            name="dialog-fade"
            @after-enter="afterEnter"
            @after-leave="afterLeave">
        <div
                v-if="visible"
                class="el-dialog__wrapper"
                @click.self="handleWrapperClick">
            <div
                    role="dialog"
                    :key="key"
                    aria-modal="true"
                    :aria-label="title || 'dialog'"
                    :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
                    ref="dialog"
                    :style="style">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import {Dialog} from 'element-ui'
export default {
    extends: Dialog
}
</script>
<!--
<template2>

    <transition
            name="dialog-fade"
            @after-enter="afterEnter"
            @after-leave="afterLeave">
        <div
                v-show="visible"
                class="el-dialog__wrapper"
                @click.self="handleWrapperClick">
            <div
                    role="dialog"
                    :key="key"
                    aria-modal="true"
                    :aria-label="title || 'dialog'"
                    :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
                    ref="dialog"
                    :style="style">
                <div class="el-dialog__header">
                    <slot name="title">
                        <span class="el-dialog__title">{{ title }}</span>
                    </slot>
                    <button
                            type="button"
                            class="el-dialog__headerbtn"
                            aria-label="Close"
                            v-if="showClose"
                            @click="handleClose">
                        <i class="el-dialog__close el-icon el-icon-close"></i>
                    </button>
                </div>
                <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
                <div class="el-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template2>
-->