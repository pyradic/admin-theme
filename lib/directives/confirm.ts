import { DirectiveOptions } from 'vue';

import { MessageBox } from 'element-ui';

export const Confirm: DirectiveOptions = {
    bind            : (el, binding, vnode, oldVnode) => {
        const { name, arg, modifiers, expression, oldArg, oldValue, value } = binding;
        console.log({ name, arg, modifiers, expression, oldArg, oldValue, value });
        el[ '__confirm_click' ] = async (event: MouseEvent) => {
            event.preventDefault();
            MessageBox.confirm(value.question || 'Weet u zeker dat u deze actie wilt uitvoeren?', value.title || 'Bevestigen', {
                type: 'warning',
            }).then(() => {
                const url = el.getAttribute(arg || 'href');
                console.log('Delete it', { arg, url });
                window.location.href = url;
            }).catch(() => {
                console.log('do nothing');
            });
        };
        el.addEventListener('click', el[ '__confirm_click' ]);
    },
    componentUpdated: (el, binding, vnode, oldVnode) => {},
    inserted        : (el, binding, vnode, oldVnode) => {},
    unbind          : (el, binding, vnode, oldVnode) => {
        el.removeEventListener('click', el[ '__confirm_click' ]);
    },
    update          : (el, binding, vnode, oldVnode) => {},
};