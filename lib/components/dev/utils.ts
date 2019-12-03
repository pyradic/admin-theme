import Popper from 'popper.js';

export type PopDir =
    | 'up-then-left'
    | 'up-then-right'
    | 'down-then-left'
    | 'down-then-right'
    | 'left-then-up'
    | 'left-then-down'
    | 'right-then-up'
    | 'right-then-down'

export type PopDirs = Record<PopDir, [ Popper.Position, Popper.Placement ]>

export const placements: PopDirs = {
    'up'             : [ 'top', 'auto' ],
    'up-then-left'   : [ 'top', 'left-end' ],
    'up-then-right'  : [ 'top', 'right-end' ],
    'down'           : [ 'bottom', 'auto' ],
    'down-then-left' : [ 'bottom', 'left-start' ],
    'down-then-right': [ 'bottom', 'right-start' ],
    'left-then-up'   : [ 'left', 'left-end' ],
    'left-then-down' : [ 'left', 'left-start' ],
    'left'           : [ 'left', 'auto' ],
    'right'          : [ 'right', 'auto' ],
    'right-then-up'  : [ 'right', 'right-end' ],
    'right-then-down': [ 'right', 'right-start' ],
};


