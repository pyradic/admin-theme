import { StreamsTable as s, VueTable as v } from './interfaces';


export class Transformer {

    pagination(pagination: s.Pagination): v.Pagination {
        return {
            currentPage: parseInt(pagination.current_page.toString()),
            pageSize   : parseInt(pagination.per_page.toString()),
            total      : parseInt(pagination.total.toString()),
        };
    }

    headers(headers: s.Header[]):v.Column[]{
        return  headers.map<v.Column>(h => ({
            sortable  : h.sortable,
            sortOrders: h.direction ? [ h.direction + 'ending' as any ] : null,
            label     : h.heading,
            prop      : h.field,
        }));
    }

    rows(rows: s.Row[], headers:s.Header[]):v.Row[]{
        return rows.map((r) => {
            let row: Record<string, any> = {};
            r.columns.forEach((c, ci) => {
                row[ headers[ ci ].field ] = c.value;
            });
            return row;
        });
    }



}