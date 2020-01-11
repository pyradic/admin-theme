import { ElementUIHorizontalAlignment }                                                           from 'element-ui/types/component';
import { PopoverPlacement }                                                                       from 'element-ui/types/popover';
import { RenderHeaderData, SortOrders, TableColumnFilter, TableColumnFixedType, TableColumnType } from 'element-ui/types/table-column';
import { CreateElement, VNode }                                                                   from 'vue';
import { TableColumn }                                                                            from 'element-ui';


export namespace VueTable {

    export interface Column {
        /** Type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. */
        type?: TableColumnType

        /** Column label */
        label?: string

        /** Column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered */
        columnKey?: string

        /** Field name. You can also use its alias?: property */
        prop?: string

        /** Column width */
        width?: string

        /** Column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion */
        minWidth?: string

        /** Whether column is fixed at left/right. Will be fixed at left if `true` */
        fixed?: boolean | TableColumnFixedType

        /** Render function for table header of this column */
        renderHeader?: (h?: CreateElement, data?: RenderHeaderData) => VNode | string

        /** Whether column can be sorted */
        sortable?: boolean | 'custom'

        /** Sorting method. Works when `sortable` is `true` */
        sortMethod?: (a?: any, b?: any) => number

        /** The order of the sorting strategies used when sorting the data. Works when `sortable` is `true`. */
        sortOrders?: SortOrders[]

        /** Whether column width can be resized. Works when border of `el-table` is `true` */
        resizable?: boolean

        /** Function that formats content */
        formatter?: (row?: object, column?: TableColumn) => any

        /** Whether to hide extra content and show them in a tooltip when hovering on the cell */
        showOverflowTooltip?: boolean

        /** Alignment */
        align?: ElementUIHorizontalAlignment

        /** Alignment of the table header. If omitted, the value of the `align` attribute will be applied */
        headerAlign?: ElementUIHorizontalAlignment

        /** Class name of cells in the column */
        className?: string

        /** Class name of the label of this column */
        labelClassName?: string

        /** Function that determines if a certain row can be selected, works when `type` is `'selection'` */
        selectable?: (row?: object, index?: number) => boolean

        /** Whether to reserve selection after data refreshing, works when `type` is `'selection'` */
        reserveSelection?: boolean

        /** An array of data filtering options */
        filters?: TableColumnFilter[]

        /** Placement for the filter dropdown */
        filterPlacement?: PopoverPlacement

        /** Whether data filtering supports multiple options */
        filterMultiple?: Boolean

        /** Data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true` */
        filterMethod?: (value?: any, row?: object) => boolean

        /** Filter value for selected data, might be useful when table header is rendered with `render-header` */
        filteredValue?: TableColumnFilter[]
    }

    export interface Pagination {

        /** Whether to use small pagination */
        small?: boolean

        /** Item count of each page */
        pageSize?: number

        /** Total item count */
        total?: number

        /** Total page count. Set either total or page-count and pages will be displayed; if you need page-sizes, total is required */
        pageCount?: number

        /** Number of pagers */
        pagerCount?: number

        /** Current page number */
        currentPage?: number

        /**
         * Layout of Pagination. Elements separated with a comma.
         * Accepted values?: `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot`
         */
        layout?: string

        /** Options of item count per page */
        pageSizes?: number[]

        /** Custom class name for the page size Select's dropdown */
        popperClass?: string

        /** Text for the prev button */
        prevText?: string

        /** Text for the prev button */
        nextText?: string

        /** Whether to hide when thers's only one page */
        hideOnSinglePage?: boolean
    }

    export interface Filter extends StreamsTable.Filter {}

    export interface View extends StreamsTable.View {}

    export interface Action extends StreamsTable.Action {}

    export interface Row {
        [ k: string ]: any
    }
}

export namespace StreamsTable {


    export interface TableData {
        filters?: Filter[];
        actions?: Action[];
        headers?: Header[];
        pagination?: Pagination;
        options?: TableDataOptions;
        views?: View[];
        rows?: Row[];
    }

