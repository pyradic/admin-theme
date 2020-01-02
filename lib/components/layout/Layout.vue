<style lang="scss" scoped>
.account-dropdown {
    &__menu {}

    &__item {
        white-space : nowrap;
    }
}
</style>
<template>
    <div :class="classes" :style="style">
        <py-layout-header>
            <slot name="header">
                <py-toolbar
                        :show-title="!sidebar.collapsed"
                        :title-width="sidebar.normalWidth"
                        show-toggle
                        title="CRVS"
                        @toggle-click="toggleSidebarCollapse"
                >
                    <!--                    <slot name="header-toolbar"></slot>-->

                    <py-toolbar-title v-if="!sidebar.collapsed" :width="sidebar.normalWidth" title="CRVS" link="/admin"/>
                    <py-toolbar-toggle/>
                    <py-toolbar-item>
                        <py-menu-demo
                                ref="headerMenuDemo"
                                :max-depth="20"
                                v-if="menus.header && menus.header.children "
                                :items="menus.header.children"
                                :options="{
                                         dropdown:true,
                                         horizontal:true,
                                         slug:'header',
                                     }"/>
                    </py-toolbar-item>
                    <py-toolbar-item spacer/>

                    <slot name="header-shortcuts">
                        <py-shortcut-info/>
                        <py-shortcut
                                v-for="(shortcut, ishortcut) in $root.cp.shortcuts"
                                :key="ishortcut"
                                :highlighted="shortcut.highlighted"
                                :type="shortcut.type || shortcut.attributes.type"
                                :slug="shortcut.slug"
                                :icon="shortcut.icon"
                                :href="shortcut.href"
                                :title="shortcut.title"
                                :label="shortcut.label"
                                :class="shortcut.class"
                                :children="shortcut.children"
                                :attributes="shortcut.attributes"
                        >
                        </py-shortcut>
                        <!--
                        <py-shortcut title="dialog" @click="dialogVisible = true"/>
                        <py-dialog :visible.sync="dialogVisible" append-to-body width="300px">
                            <template v-if="dialogVisible">
                            <py-department-picker />
                            </template>
                        </py-dialog>
                        -->
                        <div class="py-toolbar__item dropdown">
                            <el-dropdown trigger="click" size="small" class="account-dropdown">
                                <a href="javascript:void(0);" data-toggle="dropdown">
                                    <img :src="$root.user.gravatar" width="36" class="rounded-circle">
                                </a>
                                <el-dropdown-menu class="account-dropdown__menu">
                                    <el-dropdown-item class="account-dropdown__item">
                                        <a href="/" target="_blank">
                                            <i class="fa fa-external-link"/> Site
                                        </a>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <a href="/admin/logout">
                                            <i class="fa fa-power-off"/> Logout
                                        </a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <!--
                                                        <a href="javascript:void(0);" data-toggle="dropdown">
                                                            <img :src="$root.user.gravatar" width="36" class="rounded-circle">
                                                        </a>
                                                        <ul class="dropdown-menu-right dropdown-menu">
                                                            <li class="dropdown-item">
                                                                <a href="/" target="_blank">
                                                                    <i class="fa fa-external-link"/> Site
                                                                </a>
                                                            </li>
                                                            <li class="dropdown-item">
                                                                <a href="/admin/logout">
                                                                    <i class="fa fa-power-off"/> Logout
                                                                </a>
                                                            </li>
                                                        </ul>
                            -->
                        </div>
                    </slot>
                </py-toolbar>
            </slot>

        </py-layout-header>
        <div class="py-layout__main">
            <py-layout-sidebar>
                <py-menu-demo
                        ref="sidebarMenuDemo"
                        v-if="menus.sidebar"
                        :items="menus.sidebar"
                        :options="{
                                 horizontal:false,
                                 collapsed: sidebar.collapsed,
                                 slug:'sidebar'
                             }"
                />
            </py-layout-sidebar>
            <!--            <py-layout-sidebar><slot name="sidebar" /></py-layout-sidebar>-->

            <div class="py-layout__content">
                <slot name="breadcrumb"/>

                <template v-if="$slots['messages']">
                    <div class="container-fluid mb-1">
                        <slot name="messages"/>
                    </div>
                </template>

                <py-test-view v-if="showTestView"/>
                <div class="py-layout__inner" v-else>
                    <slot/>
                </div>
            </div>

        </div>

        <py-layout-footer>
            <slot name="footer"/>
        </py-layout-footer>
    </div>
</template>
<script lang="ts">
import Vue                                         from 'vue';
import { component, prop, strEnsureRight, Styles } from '@pyro/platform';
import { styleVars }                               from '../../styling/export';
import { MenuDemo }                                from '../menu';
import { Dialog }                                  from 'element-ui';

const noDelimiter = { replace: function () {} };
@component({
    provide() {
        return {
            layout: this,
        };
    },
    components: {
        [Dialog.name]:Dialog
    },
})
export default class Layout extends Vue {
    @prop.classPrefix('layout') classPrefix: string;
    $refs: { headerMenuDemo: MenuDemo, sidebarMenuDemo: MenuDemo };

    get classes() {
        return {
            [ this.classPrefix ]: true,
        };
    }

    dialogVisible = false

    get style(): Styles {
        return {};
    }

    get showTestView() {
        return location.search === '?test';
    }

    sidebar   = {
        collapsed     : false,
        collapsedWidth: styleVars.get('layout-sidebar-collapse-width'),
        normalWidth   : styleVars.get('layout-sidebar-width'),
        get width() {
            return strEnsureRight((this.collapsed ? this.collapsedWidth : this.normalWidth), 'px');
        },
    };
    styleVars = styleVars; //ssssssss{ ...styleVars.raw() }

    created() {
        this.$py.instance('layout', this);
        this.$root[ 'setLayout' ](this);
        this.sidebar.collapsed = this.$py.cookies.has('layout.sidebar.collapsed');
    }

    mounted() {
        this.$log('mounted', 'sidebar menu', this?.$refs?.sidebarMenuDemo?.menu);

        this.$py.menus.setupDefaultMenuBehaviour(this.$refs.sidebarMenuDemo.menu);
        this.$py.menus.setupDefaultMenuBehaviour(this.$refs.headerMenuDemo.menu);
    }

    get menus() {
        return {
            sidebar: Object.values(this.$py.data.cp.structure),
            header : this.$py.data?.menus?.admin_header,
            footer : this.$py.data?.menus?.admin_footer,
        };
    }

    toggleSidebarCollapse() {
        this.sidebar.collapsed = !this.sidebar.collapsed;
        if ( this.sidebar.collapsed ) {
            this.$py.cookies.set('layout.sidebar.collapsed', this.sidebar.collapsed);
        } else {
            this.$py.cookies.unset('layout.sidebar.collapsed');
        }
        this.$py.events.emit('layout:sidebar:toggle');
    }
}
</script>