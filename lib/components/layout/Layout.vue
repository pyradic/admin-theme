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
            <slot name="sidebar"/>

            <div class="py-layout__content">

                <div class="py-layout__content-top">
                    <!-- BREADCRUMB -->
                    <slot name="breadcrumbs" :breadcrumbs="breadcrumbs">
                        <!--
                        <el-breadcrumb separator="/" class="py-layout__breadcrumbs">
                            <el-breadcrumb-item v-for="(bc,ibc) in breadcrumbs"
                                                v-bind="bc.attributes"
                                                :class="bc.class"
                                                :to="bc.url"
                                                :key="ibc"
                            >
                                <a :href="bc.url" :data-slug="bc.key" v-if="ibc !== breadcrumbs.length -1 && bc.url">{{ bc.title }}</a>
                                <span :data-slug="bc.key" v-else>{{ bc.title }}</span>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        -->
                    </slot>
                    <div class="fg1"/>
                    <!-- BUTTONS -->
                    <slot name="buttons" :buttons="buttons">
                        <!--
                        <el-button-group class="py-layout__buttons">
                            <py-link-button
                                    v-for="(button, ibutton) in buttons"
                                    :key="ibutton"
                                    :type="button.type"
                                    :icon="button.icon"
                                    :class="button.class"
                                    v-bind="{...button.attributes}"
                                    size="mini"
                            >{{ button.text }}
                            </py-link-button>
                        </el-button-group>
                        -->
                    </slot>
                </div>

                <!-- MESSAGES -->
                <template v-if="$slots['messages']">
                    <div class="container-fluid mb-1">
                        <slot name="messages"/>
                    </div>
                </template>

                <py-test-view v-if="showTestView"/>

                <!-- DEFAULT -->
                <div class="py-layout__inner" :style="{padding: innerPadding}" v-else>
                    <slot/>
                </div>

            </div>

        </div>

        <!-- FOOTER -->
        <slot name="footer"/>
    </div>
</template>
<script lang="ts">
import { Collection, Component, component, Platform, prop, strEnsureRight, Styles } from '@pyro/platform';
import { styleVars }                                                                from '../../styling/export';
import { MenuDemo }                                                                 from '../menu';
import { Dialog }                                                                   from 'element-ui';
import { StreamsTable }                                                             from '../table';
import Button = StreamsTable.Button;
import Breadcrumb = Platform.Breadcrumb;

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
export default class Layout extends Component {
    $refs: { headerMenuDemo: MenuDemo, sidebarMenuDemo: MenuDemo };
    @prop.classPrefix('layout') classPrefix: string;
    @prop([String,Number],'0') innerPadding: string;

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

    get contentMaxWidth():number{
        return document.body.getBoundingClientRect().width - parseInt(this.sidebar.width);
    }

    get contentMaxWidthPx():string{
        return this.contentMaxWidth + 'px'
    }

    created() {
        this.$py.instance('layout', this);
        this.$root[ 'setLayout' ](this);
        this.sidebar.collapsed = this.$py.cookies.has('layout.sidebar.collapsed');
    }

    mounted() {
    }

    get menus() {
        return {
            sidebar   : this.$py.data.cp.navigation.children,
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

    // get breadcrumbs(): Array<[ string, string ]> { return Object.entries(this.$py.data.breadcrumbs); }
    get breadcrumbs(): Breadcrumb[] { return this.$py.data.breadcrumbs ? Object.values(this.$py.data.breadcrumbs) as any : []; }

    get buttons(): Button[] { return new Collection(...this.$py.data.cp.buttons); }
}
</script>