    export interface Action {
        handler?: string;
        permission?: null;
        active?: boolean;
        prefix?: null;
        slug?: string;
        dropdown?: any[];
        dropup?: boolean;
        position?: string;
        parent?: null;
        attributes?: ActionAttributes;
        disabled?: boolean;
        enabled?: boolean;
        entry?: null;
        icon?: string;
        class?: null;
        size?: string;
        type?: string;
        text?: string;
        url?: null;
        tag?: string;
    }

    export interface ActionAttributes {
        'data-toggle'?: string;
        'data-icon'?: string;
        'data-title'?: string;
        'data-message'?: string;
        name?: string;
        value?: string;
    }

    export interface Filter {
        input?: any[] | string;
        columns?: any[];
        fields?: string[];
        query?: string;
        placeholder?: null | string;
        value?: null;
        inputName?: string;
        prefix?: null;
        slug?: string;
        exact?: boolean;
        active?: boolean;
        column?: null;
        field?: null | string;
        options?: FilterOptions;
    }

    export interface FilterOptions {
        active?: string;
        inactive?: string;
        disabled?: string;
    }

    export interface Header {
        field?: string;
        value?: string;
        heading?: string;
        sortable?: boolean;
        sort_column?: string;
        wrapper?: string;
        queryString?: string;
        direction?: null;
        sortColumn?: null | string;
    }

    export interface TableDataOptions {
        [ k: string ]: any

        limit?: number;
        table_view?: string;
        eager?: any[];
        total_results?: number;
        class?: string;
    }

    export interface Pagination {
        current_page?: number;
        first_page_url?: string;
        from?: number;
        last_page?: number;
        last_page_url?: string;
        next_page_url?: string;
        path?: string;
        per_page?: number;
        prev_page_url?: null;
        to?: number;
        total?: number;
    }

    export interface Row {
        key?: number;
        class?: null;
        buttons?: Button[];
        columns?: Column[];
    }

    export interface Button {
        dropdown?: Dropdown[];
        dropup?: boolean;
        position?: string;
        parent?: null;
        attributes?: any[] | AttributesAttributes;
        disabled?: boolean;
        enabled?: boolean;
        icon?: string;
        class?: null;
        size?: string;
        permission?: null;
        type?: string;
        text?: boolean | string;
        url?: null;
        tag?: string;
    }

    export interface AttributesAttributes {
        href?: boolean;
    }

    export interface Dropdown {
        text?: string;
        icon?: null;
        type?: string;
        button?: string;
        slug?: string;
        attributes?: DropdownAttributes;
        size?: string;
        parent?: string;
        permission?: string;
    }

    export interface DropdownAttributes {
        target?: string;
        href?: string;
        'data-toggle'?: string;
        'data-message'?: string;
    }

    export interface Column {
        wrapper?: string;
        view?: null;
        class?: null;
        heading?: string;
        value?: string;
        attributes?: any[];
    }

    export interface Views {
        all?: View;
        online?: View;
        pending?: View;
        trash?: View;
    }

    export interface View {
        label?: null;
        context?: string;
        attributes?: AllAttributes;
        handler?: null;
        query?: string;
        active?: boolean;
        prefix?: null;
        slug?: string;
        text?: string;
        icon?: null;
        filters?: Filters | null;
        columns?: string[] | Column[] | null;
        buttons?: string[] | Button[] | null;
        actions?: Action[] | null;
        options?: AllOptions | null;
        entries?: null;
    }

    export interface Actions {
        '0'?: string;
        activate?: Activate;
        force_delete?: any[];
    }

    export interface Activate {
        handler?: string;
        type?: string;
        icon?: string;
    }

    export interface AllAttributes {
        href?: string;
    }

    export interface ButtonsClass {
        restore?: any[];
    }

    export interface ColumnsClass {
        '0'?: string;
        '1'?: string;
        '2'?: string;
        created_at?: CreatedAt;
    }

