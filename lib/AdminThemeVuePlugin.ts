import { app, prefixAndRegisterComponents, registerElementComponents }                                                                                                                                from '@pyro/platform';
import { Alert, Aside, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Col, Container, Divider, Dropdown, DropdownItem, DropdownMenu, Footer, Header, Icon, Link, Main, Popover, Row, Tag, Tooltip, Input } from 'element-ui';

import Vue       from 'vue';
import ElIcon    from './components/el-icon/icon.vue';
import vuescroll from 'vuescroll';
import PortalVue from 'portal-vue';

import * as components           from './components';
import * as directives           from './directives';
import BEMPlugin                 from './plugins/bem';
import LoadingPlugin             from './plugins/loading';
import { ComponentIconReplacer } from './interfaces';

export class AdminThemeVuePlugin {

    private static __installed = false;

    public static install(_Vue: typeof Vue, opts: any = {}) {
        if ( this.__installed ) {
            return;
        }
        this.__installed = true;

        _Vue.use(BEMPlugin, {
            delimiters: {
                ns    : app.config.prefix,
                el    : '__',
                mod   : '--',
                modVal: ':',
            },
        });

        _Vue.use(LoadingPlugin);

        _Vue.use(PortalVue);

        prefixAndRegisterComponents(_Vue, components);

        registerElementComponents(_Vue, { ElIcon });
        registerElementComponents(_Vue, {
            Button: Vue.component('ElButton', {
                mixins:[Button],
                mounted() {
                    this.$nextTick(() => {
                        this.$log('mount Button icon.replacer')
                        this.$py.get('icon.replacer')(this);
                    })
                },
            }),
            Row, Col, Aside, Header, Footer, Container, Main,
            Divider, Alert, Tag, Link,
            // Menu, MenuItem, MenuItemGroup, Submenu
            DropdownMenu, DropdownItem, Dropdown,
            Tooltip, Popover,
            Icon,
            Input,
            Breadcrumb, BreadcrumbItem, ButtonGroup,
            // ElIcon,
        });
        app.hooks.start.tap('AdminThemeVuePlugin', Vue => {
            Vue.component(ElIcon.name, ElIcon);
        });

        for ( const id in directives ) {
            // noinspection JSUnfilteredForInLoop
            _Vue.directive(id, directives[ id ]);
        }

        _Vue.component('py-scroll', async function () {
            const VueScroll: typeof vuescroll = await import('vuescroll/dist/vuescroll-native');
            Vue.use(VueScroll, {});
            VueScroll.install(Vue);
            return VueScroll;
        });

        _Vue.mixin({
            methods: {

                getFirstMatchingParent(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue) => boolean) {
                    return this.getAllMatchingParents(isMatch, (component, matches) => {
                        return matches.length > 0 || (shouldCancel ? shouldCancel(component) : false);
                    })[ 0 ];
                },
                getAllMatchingParents(isMatch: (component: Vue) => boolean, shouldCancel?: (component: Vue, matches: Vue[]) => boolean) {
                    let cancel  = false;
                    let matches = [];
                    let parent  = this.$parent;
                    while ( parent && cancel !== true ) {
                        if ( isMatch(parent) === true ) {
                            matches.push(parent);
                        }
                        if ( typeof shouldCancel === 'function' ) {
                            cancel = shouldCancel(parent, matches);
                        }
                        parent = parent.$parent;
                    }
                    return matches;
                },
            },
        });

    }
}