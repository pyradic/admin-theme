<template>
    <el-container id="app" class="py-layout" direction="vertical">
        <el-header :height="styleVars['layout-header-height']" class="py-layout__header">
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
    </el-container>
</template>
<script lang="ts">
    import Vue from 'vue';
    import { component } from '@pyro/platform';
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