<?php

namespace Pyro\AdminTheme\Ui\Table;

class View extends \Anomaly\Streams\Platform\Ui\Table\Component\View\View
{
    protected $class;

    public function getClass()
    {
        return $this->class;
    }

    public function setClass($class)
    {
        $this->class = $class;
        return $this;
    }

}
