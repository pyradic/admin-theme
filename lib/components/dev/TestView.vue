<style lang="scss">
.pop {
    margin-top: 300px;
}
.selected {
    font-weight: bold;
}
.selections {
    border: 1px solid black;
    width: 300px;
}
</style>
<template>
    <div :class="classes" :style="style">
        <py-pop class="pop" :grow="grow" />
        <ul class="selections">
            <li v-for="(position,placement) in grows"
                :key="placement"
                :class="{'selected': placement === grow}"
                @click="grow = placement"
            >{{placement}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles } from '@pyro/platform';
import Vue                                    from 'vue';
import { placements }                         from './utils';

@component()
export default class TestView extends Component {
    @prop.classPrefix('test-view') classPrefix: string;

    grow='down-then-left'
    grows=placements

    get classes() {
        return {
            [ this.classPrefix ]: true,
        };
    }

    get style(): Styles {
        return {};
    }
}
</script>