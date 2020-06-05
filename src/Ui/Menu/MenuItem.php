<?php

namespace Pyro\AdminTheme\Ui\Menu;

use ArrayAccess;
use Crvs\Platform\Ui\Traits\HasClassAttribute;
use Crvs\Platform\Ui\Traits\HasHtmlAttributes;
use Crvs\Platform\Ui\Traits\HasIcon;
use Crvs\Platform\Ui\TreeNode\NodeInterface;
use Crvs\Platform\Ui\TreeNode\NodeTrait;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JsonSerializable;
use Laradic\Support\Traits\ArrayableProperties;
use Laradic\Support\Traits\ArrayAccessibleProperties;

class MenuItem implements NodeInterface, Arrayable, Jsonable, ArrayAccess, JsonSerializable, \IteratorAggregate
{
    use NodeTrait;
    use ArrayableProperties;
    use ArrayAccessibleProperties;

    use WithData;
    use HasHtmlAttributes;
    use HasIcon;
    use HasClassAttribute;

    protected $arrayable = [ 'attributes', 'icon', 'class', 'href' ];

    /** @var string */
    protected $href;

    public function toJson($options = 0)
    {
        return json_encode($this->jsonSerialize(), $options);
    }

    public function jsonSerialize()
    {
        return $this->toArray();
    }

    public function toArray()
    {
        return $this->getArrayablePropertiesArray([
            'children' => $this->getChildren()->toArray(),
            'value'    => $this->getValue(),
        ]);
    }

    public function getIterator()
    {
        return new \ArrayIterator($this->getChildren()->toArray());
    }

    public function createChild($value, $href = null)
    {
        $child = new static();
        $child->setParent($this);
        $child->setValue($value);
        $child->setHref($href);
        return $child;
    }

    public function getHref()
    {
        return $this->href;
    }

    public function setHref($href)
    {
        $this->href = $href;
        return $this;
    }



}
