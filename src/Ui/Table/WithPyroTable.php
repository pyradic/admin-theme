<?php

namespace Pyro\AdminTheme\Ui\Table;

use Anomaly\Streams\Platform\Ui\Table\Table;
use Anomaly\Streams\Platform\Ui\Table\TableBuilder;
use Anomaly\Streams\Platform\View\ViewOverrides;

/** @mixin \Anomaly\Streams\Platform\Ui\Table\TableBuilder */
trait WithPyroTable
{
    public function __construct(Table $table)
    {
        parent::__construct($table);
        $this->on('ready', function (TableBuilder $builder) {
            $builder->setOption('table_view', 'theme::table/pyro/table');
            $builder->setOption('class', $builder->getOption('class', 'table'));

            if ($builder->getOption('filters_dropdown')) {
                $builder->addView('search', [
                    'text'       => 'Search',
                    'icon'       => 'search',
                    'view'       => View::class,
                    'attributes' => [
                        '@click.prevent' => 'ui.table.show_filters_dropdown = !ui.table.show_filters_dropdown',
                        'href'   => '#',
                    ],
                ]);
            }
        });
        $this->on('built', function (TableBuilder $builder) {
            $table     = $builder->getTable();
            $overrides = resolve(ViewOverrides::class);
            platform()->set('ui.table.filters_dropdown', $table->getOption('filters_dropdown'));
            platform()->set('ui.table.show_filters_dropdown', false);

            if ($table->getOption('filters_dropdown')) {
                $table->getViews()->get('search')->setClass('btn btn-primary float-sm-right');
                $overrides->put('streams::table/partials/filters', 'theme::table/pyro/filters');
            }
        });
    }

}
