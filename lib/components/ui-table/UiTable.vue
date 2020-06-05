<style lang="scss">
    .py-ui-table {
        $self         : &;
        margin-left   : auto;
        margin-right  : auto;
        padding-left  : 15px;
        padding-right : 15px;

        &--filters-dropdown {
            #{$self}-filters {
                position : absolute;
                width    : 200px;
                z-index  : 9999;
                padding  : 5px 10px;
                right    : 20px;
                display: none;

                &.is-shown {
                    display: block;
                }
            }
        }

        &-filters {
            &.el-card {
                > .el-card__body {
                    padding : 5px 0;
                }
            }

            &__form {}

            &__form-group {}

            &__button-filter {}

            &__button-clear {}
        }
    }
</style>
<template>
    <div :class="classes" :style="style">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@crvs/platform';
    import Vue from 'vue';
    import { Card } from 'element-ui';

    Vue.component(Card.name, Card);

    @component()
    export default class UiTable extends Vue {
        @prop.classPrefix('ui-table') classPrefix: string
        @prop.object.required() uiTable: any

        mounted(){
        }
        get classes() {
            return {
                [ this.classPrefix ]                       : true,
                [ `${this.classPrefix}--filters-dropdown` ]: this.uiTable.filters_dropdown
            }
        }

        get style(): Styles {
            return {}
        }
    }
</script>