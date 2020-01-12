<?php

namespace Pyro\AdminTheme\Components\Table;

use Laradic\Support\MultiBench;

/**
 * @property \Anomaly\Streams\Platform\Ui\Table\Table                                                                                          $table
 * @property \Anomaly\Streams\Platform\Ui\Table\Component\Filter\FilterCollection|\Anomaly\Streams\Platform\Ui\Table\Component\Filter\Filter[] $filters
 * @property \Illuminate\Support\Collection                                                                                                    $options
 */
class Filters extends TableComponent
{
    protected $name = 'pyro.theme.admin::table.filters';

    protected $view = 'filters';

    public function mount($parent)
    {
        parent::mount($parent);
    }

    public function __construct($id)
    {
        parent::__construct($id);
    }

    public function filter(...$params)
    {
return;
    }

    public function getAttributesProperty()
    {
        return resolve('html')->attributes(['method'=>'get','id'=>'filters','url'=>url()->current(), 'class'=>'form-inline']);
    }

    public function hydrate()
    {
        return;
    }

    public function updating($name, $value)
    {
        return;
    }

    public function updated($name, $value)
    {
        return;
    }
}
