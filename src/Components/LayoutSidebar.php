<?php

namespace Pyro\AdminTheme\Components;

use Pyro\Platform\Livewire\Component;

class LayoutSidebar extends Component
{
    protected $name = 'pyro.theme.admin::layout.sidebar';

    public function render()
    {
        return view('pyro.theme.admin::components.layout-sidebar');
    }
}
