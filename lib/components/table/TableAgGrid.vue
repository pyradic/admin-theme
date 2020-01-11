<template>
    <div :class="classes">
        <!--        <vuetable ref="vuetable" v-bind="vuetable"        />-->
        <ag-grid-vue
                :modules="go.modules"
                :style="style"
                :class="classes"
                :columnDefs="go.columnDefs"
                :rowData="go.rowData"
                :components="go.components"
                @grid-ready="onGridReady"
        >
        </ag-grid-vue>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles }                                from '@pyro/platform';
import { ClientSideRowModelModule, ColDef, ColumnApi,Module, GridApi, GridOptions } from '@ag-grid-community/all-modules';
// noinspection ES6UnusedImports
import vue                                                                   from 'vue';
import { AgGridVue }                                                         from '@ag-grid-community/vue';
import { PyroCellRenderer }                                                  from './components/PyroCellRenderer';

// vue.component(AgGridVue.name, AgGridVue);
@component({
    components: { AgGridVue },
})
export default class Table extends Component {
    @prop.classPrefix('table') classPrefix: string;
    @prop.object() data: import('./interfaces').TableData;
    @prop.string() url: string;

    go:GridOptions&{modules:Module[]} = {
        columnDefs: null,
        rowData   : null,
        modules   : [
            ClientSideRowModelModule,
        ],
        components: {
            PyroCellRenderer,
        },

    };

    // non reactive
    api: GridApi;
    columnApi: ColumnApi;

    get classes() {
        return {
            [ this.classPrefix ]      : true,
            [ `ag-theme-balham-dark` ]: false,
            [ `ag-theme-balham` ]     : false,
            [ `ag-theme-material` ]   : true,
        };
    }

    get style(): Styles {
        return {
            height: '500px',
            width : '100%',
        };
    }

    beforeMount() {
        this.go.columnDefs = this.transformHeaders(this.data.headers);
        this.go.columnDefs.push({
            headerName: '',
        });
        this.go.rowData = this.transformRows(this.data.rows);
    }

    onGridReady(params) {
        this.$log('onGridReady', params);
        this.api       = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
    }

    transformRows(rows: import('./interfaces').Row[]) {
        return rows.map((r) => {
            let row: Record<string, any> = {};
            r.columns.forEach((c, ci) => {
                row[ this.data.headers[ ci ].field ] = c.value;
            });
            return row;
        });
    }

    transformHeaders(headers: import('./interfaces').Header[]) {
        return headers.map(h => ({
            sortable    : h.sortable,
            sort        : h.direction,
            headerName  : h.heading,
            field       : h.field,
            cellRenderer: 'PyroCellRenderer',
        } as ColDef));
    }

    mounted() {
        this.$log('Mounted', { data: this.data, me: this });
        console.trace('mounted');
    }
}
</script>
