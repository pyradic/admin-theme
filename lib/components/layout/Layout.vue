<template>
    <el-container id="app" class="py-layout" direction="vertical">
        <el-header height="50px" class="py-layout__header">
            <slot name="header">
                <py-toolbar
                        :show-title="!sidebar.collapsed"
                        :title-width="sidebar.normalWidth"
                        show-toggle
                        title="CRVS"
                        @toggle-click="toggleSidebarCollapse"
                >
                    <slot name="header-toolbar"></slot>
                </py-toolbar>
            </slot>
        </el-header>
        <el-container>
            <py-layout-sidebar>
                <slot name="sidebar"></slot>
            </py-layout-sidebar>
            <el-container>
                <el-main class="py-layout__main">
                    <slot name="main">
                        <slot name="breadcrumb"></slot>
                        <div class="container-fluid">
                            <slot name="pre-content"></slot>
                        </div>

                        <slot></slot>
                    </slot>
                </el-main>
                <el-footer class="py-layout__footer">
                    <slot name="footer"></slot>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component, provide } from '@pyro/platform';
    import { styleVars } from '../../styling/export';

    @component()
    export default class Layout extends Vue {
        @provide() layout = this
        sidebar           = {
            collapsed     : false,
            collapsedWidth: styleVars.get('layout-sidebar-collapse-width'),
            normalWidth   : styleVars.get('layout-sidebar-width'),
            get width() {
                return (this.collapsed ? this.collapsedWidth : this.normalWidth) + 'px';
            }
        }

        created() {
            this.$py.instance('layout', this);
            this.$root['setLayout'](this) ;
            this.sidebar.collapsed = this.$py.cookies.get('layout.sidebar.collapsed', false);
        }

        toggleSidebarCollapse() {
            this.sidebar.collapsed = !this.sidebar.collapsed
            if(this.sidebar.collapsed) {
                this.$py.cookies.set('layout.sidebar.collapsed', this.sidebar.collapsed)
            } else {
                this.$py.cookies.unset('layout.sidebar.collapsed')
            }
        }
    }
</script>