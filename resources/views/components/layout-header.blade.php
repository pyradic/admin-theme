<py-layout-header ref="header" xmlns:wire>
    <py-toolbar
        :show-title="!layout.sidebar.collapsed"
        :title-width="layout.sidebar.normalWidth"
        :show-toggle="true"
    >
        <py-toolbar-title
            :width="layout.sidebar.width"
            title="{{ $this->title }}"
            link="/admin"
        ></py-toolbar-title>

        <py-toolbar-toggle></py-toolbar-toggle>
        <py-toolbar-item>
            <py-menu-demo
                ref="headerMenuDemo"
                :max-depth="20"
                v-if="menus.admin_header && menus.admin_header.children"
                :items="menus.admin_header.children"
                :options="{
                     dropdown:true,
                     horizontal:true,
                     slug:'header',
                 }"></py-menu-demo>
        </py-toolbar-item>
        <py-toolbar-item spacer></py-toolbar-item>

        <py-shortcut-info></py-shortcut-info>
        <py-shortcut
            v-for="(shortcut, ishortcut) in $root.cp.shortcuts"
            :key="ishortcut"
            :highlighted="shortcut.highlighted"
            :type="shortcut.type || shortcut.attributes.type"
            :slug="shortcut.slug"
            :icon="shortcut.icon"
            :href="shortcut.href"
            :title="shortcut.title"
            :label="shortcut.label"
            :class="shortcut.class"
            :children="shortcut.children"
            :attributes="shortcut.attributes"
        >
        </py-shortcut>
        <div class="py-toolbar__item dropdown">
            <el-dropdown trigger="click" size="small" class="account-dropdown">
                <a href="javascript:void(0);" data-toggle="dropdown">
                    <img :src="user.gravatar" width="36" class="rounded-circle">
                </a>
                <el-dropdown-menu class="account-dropdown__menu">
                    <el-dropdown-item class="account-dropdown__item">
                        <a href="{{ url('/') }}" target="_blank">
                            <i class="fa fa-external-link"></i> Site
                        </a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <a href="{{ route('anomaly.module.users::logout') }}">
                            <i class="fa fa-power-off"></i> Logout
                        </a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </py-toolbar>
</py-layout-header>
