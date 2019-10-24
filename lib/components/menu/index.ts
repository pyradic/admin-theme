import './menu.scss'
import Menu from './Menu.vue';
import MenuItem from './MenuItem.vue';
import MenuItemType from './MenuItemType.vue';
import MenuSubmenu from './MenuSubmenu.vue';
import DemoMenu from './DemoMenu.vue';

export * from './types';
// export * from './tree';

export {
    Menu,
    MenuItem,
    MenuItemType,
    MenuSubmenu,
    DemoMenu
}

// export * from './CMenu'
// export * from './CMenuItem'
// // import './CMenuItemProxy'
// export * from './CMenuItemType'
// export * from './CMenuSubmenu'
//
// const log = require('debug')('components:menu');
//
// app.hooks.installComponents.tap('CMenuItem', components => {
//     const typeNames     = app.get<MenuTypeRegistry>('component.menu.types').getNames();
//     const typeNameProps = Object.assign({}, ...typeNames.map(n => ({ [ n ]: { type: Boolean, default: false } })));
//     const Component     = <typeof Vue>CMenuItem.extend({
//         props: typeNameProps,
//         created() {
//             for ( let typeName of typeNames ) {
//                 if ( this.$props[ typeName ] === true ) {
//                     this.menuItemType = typeName
//                 }
//             }
//         },
//     })
//     log('hook installComponents CMenuItem',  {components,Component,typeNames,typeNameProps})
//     components.CMenuItem = Component
//     return components
// })
//
//
// // export * from './CMenuDivider'
// // export * from './CMenuHeader'
// // import CMenu from '../../vue-components/CMenu.vue';
// // import CMenuHeader from '../../vue-components/CMenuHeader.vue';
// // import CMenuDivider from '../../vue-components/CMenuDivider.vue';
// // import CMenuItem from '../../vue-components/CMenuItem.vue';
//
// // export {
// //     CMenu,
// //     CMenuHeader,
// //     CMenuDivider,
// //     CMenuItem
// // }
