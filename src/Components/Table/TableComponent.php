<?php

namespace Pyro\AdminTheme\Components\Table;

use ArrayAccess;
use Pyro\AdminTheme\Components\Component;
use Pyro\AdminTheme\Components\Concerns\ProvidesArrayAccess;


/**
 * @property \Anomaly\Streams\Platform\Ui\Table\Table                                                                                          $table
 * @property \Illuminate\Support\Collection                                                                                                    $options
 * @property \Anomaly\Streams\Platform\Ui\Table\Component\Filter\FilterCollection|\Anomaly\Streams\Platform\Ui\Table\Component\Filter\Filter[] $filters
 * @property \Anomaly\Streams\Platform\Ui\Table\Component\View\ViewCollection|\Anomaly\Streams\Platform\Ui\Table\Component\View\View[]         $views
 * @property \Anomaly\Streams\Platform\Entry\EntryCollection|\Anomaly\Streams\Platform\Entry\Contract\EntryInterface[]                         $entries
 * @property \Anomaly\Streams\Platform\Ui\Table\Component\Action\ActionCollection|\Anomaly\Streams\Platform\Ui\Table\Component\Action\Action[] $actions
 * @property \Illuminate\Support\Collection|\Anomaly\Streams\Platform\Ui\Table\Component\Header\Header[]                                       $headers
 * @property \Anomaly\Streams\Platform\Ui\Table\Component\Row\RowCollection|\Anomaly\Streams\Platform\Ui\Table\Component\Row\Row[]                                       $rows
 */
abstract class TableComponent extends Component implements ArrayAccess
{
    use ProvidesArrayAccess;

    protected $name = 'pyro.theme.admin::table.filters';

    protected $view = '';

    /** @var \Anomaly\Streams\Platform\Ui\Table\Table */
    protected $table;

    /** @var \Pyro\AdminTheme\Components\Table */
    protected $parent;

    public function mount($parent)
    {
        $this->parent = $parent;
        $this->table  = $this->parent->getTable();
    }

    public function render()
    {
        return view('pyro.theme.admin::components.table.' . $this->view);
    }

    //formatter:off
    public function option($key, $default = null){return $this->table->getOption($key, $default);}
    public function getParent(){        return $this->parent;    }
    public function getTableProperty(){        return $this->table;    }
    public function getDataProperty(){return $this->table->getData();}
    public function getRowsProperty(){return $this->table->getRows();}
    public function getViewsProperty(){return $this->table->getViews();}
    public function getEntriesProperty(){return $this->table->getEntries();}
    public function getFiltersProperty(){

        return $this->table->getFilters();
    }
    public function getOptionsProperty(){return $this->table->getOptions();}
    public function getActionsProperty(){return $this->table->getActions();}
    public function getHeadersProperty(){return $this->table->getHeaders();}
    //formatter:on


    protected $arrayAccessData;

    protected function getArrayAccessData()
    {
        if($this->arrayAccessData === null){
            $this->arrayAccessData = [
                'table'   => $this->getTableProperty(),
                'data'    => $this->getDataProperty(),
                'rows'    => $this->getRowsProperty(),
                'views'   => $this->getViewsProperty(),
                'entries' => $this->getEntriesProperty(),
                'filters' => $this->getFiltersProperty(),
                'options' => $this->getOptionsProperty(),
                'actions' => $this->getActionsProperty(),
                'headers' => $this->getHeadersProperty(),
            ];
        }
        return $this->arrayAccessData;
    }

    protected function get($key, $default = null)
    {
        return data_get($this->getArrayAccessData(), $key, $default);
    }

    protected function set($key, $value)
    {
        // TODO: Implement set() method.
    }

    protected function has($key)
    {
        // TODO: Implement has() method.
    }

    protected function unset($key)
    {
        // TODO: Implement unset() method.
    }

}
