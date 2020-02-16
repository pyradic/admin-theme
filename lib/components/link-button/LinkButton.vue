<template>
    <a
            class="el-button"
            @click="handleClick"
            :href="disabled ? null : href"
            tabindex="0"
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
        <el-icon :name="icon" v-if="icon && !loading"/>
        <span v-if="$slots.default"><slot></slot></span>
    </a>
</template>
<script lang="ts">

import { component, Component, inject, prop } from '@pyro/platform';
import { Form, FormItem }                     from 'element-ui';
import {convertSize} from '../../utils/convertSize'
@component()
export default class LinkButton extends Component {
    @inject({ default: '' }) elForm: Form;
    @inject({ default: '' }) elFormItem: FormItem;
    @prop.string('primary') type: string; //ButtonType;
    @prop.string() size: string; //ElementUIComponentSize;
    @prop.string() href: string;
    @prop.string() icon: string;
    @prop.boolean() loading: boolean;
    @prop.boolean() disabled: boolean;
    @prop.boolean() plain: boolean;
    @prop.boolean() autofocus: boolean;
    @prop.boolean() round: boolean;
    @prop.boolean() circle: boolean;

    get _elFormItemSize() {return (this.elFormItem || {})[ 'elFormItemSize' ];}

    get buttonSize() {
        let size= this.size || this._elFormItemSize || (this[ '$ELEMENT' ] || {}).size;
        return convertSize.toElementUI(size);
    }

    get buttonDisabled() {return this.disabled || (this.elForm || {}).disabled; }

    handleClick(event) {
        if ( !this.disabled ) {
            if ( !this.href ) {
                this.$emit('click', event);
            }
        }
    }
}


</script>
