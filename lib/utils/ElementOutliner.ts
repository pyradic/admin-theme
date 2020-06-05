
import { BackgroundProperty, ColorProperty, Position } from 'csstype';
import { isString }                                    from '@crvs/platform';

export interface ElementOutlinerConfigItem  {
    label: string,
    labelPosition: string|Record<Position<any>,number|string>,
    colors: [ BackgroundProperty<any>, ColorProperty ],
    selectors: string,
// els:NodeListOf<HTMLElement>
}
export interface ElementOutlinerConfig extends Record<string, ElementOutlinerConfigItem> {

}
export class ElementOutliner {
    public isCreated = false
    constructor(public readonly config:ElementOutlinerConfig) {}

    protected previewElements: Record<string, JQuery> = {};

    create() {
        window.scrollTo(0,0)
        Object.entries(this.config).forEach(([ key, val ]) => {
            const $els                  = $(val.selectors).map(function () {
                let [ bg, fg ]         = val.colors;
                let h                  = this.getBoundingClientRect();
                let $el                = $(document.createElement('div'))
                    .appendTo(document.body)
                    .css({
                        position: 'absolute',
                        top     : h.top,
                        width   : h.width,
                        height  : h.height,
                        left    : h.left,
                        border  : '1px dashed ' + bg,
                        display : 'block',
                    });
                let labelPosition: any = isString(val.labelPosition) ?
                                         val.labelPosition.split(' ').reduce((obj, str, index) => {
                                             obj[ str ] = 0;
                                             return obj;
                                         }, {}) :
                                         val.labelPosition;

                let $label = $(document.createElement('div'))
                    .appendTo($el)
                    .css({
                        ...labelPosition,
                        position  : 'absolute',
                        padding   : '3px 10px',
                        background: bg,
                        color     : fg,
                        'white-space': 'nowrap'
                    })
                    .text(val.label);
                return $el.get(0);
            });
            this.previewElements[ key ] = $els;
        });
        this.isCreated = true;
        return this;
    }

    destroy() {
        Object.entries(this.previewElements).forEach(([ key, val ]) => {
            val.remove();
        });
        this.previewElements = {};
        this.isCreated = false;
        return this;
    }
}

