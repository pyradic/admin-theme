<?php

namespace Pyro\AdminTheme\Components\Concerns;

trait ProvidesArrayAccess
{

    abstract protected function get($key, $default = null);

    abstract protected function set($key, $value);

    abstract protected function has($key);

    abstract protected function unset($key);

    public function offsetExists($offset)
    {
        return $this->has($offset);
    }

    public function offsetGet($offset)
    {
        return $this->get($offset);
    }

    public function offsetSet($offset, $value)
    {
        $this->set($offset,$value);
    }

    public function offsetUnset($offset)
    {
        return $this->unset($offset);
    }
}
