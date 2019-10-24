
import MenuItem from './MenuItem.vue';
import { MenuMixin } from './MenuMixin';
import {mixins, component, prop } from '@pyro/platform';



@component()
export class MenuItemTypeMixin extends mixins(MenuMixin) {
    @prop(Object) menuItem: typeof MenuItem.prototype
}
