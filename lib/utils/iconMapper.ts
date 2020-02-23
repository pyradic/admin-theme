import { IconMap, IconMapper } from '../interfaces';

export const iconMapper = (map: IconMap): IconMapper => (name: string, target: string, icon: string) => {
    if ( name === '*' ) {
        let names = Object.keys(map);
        let icons = names.map(name => {
            if ( name in map && target in map[ name ] && icon in map[ name ][ target ] ) {
                return map[ name ][ target ][ icon ];
            }
        }).filter(String);
        if ( icons.length > 0 ) {
            return icons[ 0 ];
        }
    }
    if ( name in map && target in map[ name ] && icon in map[ name ][ target ] ) {
        return map[ name ][ target ][ icon ];
    }
    return icon;
};
