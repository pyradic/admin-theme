<template>
    <div :class="classes" :style="style">
        <py-table ref="table" v-bind="$props"/>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles } from '@crvs/platform';
import Table                                  from './Table.vue';
const BaseComponent= Component.extend({
    props: Table['extendOptions'].props
})
@component()
export default class TableContainer extends BaseComponent {
    $refs: { table: typeof Table.prototype };
    @prop.classPrefix('table-container') classPrefix: string;
    @prop.object() data: import('./interfaces').StreamsTable.TableData;

    get classes() {return { [ this.classPrefix ]: true }; }

    get style(): Styles { return {}; }

}
</script>