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
        <!-- HEADER -->
        <slot name="pre-header"/>
        <slot name="header"/>

        <div class="py-layout__main">

            <!-- SIDEBAR-->
            <slot name="sidebar" />

            <div class="py-layout__content">

                <!-- BREADCRUMB -->
                <slot name="breadcrumb"/>

                <!-- MESSAGES -->
                <template v-if="$slots['messages']">
                    <div class="container-fluid mb-1">
                        <slot name="messages"/>
                    </div>
                </template>

                <py-test-view v-if="showTestView"/>

                <!-- DEFAULT -->
                <div class="py-layout__inner" v-else>
                    <slot/>
                </div>

            </div>

        </div>

        <!-- FOOTER -->
        <slot name="footer"/>
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
        [ Dialog.name ]: Dialog,
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

    dialogVisible = false;

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
    }

    get menus() {
        return {
            sidebar   : Object.values(this.$py.data.cp.structure),
            pre_header: this.$py.data?.menus?.admin_pre_header,
            header    : this.$py.data?.menus?.admin_header,
            footer    : this.$py.data?.menus?.admin_footer,
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