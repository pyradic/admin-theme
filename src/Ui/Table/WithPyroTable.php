<?php

namespace Pyro\AdminTheme\Ui\Table;

use Anomaly\Streams\Platform\Ui\Table\Table;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;
use Anomaly\Streams\Platform\View\ViewOverrides;
use Illuminate\Support\Arr;

/** @mixin \Anomaly\Streams\Platform\Ui\Table\TableBuilder */
trait WithPyroTable
{
    public function f__construct2(Table $table)
    {
        parent::__construct($table);
    }

}
