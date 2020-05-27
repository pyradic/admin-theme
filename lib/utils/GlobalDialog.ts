import Vue, { VNodeData, VueConstructor }        from 'vue';
import { app, merge }                            from '@pyro/platform';
import { DialogSlots, ElDialog }                 from 'element-ui/types/dialog';
import { AsyncComponent, AsyncComponentPromise } from 'vue/types/options';
import { Dialog }                                from '../components/dialog';

export namespace GlobalDialog {

    export interface Options {
        component?: AsyncComponent|VueConstructor
        data?: VNodeData
        dialogComponent?:AsyncComponent|VueConstructor,
        dialogData?: VNodeData & { props?: Partial<DialogProps> }
    }

    export type Instance = Vue & {
        $refs: { dialog: ElDialog & { hide: (cancel: boolean) => void } }
        close()
    }

    export const create = (options: Options = {}): Instance => {

        const node = document.createElement('div');
        document.body.appendChild(node);

        let vm = new Vue({
            el    : node,
            parent: app.root,

            render(h) {
                options.dialogComponent = options.dialogComponent ?? Dialog;
                options.dialogData = merge({
                    props: {
                        // beforeClose(() => ({})),
                        visible           : true,
                        modalAppendToBody : true,
                        closeOnClickModal : true,
                        closeOnPressEscape: true,
                        destroyOnClose    : true,
                    },
                }, options.dialogData || {}, { ref: 'dialog' });
                options.data       = merge({}, options.data || {}, {});
                return h(options.dialogComponent, options.dialogData, [
                    h(options.component, options.data),
                ]);
            },
            computed: {
                dialog(): ElDialog & { hide: (cancel: boolean) => void } {
                    return this.$refs.dialog;
                },
            },
            methods : {
                close() {
                    this.$refs.dialog.hide(true);
                    this.$refs.dialog.$el.remove();
                    this.$refs.dialog.$destroy();
                    this.$el.remove();
                    this.$destroy();
                },
            },
        }) as Instance;

        return vm;
    };

    interface DialogProps {
        /** Title of Dialog */
        title: string

        /** Width of Dialog */
        width: string

        /** Whether the Dialog takes up full screen */
        fullscreen: boolean

        /** Value for margin-top of Dialog CSS */
        top: string

        /** Whether a mask is displayed */
        modal: boolean

        /** Whether to append modal to body element. If false, the modal will be appended to Dialog's parent element */
        modalAppendToBody: boolean

        /** Whether scroll of body is disabled while Dialog is displayed */
        lockScroll: boolean

        /** Custom class names for Dialog */
        customClass: string

        /** Whether the Dialog can be closed by clicking the mask */
        closeOnClickModal: boolean

        /** Whether the Dialog can be closed by pressing ESC */
        closeOnPressEscape: boolean

        /** Whether to show a close button */
        showClose: boolean

        /** Callback before Dialog closes, and it will prevent Dialog from closing */
        beforeClose: (done: Function) => void

        /** Whether to align the header and footer in center */
        center: boolean

        /** Whether to destroy elements in Dialog when closed */
        destroyOnClose: boolean

        $slots: DialogSlots
    }

}