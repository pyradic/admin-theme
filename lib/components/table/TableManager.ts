import { Component }                        from '@crvs/platform/lib/classes/Component';
import { component }                        from '@crvs/platform';
import { StreamsTable as s, VueTable as v } from './interfaces';
import { Transformer }                      from './Transformer';


@component()
export class TableManager extends Component {
    protected original: s.TableData;
    protected transformer: Transformer = new Transformer();
    protected getUrl: string;

    public views: v.View[]          = [];
    public filters: v.Filter[]      = [];
    public columns: v.Column[]      = [];
    public rows: v.Row[]            = [];
    public actions: v.Action[]      = [];
    public pagination: v.Pagination = {
        small           : null,
        pageSize        : null,
        total           : null,
        pageCount       : null,
        pagerCount      : 11,
        currentPage     : null,
        layout          : 'prev, pager, next',
        pageSizes       : null,
        popperClass     : null,
        prevText        : '<',
        nextText        : '>',
        hideOnSinglePage: true,
        background      : true,
    };


    init(original: s.TableData) {
        this.original                                       = original;
        const { headers, rows, views, filters, pagination } = original;
        this.setColumns(headers)
            .setRows(rows)
            .setViews(views)
            .setFilters(filters)
            .setPagination(pagination);

    }

    get hasSelectors() {
        return this.actions.length > 0;
    }

    mergePagination(pagination: s.Pagination) {
        this.pagination = {
            ...this.pagination,
            ...this.transformer.pagination(pagination),
        };
        return this;
    }


    public setViews(views: s.View[]) {
        this.original.views = views;
        this.views          = views;
        return this;
    }

    public setFilters(filters: s.Filter[]) {
        this.original.filters = filters;
        this.filters          = filters;
        return this;
    }

    public setColumns(headers: s.Header[]) {
        this.original.headers = headers;
        this.columns          = this.transformer.headers(headers);
        return this;
    }

    public setRows(rows: s.Row[]) {
        this.original.rows = rows;
        this.rows          = this.transformer.rows(rows, this.original.headers);
        return this;
    }

    public setActions(actions: s.Action[]) {
        this.original.actions = actions;
        this.actions          = actions;
        return this;
    }

    public setPagination(pagination: s.Pagination) {
        this.original.pagination = pagination;
        this.pagination          = this.transformer.pagination(pagination);
        return this;
    }

    public async setPage(page: number) {
        const res                  = await this.$http.get<{ table: s.TableData }>(`${this.getUrl}?page=${page}`);
        const { rows, pagination } = res.data.table;
        this.setRows(rows)
            .setPagination(pagination);
    }

    public async setView(slug: string) {
        const res                                           = await this.$http.get<{ table: s.TableData }>(`${this.getUrl}?view=${slug}`);
        const { headers, rows, views, filters, pagination } = res.data.table;
        this.setColumns(headers)
            .setRows(rows)
            .setViews(views)
            .setFilters(filters)
            .setPagination(pagination);
    }


}
