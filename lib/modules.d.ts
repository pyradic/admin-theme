// noinspection ES6UnusedImports
import platform        from '@crvs/platform';
import { MenuManager } from './components/menu/MenuManager';

// noinspection ES6UnusedImports
declare module '@crvs/platform/lib/classes/Application' {

    interface Application {
        menus: MenuManager
    }

    // interface Styling extends AdminThemeStyleVariables {}
}

declare module 'element-ui/element-ui' {
    interface Table {
        /** used in multiple selection Table, clear user selection    — */
        clearSelection()

        /** used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected    row, selected */
        toggleRowSelection(row, selected)

        /** used in multiple selection Table, toggle the selected state of all rows    - */
        toggleAllSelection()

        /** used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed    row, expanded */
        toggleRowExpansion(row, expanded)

        /** used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection.    row */
        setCurrentRow(row)

        /** clear sorting, restore data to the original order    — */
        clearSort()

        /** clear filters of the columns whose columnKey are passed in. If no params, clear all filters    columnKeys */
        clearFilter(columnKeys)

        /** refresh the layout of Table. When the visibility of Table changes, you may need to call this method to get a correct layout    — */
        doLayout()

        /** sort Table manually. Property prop is used to set sort column, property order is used to set sort order    prop: string, order: string */
        sort(prop: string, order: string)
    }
}