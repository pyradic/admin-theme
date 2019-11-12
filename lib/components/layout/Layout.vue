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
                    <slot name="header-toolbar"></slot>
                    <slot name="header-shortcuts">
                        <py-toolbar-item spacer></py-toolbar-item>
                        <py-shortcut-info></py-shortcut-info>
                        <py-shortcut
                                v-for="(shortcut, ishortcut) in $root.cp.shortcuts"
                                :key="ishortcut"
                                :highlighted="shortcut.highlighted"
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
                        <div class="py-toolbar__item dropdown">
                            <a href="javascript:void(0);" data-toggle="dropdown">
                                <img :src="$root.user.gravatar" width="36" class="rounded-circle">
                            </a>
                            <ul class="dropdown-menu-right dropdown-menu">
                                <li class="dropdown-item">
                                    <a href="/" target="_blank">
                                        <i class="fa fa-external-link"></i> Site
                                    </a>
                                </li>
                                <li class="dropdown-item">
                                    <a href="/admin/logout">
                                        <i class="fa fa-power-off"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </slot>
                </py-toolbar>
            </slot>

        </py-layout-header>
        <div class="py-layout__main">
            <py-layout-sidebar>
                <slot name="sidebar"></slot>
            </py-layout-sidebar>

            <div class="py-layout__content">
                <slot name="breadcrumb"></slot>

                <template v-if="$slots['messages']">
                    <div class="container-fluid mb-1">
                        <slot name="messages"></slot>
                    </div>
                </template>

                <div class="py-layout__inner">
                    <slot></slot>
                </div>
            </div>

        </div>
        <py-layout-footer>
            <slot name="footer"></slot>
        </py-layout-footer>
        <!--
        <el-container>
            <py-layout-sidebar>
                <slot name="sidebar"></slot>
            </py-layout-sidebar>
            <el-container>
                <el-main class="py-layout__main">
                    <slot name="main">
                        <slot name="breadcrumb"></slot>

                        <template v-if="$slots['messages']">
                            <div class="container-fluid mb-1">
                                <slot name="messages"></slot>
                            </div>
                        </template>

                        <slot></slot>
                    </slot>
                </el-main>
                <el-footer class="py-layout__footer">
                    <slot name="footer"></slot>
                </el-footer>
            </el-container>
        </el-container>
        -->
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, prop, Styles } from '@pyro/platform';
    import { styleVars } from '../../styling/export';
    import { strEnsureRight } from '@pyro/platform/lib/utils/general';

    @component({
        provide() {
            return {
                layout: this
            }
        }
    })
    export default class Layout extends Vue {
        @prop.classPrefix('layout') classPrefix: string

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style(): Styles {
            return {}
        }

        sidebar   = {
            collapsed     : false,
            collapsedWidth: styleVars.get('layout-sidebar-collapse-width'),
            normalWidth   : styleVars.get('layout-sidebar-width'),
            get width() {
                return strEnsureRight((this.collapsed ? this.collapsedWidth : this.normalWidth), 'px');
            }
        }
        styleVars = styleVars; //ssssssss{ ...styleVars.raw() }

        created() {
            this.$py.instance('layout', this);
            this.$root[ 'setLayout' ](this);
            this.sidebar.collapsed = this.$py.cookies.has('layout.sidebar.collapsed');
        }

        toggleSidebarCollapse() {
            this.sidebar.collapsed = !this.sidebar.collapsed
            if ( this.sidebar.collapsed ) {
                this.$py.cookies.set('layout.sidebar.collapsed', this.sidebar.collapsed)
            } else {
                this.$py.cookies.unset('layout.sidebar.collapsed')
            }
        }
    }
</script>