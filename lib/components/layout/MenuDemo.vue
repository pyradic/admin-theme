<template>

    <py-menu v-bind="$props">
        <template v-for="(item, itemIndex) of items">
            <py-menu-item
                    :type="item.type"
            >{{ item.title }}
            </py-menu-item>
        </template>
        <py-menu-item>Title 2</py-menu-item>
        <py-menu-item>Title 3</py-menu-item>
        <py-menu-item>
            Title 4
            <py-menu-submenu slot="submenu">
                <py-menu-item>Title 4.1</py-menu-item>
                <py-menu-item>Title 4.2</py-menu-item>
                <py-menu-item>Title 4.3</py-menu-item>
                <py-menu-item>
                    Title 4.4
                    <py-menu-submenu slot="submenu">
                        <py-menu-item>Title 4.4.1</py-menu-item>
                        <py-menu-item>Title 4.4.2</py-menu-item>
                        <py-menu-item>Title 4.4.3</py-menu-item>
                    </py-menu-submenu>
                </py-menu-item>
                <py-menu-item>Title 4.5</py-menu-item>
                <py-menu-item>Title 4.6</py-menu-item>
            </py-menu-submenu>
        </py-menu-item>
        <py-menu-item>Title 5</py-menu-item>
        <py-menu-item>Title 6</py-menu-item>
    </py-menu>
</template>
<script lang="ts">
import { Component, component, Platform } from '@pyro/platform';
import Menu from '../menu/Menu.vue';
import StructureNavigtion = Platform.StructureNavigtion;

@component()
class MenuDemo extends Component {
    items: StructureNavigtion[] = []

    created() {
        this.items = Object.values(this.$py.data.cp.structure);
    }

}

export default MenuDemo.extend({ props: Menu.options.props })
</script>