<template>
    <a
            class="el-button"
            @click="handleClick"
            :href="disabled ? null : href"
            :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    >
        <i class="el-icon-loading" v-if="loading"></i>
        <el-icon :name="icon" v-if="icon && !loading" />
<!--        <i :class="icon" v-if="icon && !loading"></i>-->
        <span v-if="$slots.default"><slot></slot></span>
    </a>
</template>
<script>
export default {

    inject: {
        elForm    : {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },

    props: {
        href      : String,
        type      : {
            type   : String,
            default: 'default'
        },
        size      : String,
        icon      :String,
        nativeType: {
            type   : String,
            default: 'button'
        },
        loading   : Boolean,
        disabled  : Boolean,
        plain     : Boolean,
        autofocus : Boolean,
        round     : Boolean,
        circle    : Boolean
    },

    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        buttonSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        buttonDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        }
    },

    methods: {
        handleClick(event) {
            if ( !this.disabled ) {
                if ( !this.href ) {
                    this.$emit('click', event);
                }
            }
        }
    }
};
</script>
