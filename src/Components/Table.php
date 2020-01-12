<?php

namespace Pyro\AdminTheme\Components;

use Laradic\Support\MultiBench;

/**
 * @property string                                   $content
 * @property \Anomaly\Streams\Platform\Ui\Table\Table $table
 * @property \Illuminate\Support\Collection           $options
 */
class Table extends Component
{
    /** @var \Anomaly\Streams\Platform\Ui\Table\TableBuilder */
    protected $builder;

    /**
     * @param \Anomaly\Streams\Platform\Ui\Table\TableBuilder $builder
     */
    public function mount($builder)
    {
        $this->builder = $builder;
        MultiBench::dmark(static::class . '::mount');
        $this->builder->render();
        MultiBench::dmark(static::class . '::mount:end');
    }

    public function render()
    {
        MultiBench::dmark(static::class . '::render');
        $view = view('pyro.theme.admin::components.table');
        MultiBench::dmark(static::class . '::render:end');
        return $view;
    }

    public function getPagination()
    {
        return $this->getTable()->getData()->get('pagination');
    }

    public function getPaginationLinks()
    {
        return $this->getPagination()[ 'links' ];
    }

    public function hasPaginationLinks()
    {
        /** @noinspection StrlenInEmptyStringCheckContextInspection */
        return strlen($this->getPaginationLinks()) > 0;
    }

    public function getContentProperty()
    {
        return $this->getTable()->getContent();
    }

    public function getTableProperty()
    {
        return $this->getTable();
    }

    public function getOptionsProperty()
    {
        return $this->getTable()->getOptions();
    }

    public function option($key, $default = null)
    {
        return $this->table->getOption($key, $default);
    }

    public function getBuilder()
    {
        return $this->builder;
    }

    public function getTable()
    {
        return $this->builder->getTable();
    }

}
