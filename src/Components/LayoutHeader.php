<?php

namespace Pyro\AdminTheme\Components;

use Pyro\Platform\Livewire\Component;

class LayoutHeader extends Component
{
    protected $name = 'pyro.theme.admin::layout.header';

    public $showTitle = '';

    public $titleWidth = '';

    public $showToggle = '';

    public $title = 'CRVS';

    public function render()
    {
        return view('pyro.theme.admin::components.layout-header');
    }
}
