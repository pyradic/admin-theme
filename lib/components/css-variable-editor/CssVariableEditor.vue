<template>
    <div :class="classes" :style="style">
        <div :class="E('header')" v-if="title">
            <h3 :class="E('header-title')" v-html="title"></h3>
        </div>
        <el-form ref="form" :model="form" label-width="55%" size="mini" :class="E('form')" :style="formStyle">
            <el-form-item label="Search" :class="E('form-item',['search'])">
                <el-input v-model="search"/>
            </el-form-item>
            <template v-for="(row,index) in computedRows">
                <el-form-item :label="row.key" :class="E('form-item')">
                    <template v-if="row.component === 'unit'">
                        <el-input placeholder="Please input" v-model="row.size" class="input-with-select" @change="val => onChangeUnitSize(row,val)">
                            <el-select v-model="row.unit" slot="append" placeholder="Select" @change="val => onChangeUnit(row,val)">
                                <el-option
                                        v-for="(unit,iunit) in units"
                                        :key="iunit"
                                        :label="unit"
                                        :value="unit"
                                />
                            </el-select>
                        </el-input>

                    </template>
                    <template v-else>
                        <component
                                :class="E('field', [row.component])"
                                :is="row.component"
                                v-model="form[row.formKey]"
                        />
                    </template>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>
<script lang="ts">
import { app, Component, component, Css3, prop, Styles }      from '@crvs/platform';
import { ColorPicker, Form, FormItem, Input, Option, Select } from 'element-ui';
import { debounce }                                           from 'lodash-decorators';

export interface Row {
    key: string
    formKey: string
    component: string
    value: string
    unit?: string
    size?: number
}

@component({
    components: {
        [ Form.name ]       : Form,
        [ FormItem.name ]   : FormItem,
        [ Input.name ]      : Input,
        [ ColorPicker.name ]: ColorPicker,
        [ Select.name ]     : Select,
        [ Option.name ]     : Option,
    },
})
export default class CssVariableEditor extends Component {
    static block = 'css-variable-editor';
    @prop.classPrefix('css-variable-editor') classPrefix: string;
    @prop.string('CSS Variables Editor') title:string

    rows: Row[]    = [];
    search: string = null;
    watching: boolean;

    @debounce(400, { trailing: true })
    get computedRows() {
        if ( this.search ) {
            return this.rows.filter(row => row.key.includes(this.search));
        }
        return this.rows;
    }

    units = [ 'px', 'em', 'rem', '%' ];

    onChangeUnit(row: Row, unit) {
        this.$log('onChangeUnit', unit, row);
        row.value                = row.size+unit;
        this.form[ row.formKey ] = row.size+unit;
    }

    onChangeUnitSize(row: Row, size) {
        this.$log('onChangeUnitSize', size, row);
        row.value                = size+row.unit;
        this.form[ row.formKey ] = size+row.unit;
    }

    updateForm() {
        this.rows = [];
        Object.keys(this.form).forEach(formKey => {
            let key        = '--' + formKey.replace(/_/gmi, '-');
            let value      = Css3.get(key).trim();
            const row: any = { key, value, formKey };
            row.component  = this.resolveFormComponent(value, row);
            this.rows.push(row);
            this.form[ formKey ] = value;

        });
    }

    resolveFormComponent(value, row: Partial<Row>) {
        if ( value.startsWith('#') ) {
            return 'el-color-picker';
        }

        const sizes = this.units.join('|');
        const exp   = new RegExp(`^\\d+(?:${sizes})$`, 'gmi');
        if ( exp.test(value) ) {
            row.size = parseInt(value);
            row.unit = value.trim().replace(row.size.toString(), '');
            return 'unit';
        }

        return 'el-input';
    }

    created() {
        this.updateForm();
    }

    mounted() {
        if(this.$parent && this.$parent.$el && this.$parent.$el.classList.contains('el-dialog__wrapper')){
            this.$parent.$el.classList.remove('el-dialog__wrapper')
        }
        if ( !this.watching ) {
            this.watching = true;
            this.rows.forEach(row => {
                this.$watch('form.' + row.formKey, val => {
                    this.$log('$watch trigger', 'form.' + row.formKey, val, this.form[ row.formKey ]);
                    Css3.set(row.key, val);
                });
            });
        }
    }

    get classes() {return { [ this.classPrefix ]: true }; }

    get style(): Styles {
        return {
            padding: 20,
        };
    }

    get formStyle(): Styles {
        return {
            height: this.parentHeight + 'px',
            overflowY: 'scroll'
        };
    }

    get parentHeight(){
        return this.$parent['trueModalHeight']
    }

    form: Record<string, any> = app.get<string[]>('css-variable-editor-variables').reduce((obj,str,index)=>{
        obj[str]=null;
        return obj;
    }, {});

}
</script>
<style lang="scss">
@import "~@pyro/admin-theme/lib/styling/base";

$editor-prefix : #{$prefix}-css-variable-editor;

.#{$editor-prefix} {
    height: auto;

    &__header {
        padding: 20px;
        border-bottom: 1px solid #E0E0E0;
        &-title {
        }
    }
    &__form {
        padding: 20px 20px 40px;
    }

    &__form-item {
        .el-form-item__label {
            white-space : nowrap;
            font-size   : 11px;
        }

        .input-with-select .el-select .el-input__inner {
            width : 75px;
        }
    }

    &__field {
        &--el-input {}

        &--el-color-picker {}
    }

    /*&__dialog {*/
    /*    .el-dialog__header {*/
    /*        padding    : 10px;*/
    /*        background : #EAEAEA;*/

    /*        &btn {*/
    /*            top       : 10px;*/
    /*            font-size : 20px;*/
    /*        }*/
    /*    }*/

    /*    .el-dialog__body {*/
    /*        max-height : 500px;*/
    /*        overflow-y : scroll;*/
    /*    }*/
    /*}*/

}

</style>
