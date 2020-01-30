import { CreateElement, VNodeData } from 'vue';
import { IconMapper, IconRenderer } from '../interfaces';

export const iconRenderer = (mapper: IconMapper): IconRenderer => (h: CreateElement, icon: string, data: VNodeData = {}) => {
    // console.log('icon.renderer', icon, { icon, data, h });
    if ( !icon ) {return null;}
    data.class = data.class || {};
    if ( icon.includes('fa-') ) {
        icon = icon.replace('fa-', '');
    }
    if ( icon.includes('fa ') ) {
        icon = icon.replace('fa ', '');
    }
    if ( icon.includes('el-icon-') ) {
        icon = icon.replace('el-icon-', '');
    }
    icon = mapper('fa', 'mdi', icon);
    // if ( !icon.startsWith('mdi ') ) {
    //     if ( icon.startsWith('mdi-') ) {
    //         icon = 'mdi ' + icon
    //     } else {
    //         icon = 'mdi mdi-' + icon
    //     }
    // }
    data.class.mdi              = true;
    data.class[ 'mdi-' + icon ] = true;
    data.class[ 'el-icon-' ]    = true;
    return h(data.tag || 'i', data);
};