<?php

namespace Pyro\AdminTheme\Components;

use Crvs\Platform\Livewire\Component;

class LayoutFooter extends Component
{
    protected $name = 'pyro.theme.admin::layout.footer';

    public function render()
    {
        return view('pyro.theme.admin::components.layout-footer');
    }
}