    export interface CreatedAt {
        wrapper?: string;
        value?: Value;
    }

    export interface Value {
        datetime?: string;
        timeago?: string;
    }

    export interface Filters {
        search?: Search;
    }

    export interface Search {
        filter?: string;
        fields?: string[];
    }

    export interface AllOptions {
        order_by?: OrderBy;
        sortable?: boolean;
    }

    export interface OrderBy {
        created_at?: string;
    }
}





// export interface Column {
//     /** Type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. */
//     type?: TableColumnType
//
//     /** Column label */
//     label?: string
//
//     /** Column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered */
//     columnKey?: string
//
//     /** Field name. You can also use its alias?: property */
//     prop?: string
//
//     /** Column width */
//     width?: string
//
//     /** Column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion */
//     minWidth?: string
//
//     /** Whether column is fixed at left/right. Will be fixed at left if `true` */
//     fixed?: boolean | TableColumnFixedType
//
//     /** Render function for table header of this column */
//     renderHeader?: (h?: CreateElement, data?: RenderHeaderData) => VNode | string
//
//     /** Whether column can be sorted */
//     sortable?: boolean | 'custom'
//
//     /** Sorting method. Works when `sortable` is `true` */
//     sortMethod?: (a?: any, b?: any) => number
//
//     /** The order of the sorting strategies used when sorting the data. Works when `sortable` is `true`. */
//     sortOrders?: SortOrders[]
//
//     /** Whether column width can be resized. Works when border of `el-table` is `true` */
//     resizable?: boolean
//
//     /** Function that formats content */
//     formatter?: (row?: object, column?: TableColumn) => any
//
//     /** Whether to hide extra content and show them in a tooltip when hovering on the cell */
//     showOverflowTooltip?: boolean
//
//     /** Alignment */
//     align?: ElementUIHorizontalAlignment
//
//     /** Alignment of the table header. If omitted, the value of the `align` attribute will be applied */
//     headerAlign?: ElementUIHorizontalAlignment
//
//     /** Class name of cells in the column */
//     className?: string
//
//     /** Class name of the label of this column */
//     labelClassName?: string
//
//     /** Function that determines if a certain row can be selected, works when `type` is `'selection'` */
//     selectable?: (row?: object, index?: number) => boolean
//
//     /** Whether to reserve selection after data refreshing, works when `type` is `'selection'` */
//     reserveSelection?: boolean
//
//     /** An array of data filtering options */
//     filters?: TableColumnFilter[]
//
//     /** Placement for the filter dropdown */
//     filterPlacement?: PopoverPlacement
//
//     /** Whether data filtering supports multiple options */
//     filterMultiple?: Boolean
//
//     /** Data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true` */
//     filterMethod?: (value?: any, row?: object) => boolean
//
//     /** Filter value for selected data, might be useful when table header is rendered with `render-header` */
//     filteredValue?: TableColumnFilter[]
// }
//
// export interface Pagination {
//
//     /** Whether to use small pagination */
//     small: boolean
//
//     /** Item count of each page */
//     pageSize: number
//
//     /** Total item count */
//     total: number
//
//     /** Total page count. Set either total or page-count and pages will be displayed; if you need page-sizes, total is required */
//     pageCount: number
//
//     /** Number of pagers */
//     pagerCount: number
//
//     /** Current page number */
//     currentPage: number
//
//     /**
//      * Layout of Pagination. Elements separated with a comma.
//      * Accepted values: `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot`
//      */
//     layout: string
//
//     /** Options of item count per page */
//     pageSizes: number[]
//
//     /** Custom class name for the page size Select's dropdown */
//     popperClass: string
//
//     /** Text for the prev button */
//     prevText: string
//
//     /** Text for the prev button */
//     nextText: string
//
//     /** Whether to hide when thers's only one page */
//     hideOnSinglePage: boolean
// }
//
// export interface Filter extends StreamsTable.Filter {}
//
// export interface View extends StreamsTable.View {}
