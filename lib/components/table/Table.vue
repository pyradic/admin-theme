<template>
    <div :class="classes">
        <div :class="E('top')">
            <el-menu :class="E('views')" mode="horizontal" default-active="all">
                <el-menu-item
                        v-for="(view, iview) in table.views"
                        :key="iview"
                        :index="view.slug"
                        :class="E('view')"
                        @click="handleViewClick(view)">
                    <el-icon v-if="view.icon" :name="view.icon"/>
                    <span>{{ view.text }}</span>
                </el-menu-item>
            </el-menu>
            <div :class="E('filters')">
                <template v-for="(filter, ifilter) in table.filters" v-if="typeof filter.input === 'string'">
                    <div :key="ifilter" v-html="filter.input" :class="E('filter')"/>
                </template>
            </div>
        </div>
        <el-table
                ref="table"
                :data="table.rows"
                :class="E('table')"
                size="mini"
                :header-row-class-name="E('table-header-row')"
                :header-cell-class-name="E('table-header-cell')"
                :row-class-name="E('table-row')"
                :cell-class-name="E('table-cell')">
            <el-table-column
                    v-if="table.hasSelectors"
                    type="selection"
                    width="55"/>
            <el-table-column
                    v-for="(column, icolumn) in table.columns"
                    v-bind="column"
                    :key="icolumn">
                <template slot-scope="scope">
                    <div v-html="scope.row[scope.column.property]"/>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleButton(scope.$index, scope.row)"
                    >Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleButton(scope.$index, scope.row)"
                    >Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div :class="E('bottom')">
            <div :class="E('actions')">
                <el-button
                        v-for="(action,iaction) in table.actions"
                        :key="iaction"
                        :class="E('action')"
                        type="danger"
                        size="small"
                        icon="delete"
                >{{ action.text }}
                </el-button>
            </div>
            <div class="fg1" />
            <el-pagination
                    v-bind="table.pagination"
                    @current-change="handlePaginationCurrentChange"
                    :class="E('pagination')"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles, watch }                                                from '@pyro/platform';
// noinspection ES6UnusedImports
import Vue, { CreateElement, VNode }                                                                from 'vue';
import { Input, Loading, Menu, MenuItem, Pagination, Table as ElTable, TableColumn, TabPane, Tabs } from 'element-ui';
import { TableManager }                                                                             from './TableManager';
import { createTableManager }                                                                       from './createTableManager';

@component({
    components: {
        [ ElTable.name ]    : ElTable,
        [ TableColumn.name ]: TableColumn,
        [ Tabs.name ]       : Tabs,
        [ TabPane.name ]    : TabPane,
        [ Pagination.name ] : Pagination,
        [ Input.name ]      : Input,
        [ Menu.name ]       : Menu,
        [ MenuItem.name ]   : MenuItem,
    },
    block     : 'table',
    directives: {
        loading: Loading.directive as any,
    },
})
export default class Table extends Component {
    $refs: { table: ElTable & Vue };
    @prop.classPrefix('table') classPrefix: string;
    @prop.object() data: import('./interfaces').StreamsTable.TableData;
    @prop.string() getUrl: string;

    search = null;

    table: TableManager = null;

    protected created() {
        this.table = createTableManager(this.getUrl);
        this.table.init(this.data);
    }

    get $table(): ElTable & Vue {return this.$refs.table;}

    get classes() {return { [ this.classPrefix ]: true }; }

    get style(): Styles {
        return {
            height: '500px',
            width : '100%',
        };
    }

    handleButton() {}

    public async setPage(page: number) {
        await this.$loader<any>(async (loader) => this.table.setPage(page), {
            target : this.$table.$el as any,
            text   : 'Loading...',
            spinner: 'el-icon-loading',
        });
    }

    public async setView(slug: string) {
        await this.$loader<any>(async (loader) => this.table.setView(slug), {
            target : this.$table.$el as any,
            text   : 'Loading...',
            spinner: 'el-icon-loading',
        });
    }

    protected handlePaginationCurrentChange($event) {
        this.setPage($event);
    }

    protected handleViewClick(view) {
        this.setView(view.slug);
    }

    @watch('search')
    protected handleSearch(value) {

    }
}
</script>
