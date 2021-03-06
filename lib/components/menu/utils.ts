import { MenuItemNode } from './MenuItemNode';
import { Grows }        from './interfaces';

export function mapNodeStateObservableToTarget<NODE extends MenuItemNode,
    TARGET extends any>(node: NODE, component: TARGET, map: Partial<Record<keyof NODE['_state'], keyof TARGET>>) {
    return node.observe(change => {
        let name = change.name.toString();
        if ( name in map ) {
            component[ map[ name ] ] = change.newValue;
        }
    });
}
export const grows: Grows = {
    'auto':['auto','auto'],
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


