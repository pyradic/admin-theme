<?php

namespace Pyro\AdminTheme\Ui\Table\Component;

use Anomaly\Streams\Platform\Ui\Table\TableBuilder;
use Pyro\AdminTheme\Ui\Table\PyroTableBuilder;

class ViewBuilder extends \Anomaly\Streams\Platform\Ui\Table\Component\View\ViewBuilder
{

    /**
     * @param \Pyro\AdminTheme\Ui\Table\PyroTableBuilder $builder
     */
    public function build($builder)
    {
        $table = $builder->getTable();

        $this->input->read($builder);

        if ($builder->getTableOption('enable_views') === false) {
            return;
        }

        foreach ($builder->getViews() as $view) {
            if (array_get($view, 'enabled', true)) {
                $table->addView($this->factory->make($view));
            }
        }
    }
}
