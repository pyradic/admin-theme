import { color, deg, em, percent, px, rad, rem, turn, viewHeight, viewWidth } from 'csx';
import { isObject, kindOf }                                                   from '@pyro/platform';

namespace styled {
    export function define(name, callback, options) {

    }

    // export type Theme<DATA> = DATA & {
    //     extend(data):Theme<DATA>
    // }

    const THEME = Symbol.for('theme')
    class Theme<T> {
        constructor(data) {
            const self = this;
        }
        protected units = [ percent, deg, em, px, rad, rem, viewHeight, viewWidth, turn ];

        public transform(){

        }

        protected applyProxy(obj) {
            const self = this;
            Object.defineProperty(obj,THEME,{
                get(): any {
                    return self;
                },
            })

            return new Proxy(obj, {
                get(target: any, p: string | number | symbol, receiver: any): any {

                    let value = Reflect.get(target, p, receiver);

                    // fontSize: [14,px]
                    if ( Array.isArray(value)
                        && value.length === 2
                        && typeof value[ 1 ] === 'function'
                        && self.units.includes(value[ 1 ]) ) {
                        value = value[ 1 ](value[ 0 ]);
                    }


                    if(isObject(value)){

                    }

                    return value;
                },
                set(target: any, p: string | number | symbol, value: any, receiver: any): boolean {
                    return Reflect.set(target, p, value, receiver);
                },
            });
        }


    }

    export function createTheme<DATA extends object>(data: Partial<DATA>): Theme<DATA> {
        const units = [ percent, deg, em, px, rad, rem, viewHeight, viewWidth, turn ];

        function applyProxy(data: DATA) {
            return new Proxy<DATA>(data, {
                get(target: any, p: string | number | symbol, receiver: any): any {

                    let value = Reflect.get(target, p, receiver);
                    if ( Array.isArray(value) && value.length === 2 && typeof value[ 1 ] === 'function' && units.includes(value[ 1 ]) ) {
                        value = value[ 1 ](value[ 0 ]);
                    }

                    return value;
                },
                set(target: DATA, p: string | number | symbol, value: any, receiver: any): boolean {
                    return Reflect.set(target, p, value, receiver);
                },
            });
        }

        return;
    }


    const theme = createTheme({
        fontSize                       : [ 14, px ],
        lineHeight                     : [ 14, px ],
        item: {
            borderLeftColor: color('#0D47A1'),
        },
        item_hovered_border_left_color : color('#0D47A1'),
        item_selected_border_left_color: color('#0D47A1'),
        item_focused_border_left_color : color('#0D47A1'),
    });

}

// variables
namespace theme {
    export const colors     = {};
    export const fonts      = {};
    export const components = {
        menu: {},
    };
}

namespace implement {
    function create(namespace: string) {
        return styled;
    }

    const { define } = create('menu');
// styles
    define('menu', ({ theme, util, is }) => ({
        asdf: {},
    }), {});

    let aer = {
        menu: {
            menu   : ({ theme }) => ([ {
                display      : 'flex',
                flexDirection: 'column',
                margin       : 0,
                padding      : 0,
                listStyle    : 'none',
                fontSize     : theme.v.fontSize,
                lineHeight   : theme.v.lineHeight,
            }, {
                vertical: {
                    $nest: {
                        '.py-menu-item__spacing': { display: 'block' },
                        '.py-menu-item__title'  : { marginRight: 0, flexGrow: 0 },
                    },
                },
            } ]),
            item   : ({ theme, util, is, ctx }) => ([ {
                position: 'relative',
                flexGrow: 1,
                margin  : 0,
                padding : 0,
            }, {
                active  : is({}),
                focused : is('.py-menu-item__content', {
                    borderLeft: `2px solid ${theme.v.item_focused_border_left_color}`,
                }),
                selected: is('.py-menu-item__content', me => ({
                    borderLeft: `2px solid ${theme.v.item_focused_border_left_color}`,
                })),
            } ]),
            icon   : ({ theme, util, is, ctx }) => ({
                fontSize      : '$menu-item-icon-font-size',
                display       : 'flex',
                alignItems    : 'center',
                flex          : '0 0 $menu-item-icon-width',
                justifyContent: 'center',
                marginRight   : '10px',
                textAlign     : 'center',
            }),
            title  : ({ theme, util, is, ctx }) => ({
                fontSize   : '$menu-item-font-size',
                fontWeight : '$menu-item-font-weight',
                display    : 'flex',
                alignItems : 'center',
                marginRight: '30px',
                padding    : '0',
                whiteSpace : 'nowrap',
                textShadow : '$menu-item-text-shadow',
                flexGrow   : '1',
            }),
            content: ({ theme, util, is, ctx }) => ({
                position      : 'relative',
                display       : 'flex',
                alignItems    : 'stretch',
                flexGrow      : '1',
                textDecoration: 'none',
                borderLeft    : '5px solid transparent;',
                outline       : '0',
                color         : 'inherit',
            }),
            arrow  : ({ theme, util, is, ctx }) => ({
                fontSize      : '9px',
                lineHeight    : '0',
                display       : 'none',
                alignItems    : 'center',
                flex          : '0',
                justifyContent: 'center',
                width         : '20px',
                margin        : '0 5px',
                $nest         : {
                    '& i'        : {
                        transition: 'all 0.2s linear',
                    },
                    '& i::before': {
                        content: ' $fa-var-chevron-right',
                    },
                },
            }),
            submenu: ({ theme, util, is, ctx }) => ({}),
        },
    };
    /*

        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        flexGrow: '1',
        textDecoration: 'none',
        borderLeft: '5px solid transparent;',
        outline: '0',
        color: 'inherit',

        fontSize: '$menu-item-font-size',
        fontWeight: '$menu-item-font-weight',
        display: 'flex',
        alignItems: 'center',
        marginRight: '30px',
        padding: '0',
        whiteSpace: 'nowrap',
        textShadow: '$menu-item-text-shadow',
        flexGrow: '1',

        fontSize: '9px',
        lineHeight: '0',
        display: 'none',
        alignItems: 'center',
        flex: '0',
        justifyContent: 'center',
        width: '20px',
        margin: '0 5px',

     */

    define('menu-item', ({ theme, util, is }) => ({
            collapsed: is({}),
            active   : is({}),
            focused  : is('.py-menu-item__content', {
                borderLeft: `2px solid ${theme.v.item_focused_border_left_color}`,
            }),
            selected : is('.py-menu-item__content', me => ({
                borderLeft: `2px solid ${theme.v.item_focused_border_left_color}`,
            })),
        }),
        {}, // options
    );


    namespace components {}


    let s: any;


    let mi = s
        .use('menu');


    mi.is.active;

    mi.collapsed;
    mi.horizontal;
    mi.icon;
}