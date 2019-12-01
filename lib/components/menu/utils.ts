import { MenuItemNode } from './MenuItemNode';

export function mapNodeStateObservableToTarget<NODE extends MenuItemNode,
    TARGET extends any>(node: NODE, component: TARGET, map: Partial<Record<keyof NODE['_state'], keyof TARGET>>) {
    return node.observe(change => {
        let name = change.name.toString();
        if ( name in map ) {
            component[ map[ name ] ] = change.newValue;
        }
    });
}
