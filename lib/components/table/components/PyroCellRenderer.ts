import { ICellRendererComp, ICellRendererParams, IAfterGuiAttachedParams } from "@ag-grid-community/all-modules";
import debug from "debug";

const log = debug('admin-theme:table:components:pyro-cell-renderer');

export class PyroCellRenderer implements ICellRendererComp {
    el:HTMLElement
    public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
        log('afterGuiAttached', {me:this, params})
    }

    public destroy(): void {
        log('destroy', {me:this})

    }

    public getGui(): HTMLElement {
        return this.el;
    }

    public init(params: ICellRendererParams) {
        this.el = document.createElement('div')
        this.el.innerHTML = params.value;
        log('init', {me:this, params})
    }

    public refresh(params: any): boolean {
        log('refresh', {me:this, params})
        return false;
    }

}