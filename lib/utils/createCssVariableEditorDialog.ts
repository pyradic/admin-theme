import { GlobalDialog }                   from './GlobalDialog';
import { CssVariableEditor }              from '../components/css-variable-editor';
import { Dialog }                         from 'element-ui';
import { Application, createKeyListener } from '@pyro/platform';

export const createCssVariableEditorDialog = () => {
    return GlobalDialog.create({
        component      : CssVariableEditor,
        dialogComponent: Dialog,
        dialogData     : {
            props     : {
                title            : 'CSS Variable Editor',
                modalAppendToBody: true,
                closeOnClickModal: false,
                modal            : false,
                width            : '600px',
                customClass      : 'py-css-variable-editor__dialog',
            },
            directives: [
                {
                    name: 'draggable',
                },
            ],
        },
        data           : {
            props: {},
        },
    });

};


export const createCssVariableEditorKeyListener = (code: string, modifiers: { shift?: boolean, alt?: boolean, ctrl?: boolean, } = {}) => {
    let dialog: GlobalDialog.Instance = null;
    return createKeyListener(code, () => {
        if ( dialog ) {
            dialog.close();
            dialog = null;
        } else {
            dialog = createCssVariableEditorDialog();
        }
    }, modifiers);
};

export const bindCssVariableEditor = (app: Application) => {
    return createKeyListener('KeyZ', () => {
        app.root.$modal.show(CssVariableEditor, {}, {
            resizable   : true,
            draggable   : '.py-css-variable-editor__header',
            scrollable  : false,
            reset       : true,
            clickToClose: false,
            height: 700,
            width: 800,
            maxHeight   : window.innerHeight - (window.innerHeight / 10),
            maxWidth    : window.innerWidth - (window.innerWidth / 10),
            title       : 'Alert!',
            buttons     : [
                {
                    title  : 'Deal with it',
                    handler: () => { alert('Woot!'); },
                },
                {
                    title  : '',       // Button title
                    default: true,    // Will be triggered by default if 'Enter' pressed.
                    handler: () => {}, // Button click handler
                },
                {
                    title: 'Close',
                },
            ],
        }, {
            'before-open' : (event) => console.log('before-open', event),
            'before-close': (event) => console.log('before-close', event),
        });
    }, { shift: true, alt: true });
};