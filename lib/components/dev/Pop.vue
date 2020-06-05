<style lang="scss">

.py-pop {
    margin           : 20px auto;
    border           : 2px solid midnightblue;
    padding          : 5px;

    display          : flex;
    max-width        : 50%;
    background-color : #5A5A5A;
    color            : #9B9B9B;

    > .py-pop__item {
        padding : 10px;
        height  : inherit;

        &:hover {
            background-color : rgba(255, 255, 255, 0.1);
        }
    }
}
</style>
<template>
    <div :class="classes" :style="style">
        <py-pop-item>Item 1 Content</py-pop-item>
        <py-pop-item>Item 2 Content</py-pop-item>
        <py-pop-item>
            Item 3 Contents
            <template slot="submenu">
                <py-pop-item>Item 3.1 Content</py-pop-item>
                <py-pop-item>Item 3.2 Content</py-pop-item>
                <py-pop-item>
                    Item 3.3 Contents
                    <template slot="submenu">
                        <py-pop-item>Item 3.3.1 Content</py-pop-item>
                        <py-pop-item>Item 3.3.2 Content</py-pop-item>
                    </template>
                </py-pop-item>
                <py-pop-item>
                    Item 3.4 Contents
                    <template slot="submenu">
                        <py-pop-item>Item 3.4.1 Content</py-pop-item>
                        <py-pop-item>Item 3.4.2 Content</py-pop-item>
                        <py-pop-item>
                            Item 3.4.3 Contents-
                            <template slot="submenu">
                                <py-pop-item>Item 3.4.3.1 Content</py-pop-item>
                                <py-pop-item>Item 3.4.3.2 Content</py-pop-item>
                            </template>
                        </py-pop-item>
                        <py-pop-item>
                            Item 3.4.4 Contents
                            <template slot="submenu">
                                <py-pop-item>Item 4 Content</py-pop-item>
                                <py-pop-item>Item 5 Content</py-pop-item>
                                <py-pop-item>
                                    Item 3.1 Content
                                    <template slot="submenu">
                                        <py-pop-item>Item 3.1.1 Content</py-pop-item>
                                        <py-pop-item>Item 3.1.2 Content</py-pop-item>
                                    </template>
                                </py-pop-item>
                                <py-pop-item>Item 4 Content</py-pop-item>
                                <py-pop-item>Item 5 Content</py-pop-item>
                            </template>
                        </py-pop-item>
                        <py-pop-item>Item 5 Content</py-pop-item>
                    </template>
                </py-pop-item>
                <py-pop-item>Item 5 Content</py-pop-item>
            </template>
        </py-pop-item>
        <py-pop-item>Item 4 Content</py-pop-item>
        <py-pop-item>Item 5 Content</py-pop-item>
    </div>
</template>
<script lang="ts">
import { Component, component, prop, Styles } from '@crvs/platform';
import Vue                                    from 'vue';
import PopItem                                from './PopItem.vue';

Vue.component('py-pop-item', PopItem);

@component({
    provide() {
        return {
            root: this,
        };
    },
})
export default class Pop extends Component {
    @prop.classPrefix('pop') classPrefix: string;
    @prop.string() grow;

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