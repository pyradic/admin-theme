<?php

namespace Pyro\AdminTheme\Components;

use Crvs\Platform\Livewire\Component;

class LayoutBreadcrumb extends Component
{
    protected $name = 'pyro.theme.admin::layout.breadcrumb';

    public function render()
    {
        return view('pyro.theme.admin::components.layout-breadcrumb');
    }
}
