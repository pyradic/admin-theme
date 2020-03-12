<template>
    <div :class="classes" :style="style">
        <template v-for="(type,itype) in types">
            <template v-for="(message,imessage)  in messages[type]">
                <el-alert
                        :type="convertType(type)"
                        :title="message"
                        effect="dark"
                        show-icon
                        closable
                />
            </template>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles } from '@pyro/platform';
import { IMessages, IMessageType }            from './interfaces';

@component()
export default class Messages extends Component {
    @prop.classPrefix('messages') classPrefix: string;
    @prop.object({}) messages: IMessages;

    get types(): IMessageType[] { return Object.keys(this.messages) as any;}

    get classes() {return { [ this.classPrefix ]: true }; }

    get style(): Styles { return {}; }

    convertType(type: IMessageType) {
        let conversions = {
            'info'     : 'info',
            'warning'  : 'warning',
            'error'    : 'error',
            'success'  : 'success',
            'important': 'warning',
        };
        return conversions[type]
    }
}
</script>