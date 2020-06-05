import { component, inject, prop, TsxComponent } from '@crvs/platform';
import 'vue-tsx-support/enable-check';
import { Menu }                                  from './Menu';
import { MenuItem }                              from './MenuItem';
import Vue                                       from 'vue';

@component({})
export class MenuItemType extends TsxComponent {
    @inject() menu: Menu;
    @prop.object.required() menuItem: MenuItem;
    @prop.string.required() type: string;
    @prop.object() attributes: any;
    component: string;
    $refs: { component: Vue };

    created() {
        let type = this.type;
        if ( !this.$py.menus.hasType(type) ) {
            Vue.util.warn(`Menu type '${type}' does not exist, reverting to default`, this);
            type = 'default';
        }
        this.component = this.$py.menus.getType(type);
    }

    render(h) {
        const Component = this.component;
        return (
            <Component ref="component" menuItem={this.menuItem} attributes={this.attributes}>
                {this.$slots.default}
            </Component>
        );
    }
}