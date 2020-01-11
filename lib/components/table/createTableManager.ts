import { StreamsTable as s } from './interfaces';
import { TableManager }      from './TableManager';


export const createTableManager = (getUrl: string) => {
    return new TableManager({
        getUrl:getUrl,
        created(this: TableManager) {
            this.$log('created TableManager')
            this.getUrl=getUrl;
        },
    });
};