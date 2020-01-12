<?php

namespace Pyro\AdminTheme\Components;

use Laradic\Support\MultiBench;

class Component extends \Livewire\Component
{
    protected $name;

    public function __construct($id)
    {
        MultiBench::on('lifecycle')->mark('component:filter:' . ($this->name ?? $id));
        parent::__construct($id);
    }

}
