import { component, prop } from '@/decorators';
import { mixins } from 'vue-class-component';
import { CMenuMixin } from '#/menu/CMenuMixin';
import { CMenuItem } from './CMenuItem';


const log = require('debug')('components:c-menu-item');

@component()
export class CMenuItemTypeMixin extends mixins(CMenuMixin) {
    @prop(Object) menuItem: CMenuItem
}
