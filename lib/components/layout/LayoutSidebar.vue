<template>
    <el-aside width="200px" :class="classes" :width="layout.sidebar.width">
        <el-menu
                :default-active="activeMenuItem"
                :class="menuClasses"
                background-color="#333"
                text-color="#ffffff"
                :collapse-transition="false"
                unique-opened
                :collapse="layout.sidebar.collapsed"
                ref="menu"
        >
            <slot></slot>
        </el-menu>
    </el-aside>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, inject, prop } from '@pyro/platform';
    import Layout from './Layout.vue';
    import { Menu, MenuItem } from 'element-ui';

    type IMenu = Menu & {
        items: { [ index: string ]: MenuItem }
    }
    @component()
    export default class LayoutSidebar extends Vue {
        $refs: { menu: IMenu }
        @inject() layout: typeof Layout.prototype
        @prop.classPrefix('layout__sidebar') classPrefix:string

        get classes(){
            return {
                [this.classPrefix]: true,
                [`${this.classPrefix}--collapse`]: this.layout.sidebar.collapsed
            }
        }

        get menuClasses(){
            return {
                [`${this.classPrefix}-menu`]: true,
                [`${this.classPrefix}-menu--collapse`]: this.layout.sidebar.collapsed
            }
        }

        get sidebarWidth() {
            return this.layout.sidebar.collapsed ? '64px' : '200px';
        }

        mounted() {
            this.$log('mounted', { menu: this.menu, menuItems: this.menu.items })
            this.menu.$on('item-click', (item: MenuItem) => {
                this.$log('item-click', { item })
                if ( 'href' in item.$attrs ) {
                    window.location.href = item.$attrs.href;
                }
            })
        }

        get activeMenuItem() {
            let namespace = this.$py.data.get('module.namespace').replace(/\./g, '_')
            let slug      = this.$py.data.get('section.slug')
            return `${namespace}.${slug}`
        }

        get menu(): IMenu {
            return this.$refs.menu
        }
    }
</script>