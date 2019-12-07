<style lang="scss">
.pop {
    margin-top : 300px;
}

.selected {
    font-weight : bold;
}

.selections {
    border : 1px solid black;
    width  : 300px;
}

.content {
    border : 1px solid black;
    width  : 300px;

}
</style>
<template>
    <div :class="classes" :style="style">
        <py-pop class="pop" :grow="grow"/>
        <ul class="selections">
            <li v-for="(position,placement) in grows"
                :key="placement"
                :class="{'selected': placement === grow}"
                @click="grow = placement"
            >{{placement}}
            </li>
        </ul>
        <div class="content" ref="content"></div>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles } from '@pyro/platform';
import Vue                                    from 'vue';
import { placements }                         from './utils';

@component()
export default class TestView extends Component {
    @prop.classPrefix('test-view') classPrefix: string;
    $refs: { content: HTMLElement };
    grow  = 'down-then-left';
    grows = placements;

    get classes() {
        return {
            [ this.classPrefix ]: true,
        };
    }

    get style(): Styles {
        return {};
    }

    setNewStuff() {
        let template                      = `
        <ul class="selections">
            <li v-for="(position,placement) in grows"
                :key="placement"
                :class="{'selected': placement === grow}"
                @click="grow = placement"
            >{{placement}}</li>
        </ul>
        `;
        const { staticRenderFns, render } = (Vue.compile as any)(template, {}, this.$vnode);
        // const {staticRenderFns,render}=Vue.compile(template);
        const self                        = this;
        const newStuff                    = new Vue({
            data() {
                return self.$data; // {grow:self.grow, grows:self.grows};
            },
            render, staticRenderFns,
        });
        newStuff.$mount(this.$refs.content);
    }
}
</script>