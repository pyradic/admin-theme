import { ComponentIconReplacer, IconMapper } from '../interfaces';
import { cash as $ }                         from '@pyro/platform';

export const componentIconReplacer = (mapper: IconMapper): ComponentIconReplacer => (component) => component.$nextTick(() => {
    const els = document.querySelectorAll('[class^="el-icon-"]');
    $('[class^="el-icon-"]').each((index, el) => {
        let $el       = $(el);
        let className = Array.from(el.classList).find(className => className.startsWith('el-icon-'));
        if ( $el.hasClass('mdi') && className ) {
            let icon = mapper('el', 'mdi', className.replace('el-icon-', ''));
            $el.removeClass(className);
            $el.ensureClass('el-icon-');
            $el.ensureClass('mdi');
            $el.ensureClass('mdi-' + icon);
        }
    });
    $('[class^="mdi-"]').each((i, el) => {
        let $el = $(el);
        $el.ensureClass('el-icon-');
        $el.ensureClass('mdi');
    });
    $('i').each((i, el) => {
        let $el = $(el);
        let className = Array.from(el.classList).find(className => className.startsWith('el-icon-'));
        if ( !$el.hasClass('mdi') && !$el.hasClass('el-icon-') && !$el.hasClass('fa') ) {
            let icon=el.className
            if(className){
                icon = mapper('el', 'mdi', className.replace('el-icon-', ''));
                $el.removeClass(className);
            }
            $el.ensureClass('el-icon-');
            $el.ensureClass('mdi');
            $el.ensureClass('mdi-' + icon);
        }
    });
});