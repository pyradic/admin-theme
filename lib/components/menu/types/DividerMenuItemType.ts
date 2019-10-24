import { component, mixins } from '@pyro/platform';
import { MenuItemTypeMixin } from '../MenuItemTypeMixin';


export { DividerMenuItemType };
@component()
export default class DividerMenuItemType extends mixins(MenuItemTypeMixin) {
    static template = `
<div></div>     
    `;

}
