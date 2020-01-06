<?php

namespace Pyro\AdminTheme\Ui\Table;

class View extends \Anomaly\Streams\Platform\Ui\Table\Component\View\View
{
    protected $class;
    protected $html;
    protected $render;
    protected $dropdown;

    public function getClass()
    {
        return $this->class;
    }

    public function setClass($class)
    {
        $this->class = $class;
        return $this;
    }

    public function getHtml()
    {
        return $this->html;
    }

    public function setHtml($html)
    {
        $this->html = $html;
        return $this;
    }

    public function getDropdown()
    {
        return $this->dropdown;
    }

    public function setDropdown($dropdown)
    {
        $this->dropdown = $dropdown;
        return $this;
    }

    public function getRender()
    {
        return $this->render;
    }

    public function setRender($render)
    {
        $this->render = $render;
        return $this;
    }



}
