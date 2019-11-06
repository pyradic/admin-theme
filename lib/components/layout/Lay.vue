<style lang="scss">
    $layout-header-font-color : #546e7a;

    @import "../../styling/base";

    $lay-prefix               : #{$prefix}-lay;


    // https://developer.mozilla.org/en-US/docs/Web/CSS/flex
    // flex: 0 1 auto !default;
    // flex-grow flex-shrink flex-basis;
    // flex-grow: 0 !default; The flex-grow property specifies how much the item will grow relative to the rest of the flexible items inside the same container.
    // flex-shrink: 1 !default; The flex-shrink property specifies how the item will shrink relative to the rest of the flexible items inside the same container.
    // flex-basis: auto !default; The flex-basis property specifies the initial length of a flexible item.
    .#{$lay-prefix} {
        display        : flex;
        flex-direction : column;
        width          : 100%;
        min-width      : 100%;
        min-height     : 100vh;
        position       : absolute;

        &__header,
        &__footer {
            display        : flex;
            flex-direction : row;
            width          : 100%;
            white-space    : nowrap;

            &-item {
                padding     : 0 10px;
                height      : inherit;
                line-height : inherit;

                &--separator {
                    width      : 1px;
                    background : #607d8b;
                }

                &--spacer {
                    flex : 1 1 auto;
                }
            }


            .el-menu.el-menu--horizontal {
                background  : transparent;
                height      : inherit;
                line-height : inherit;
                border      : none;


                > .el-submenu .el-submenu__title,
                > .el-menu-item {
                    line-height : inherit;
                    height      : inherit;
                    background  : transparent;
                    border      : none;
                }
            }
        }

        &__header {
            background  : $layout-header-background;
            color       : $layout-header-font-color;
            height      : $layout-header-height;
            line-height : $layout-header-height;

            a {
                color : $layout-header-font-color;

                &:hover { color : $layout-header-hover-font-color; }
            }

            .el-menu.el-menu--horizontal {
                > .el-submenu .el-submenu__title,
                > .el-menu-item {
                    > * {
                        vertical-align : auto;
                    }

                    color  : $layout-header-font-color;
                    height : $layout-header-height;

                    i { color : $layout-header-font-color; }

                    &:hover {
                        color      : $layout-header-hover-font-color;
                        background : $layout-header-hover-background;
                    }
                }

            }
        }

        &__main {
            background     : $blue-grey-50;
            display        : flex;
            flex-direction : row;
            flex           : 1 0 auto;
        }

        &__sidebar {
            background : $blue-grey-700;
            width      : $layout-sidebar-width;
            order      : 0;

            &.is-collapsed {
                width : $layout-sidebar-collapse-width;
            }
        }

        &__content {
            background : $blue-grey-500;
            flex       : 1 0 auto;
            order      : 1;
        }

        &__footer {
            background  : $layout-footer-background;
            color       : $layout-footer-font-color;
            //border-top     : $layout-footer-border-top;
            height      : $layout-footer-height;
            line-height : $layout-footer-height;

            .el-menu.el-menu--horizontal {
                > .el-submenu .el-submenu__title,
                > .el-menu-item {
                    height : $layout-footer-height;
                    color  : $layout-footer-font-color;

                    i { color : $layout-footer-font-color; }

                    &:hover {
                        color      : $layout-footer-hover-font-color;
                        background : $layout-footer-hover-background;
                    }
                }

            }
        }
    }

    .#{$toolbar-prefix} {
        &__item {}
    }
</style>
<template>
    <div :class="classes" :style="style">
        <div class="py-lay__header">
            <slot name="header"></slot>
            <!--
            <div class="py-lay__header-item">Item</div>
            <div class="py-lay__header-item">
                <py-menu :menu="headerMenu"></py-menu>
            </div>
            <div class="py-lay__header-item">Item 3</div>
            <div class="py-lay__header-item py-lay__header-item--spacer"></div>
            <a href="#" class="py-lay__header-item">Item 4</a>
            <div class="py-lay__header-item">Item 5</div>
            -->
        </div>
        <div class="py-lay__main">
            <div :class="sidebarClass">
                <slot name="sidebar"></slot>
            </div>
            <div class="py-lay__content">
                <slot name="breadcrumb"></slot>

                <template v-if="$slots['messages']">
                    <div class="container-fluid mb-1">
                        <slot name="messages"></slot>
                    </div>
                </template>

                <slot></slot>
            </div>
        </div>
        <div class="py-lay__footer">
            <slot name="footer"></slot>
            <!--
            <div class="py-lay__footer-item">Item</div>
            <a href="#" class="py-lay__footer-item">Item 2</a>
            <div class="py-lay__footer-item py-lay__footer-item--spacer"></div>
            <div class="py-lay__footer-item">Item 3</div>
            <py-menu :menu="headerMenu"></py-menu>
            <div class="py-lay__footer-item">Item 4</div>
            <div class="py-lay__footer-item py-lay__footer-item--spacer"></div>
            <div class="py-lay__footer-item">Item 5</div>
            <div class="py-lay__footer-item">Item 6</div>
            -->
        </div>
    </div>
</template>
<script lang="ts">
    import { component, prop, Styles } from '@pyro/platform';
    import Vue from 'vue';

    @component()
    export default class Lay extends Vue {
        @prop.classPrefix('lay') classPrefix: string

        sidebar = {
            collapsed: false
        }

        get classes() {
            return {
                [ this.classPrefix ]: true
            }
        }

        get style(): Styles {
            return {}
        }

        get sidebarClass() {
            return {
                [ `${this.classPrefix}__sidebar` ]: true,
                [ `is-collapsed` ]                : this.sidebar.collapsed
            }
        }

        get headerMenu() {
            return this.$root[ 'menus' ].admin_header
        }

    }
</script>