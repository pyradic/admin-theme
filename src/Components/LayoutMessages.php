<?php

namespace Pyro\AdminTheme\Components;

use Crvs\Platform\Livewire\Component;

class LayoutMessages extends Component
{
    protected $name = 'pyro.theme.admin::layout.messages';

    public function render()
    {
        return view('pyro.theme.admin::components.layout-messages');
    }
}
