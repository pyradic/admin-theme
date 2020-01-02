<!--
<template>
  <i :class="'el-icon-' + name"></i>
</template>
-->
<script lang="ts">
import { IconMapper, IconRenderer } from '../../interfaces';
import { RenderContext }            from 'vue/types/options';
import { CreateElement }            from 'vue';

export default {
    name : 'ElIcon',
    props: {
        name : String,
        vdata: Object,
    },
    render(h: CreateElement, context: RenderContext) {
        let renderer: IconRenderer = this.$py.get('icon.renderer');
        let mapper: IconMapper     = this.$py.get('icon.mapper');
        let data                   = this.vdata || {};
        let icon                   = this.name;
        if ( !icon ) {return null;}
        data.class = data.class || {};

        let mapperName = 'el';
        let mapperIconName = icon;
        let hasName = (name,toName?:string)  => {
            if(icon.includes(name)) {
                mapperName = toName ? toName : name;
                let exp=new RegExp(name+'(.*)','');
                let matches=icon.match(exp);
                if(matches.index === 3){
                    mapperIconName = matches[1]
                }
                this.$log('render hasName', icon,name, matches)
                return true;
            }
            return false;
        };
        hasName('fa-','fa') || hasName('el-icon-', 'el')
        if(mapperName && mapperIconName){
            icon = mapper(mapperName, 'mdi', mapperIconName)
            this.$log('render hasMapper icon', mapperName,mapperIconName, icon)
        }

        // mapper();
        if ( icon.includes('fa-') ) {
            icon = icon.replace('fa-', '');
        }
        if ( icon.includes('fa ') ) {
            icon = icon.replace('fa ', '');
        }
        if ( icon.includes('el-icon-') ) {
            icon = icon.replace('el-icon-', '');
        }
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

        let rendered = h(data.tag || 'i', data);
        this.$log(this.name, { data, me: this, context, rendered });
        // let rendered= renderer(h, this.name, data);
        return rendered;
    },
};
</script>
