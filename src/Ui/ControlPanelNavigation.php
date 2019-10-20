<?php

namespace Pyro\AdminTheme\Ui;

use Laradic\Support\Concerns\DispatchesJobs;
use Pyro\AdminTheme\Ui\Command\BuildFullControlPanelNavigation;

class ControlPanelNavigation
{
    use DispatchesJobs;

    protected $resolved;

    /**
     * @return \Illuminate\Support\Collection|\Pyro\AdminTheme\Ui\ItemCollection|\Pyro\AdminTheme\Ui\Item[]
     */
    public function resolve($force = false)
    {
        try {
            if ( ! $this->resolved) {
                $this->resolved = $this->dispatchNow(new BuildFullControlPanelNavigation());
            }
        }catch (\Throwable $e){
            return collect();
        }
        return $this->resolved;
    }
}
