import { component, prop } from '@pyro/platform';
import Vue from 'vue';

import styled from 'vue-styled-components'

const ToolbarElement = styled.div`

`
styled('button', { sdf: Boolean })`

`
const ToolbarElementExtended = ToolbarElement.extend``


@component()//{components:{ToolbarElement}})
export default class _Toolbar extends Vue {
    @prop.classPrefix('toolbar') classPrefix: string

    get classes() {
        return {
            [ this.classPrefix ]: true
        }
    }

    mounted() {
        window[ 'py_toolbar' ] = this;
    }

    render(h) {
        const { classes, $slots } = this
        this.$log('render', { me: this, classes, $slots })



        return (
            <ToolbarElement>

                {$slots.default}
            </ToolbarElement>
        )
    }
}