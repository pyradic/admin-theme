<?php

namespace Pyro\AdminTheme\Components;

use Crvs\Platform\Livewire\Component;

class Toolbar extends Component
{
    protected $name = 'pyro.theme.admin::toolbar';

    public function render()
    {
        return view('pyro.theme.admin::components.toolbar');
    }
}
