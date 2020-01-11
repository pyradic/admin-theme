<py-layout-sidebar>
    <py-menu-demo
        ref="sidebar"
        v-if="layout.menus.sidebar"
        :items="layout.menus.sidebar"
        :options="{
             horizontal:false,
             collapsed: layout.sidebar.collapsed,
             slug:'sidebar'
       }"
    ></py-menu-demo>
</py-layout-sidebar>
