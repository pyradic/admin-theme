import { styled }                                                             from '@crvs/platform';
import { color, deg, em, percent, px, rad, rem, turn, viewHeight, viewWidth } from 'csx';


export namespace menuTheme {
    const vars         = {
        fontSize                       : [ 14, px ],
        lineHeight                     : [ 14, px ],
        item_hovered_border_left_color : color('#0D47A1'),
        item_selected_border_left_color: color('#0D47A1'),
        item_focused_border_left_color : color('#0D47A1'),
    };
    export const units = [ percent, deg, em, px, rad, rem, viewHeight, viewWidth, turn ];
    export const v     = new Proxy(vars, {
        get(target: typeof vars, p: string | number | symbol, receiver: any): any {
            let value = Reflect.get(target, p, receiver);
            if ( Array.isArray(value) && value.length === 2 && typeof value[ 1 ] === 'function' && units.includes(value[ 1 ]) ) {
                value = value[ 1 ](value[ 0 ]);
            }
            return value;
        },
        set(target: typeof vars, p: string | number | symbol, value: any, receiver: any): boolean {
            return Reflect.set(target, p, value, receiver);
        },
    });
}
export const styles = styled(({ theme, util }) => ({
    menu                    : me => ({
        display      : 'flex',
        flexDirection: 'column',
        margin       : 0,
        padding      : 0,
        listStyle    : 'none',
        fontSize     : theme.v.fontSize,
        lineHeight   : theme.v.lineHeight,
    }),
    'item'             : me => ({
        position: 'relative',
        flexGrow: 1,
        margin  : 0,
        padding : 0,
    }),
    'item_is-hidden'   : me => ({
        display: 'none',
    }),
    'item_is-expanded'   : {
        $nest: {
            '& .py-menu-item__content > .py-menu-item__arrow': {
                transform : 'rotate(90deg)',
            },
        },
    },
    'item_is-hovered'  : {
        $nest: {
            '& > .py-menu-item__content': {
                borderLeftColor: theme.v.item_hovered_border_left_color.toHexString(),
            },
        },
    },
    'item_is-selected' : {
        $nest: {
            '& .py-menu-item__content': {
                borderLeft: `5px solid ${theme.v.item_selected_border_left_color}`,
            },
        },
    },
    'item_is-focused'  : {
        $nest: {
            '& .py-menu-item__content': {
                borderLeft: `2px solid ${theme.v.item_focused_border_left_color}`,
            },
        },
    },
    'item_has-children': {
        $nest: {
            '& .py-menu-item__content > .py-menu-item__arrow': {
                display: 'flex',
            },
        },
    },
}), menuTheme);

// nested('has-children', '.py-menu-item__content > .py-menu-item__arrow', {
//     display: flex
// })

/*

// > __content
.#{$menu-item-prefix}__content {
    //@include e(content) {
    position        : 'relative',
    display         : 'flex',
    align-items     : 'stretch',
    flex-grow       : '1',
    text-decoration : 'none',
    border-left     : '5px solid transparent',
    outline         : 0,
    color           : 'inherit',

    &:hover, &:focus, &:active {
        text-decoration : none;
        outline         : 0;
        color           : inherit;
    }

    &:hover {
        text-decoration : none;
        color           : inherit;
    }
}

// > __content > 1: __icon
.#{$menu-item-prefix}__icon {
    font-size       : $menu-item-icon-font-size;
    display         : flex;
    align-items     : center;
    flex            : 0 0 $menu-item-icon-width;
    justify-content : center;
    margin-right    : 10px;
    text-align      : center;
}

// > __content > 2: __title
.#{$menu-item-prefix}__title {
    font-size    : $menu-item-font-size;
    font-weight  : $menu-item-font-weight;
    display      : flex;
    align-items  : center;
    margin-right : 30px;
    padding      : 0;
    white-space  : nowrap;
    text-shadow  : $menu-item-text-shadow;
    flex-grow    : 1;
}

// > __content > 3: __spacing
.#{$menu-item-prefix}__spacing {
    flex-grow : 1;
    display   : none; // --vertical
}

// > __content > 4: __arrow
.#{$menu-item-prefix}__arrow {
    font-size       : 9px;
    line-height     : 0;
    display         : none;
    align-items     : center;
    flex            : 0; // 0 20px;
    justify-content : center;
    width           : 20px;
    margin          : 0 5px;

    i {
        transition : all 0.2s linear;
        @include fa-icon();

        &:before {
            content : $fa-var-chevron-right
        }
    }
}

    $content  : #{$menu-item-prefix}__content;

    // states
    &.is-hidden {
        display : none;
    }

    &.is-hovered {
        > #{$self}__content { border-left-color : #1A237E; }
    }

    &.is-selected {
        > #{$self}__content { border-right : 5px solid #1471A1; }
    }

    &.is-focused {
        > #{$self}__content { border-left : 2px solid #0D47A1; }
    }

    &.is-active {

    }

    &.has-children {
        > #{$self}__content > #{$self}__arrow {display : flex; }
    }

 */