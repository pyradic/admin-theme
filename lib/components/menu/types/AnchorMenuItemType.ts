import { component ,mixins} from '@pyro/platform';
import { MenuItemTypeMixin } from '../MenuItemTypeMixin';

export { AnchorMenuItemType };
@component()
export default class AnchorMenuItemType extends mixins(MenuItemTypeMixin) {
    static template = `
<component
    :is="tags.itemLink"
    ref="link"
    :title="menuItem.title"
    :href="menuItem.computedHref"
    :data-toggle="menuItem.dataToggle"
    :data-target="menuItem.dataTarget"
    v-on:click="menuItem.handleClick">
    <span class="c-menu__icon"><slot name="icon"><fa-icon v-if="menuItem.icon" :icon="menuItem.icon"/></slot></span>
    <span class="c-menu__title"><slot name="title">{{menuItem.title}}</slot></span>
    <span class="c-menu__arrow" v-if="menuItem.hasChildren"><i></i></span>
</component>
                
    `;

}
