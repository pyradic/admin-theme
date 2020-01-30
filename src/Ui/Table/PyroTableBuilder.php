<?php

namespace Pyro\AdminTheme\Ui\Table;

use Anomaly\Streams\Platform\Ui\Table\TableBuilder;
use Anomaly\Streams\Platform\View\ViewOverrides;
use Pyro\AdminTheme\Ui\Table\Command\BuildTable;

class PyroTableBuilder extends TableBuilder
{
    public function __construct(PyroTable $table)
    {
        parent::__construct($table);


        $this->on('ready', function (TableBuilder $builder) {
            $builder->setOption('table_view', 'pyro.theme.admin::table/pyro/table');
            $builder->setOption('class', $builder->getOption('class', 'table'));

            if ($builder->getOption('filters_dropdown')) {
                $builder->addView('search', [
                    'text'       => 'Search',
                    'icon'       => 'search',
                    'view'       => View::class,
                    'attributes' => [
                        '@click.prevent' => 'ui.table.show_filters_dropdown = !ui.table.show_filters_dropdown',
                        'href'           => '#',
                    ],
                ]);
            }
            $views = $builder->getViews();
            foreach ($views as $slug => &$view) {
                $hasAny = count(
                        array_filter(array_keys($view), function ($key) {
                            return in_array($key, [ 'html', 'render', 'class', 'dropdown' ], true);
                        })
                    ) > 0;
                if ($hasAny) {
                    $view['view'] = $view['view'] ?? View::class;
//                    Arr::set($view, 'view', Arr::get($view, 'view', View::class));
                }
            }
            $builder->setViews($views);
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

    public function build2()
    {
        $this->fire('ready', [ 'builder' => $this ]);

        $this->dispatchNow(new BuildTable($this));

        $this->fire('built', [ 'builder' => $this ]);

        return $this;
    }
}
