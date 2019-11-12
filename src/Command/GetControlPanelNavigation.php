<?php

namespace Pyro\AdminTheme\Command;

use Anomaly\Streams\Platform\Addon\Module\ModuleCollection;
use Anomaly\Streams\Platform\Support\Authorizer;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Button\ButtonInput;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Navigation\Command\BuildNavigation;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Navigation\NavigationCollection;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Section\SectionCollection;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Section\SectionFactory;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Section\SectionInput;
use Anomaly\Streams\Platform\Ui\ControlPanel\Component\Shortcut\ShortcutCollection;
use Anomaly\Streams\Platform\Ui\ControlPanel\ControlPanel;
use Anomaly\Streams\Platform\Ui\ControlPanel\ControlPanelBuilder;
use Illuminate\Contracts\Cache\Repository as Cache;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Laradic\Support\Dot;

class GetControlPanelNavigation
{
    use DispatchesJobs;

    protected function createControlPanelBuilder($cp = null)
    {
        if ($cp === null) {
            $cp = new ControlPanel(
                collect(),
                new SectionCollection(),
                new ShortcutCollection(),
                new NavigationCollection());
        }
        return new ControlPanelBuilder($cp);
    }

    public function handle(ModuleCollection $modules, Authorizer $authorizer, Cache $cache)
    {
        $builder = $this->createControlPanelBuilder();
        $this->dispatchNow(new BuildNavigation($builder));
        $key     = 'cpnav';
        $navKey  = $key . '.nav';
        $lastKey = $key . '.last';
        $last    = $builder->getControlPanelNavigation()->map->getSlug()->implode(',');
        if ($cache->has($lastKey) && $cache->has($navKey) && $cache->get($lastKey) === $last) {
            return $cache->get($navKey);
        }
        $cache->forever($lastKey, $last);
        return $cache->rememberForever($navKey, function () use ($builder, $modules, $authorizer, $cache) {
            $nav = new Dot();
            foreach ($builder->getNavigation() as $navigation) {
                $navigation[ 'breadcrumb' ] = trans($navigation[ 'breadcrumb' ]);
                $navigation[ 'title' ]      = trans($navigation[ 'title' ]);
                $navSlug = str_replace('.','_',$navigation[ 'slug' ]);
                $nav->set($navSlug, $navigation);
                $module = $modules->get($navigation[ 'slug' ]);
                $builder->setSections($module->getSections());
                resolve(SectionInput::class)->read($builder);
                foreach ($builder->getSections() as $section) {
                    if ( ! $authorizer->authorize(array_get($section, 'permission'))) {
                        continue;
                    }
                    $nav->set($navSlug . '.sections.' . $section[ 'slug' ], $section);
                    $section = resolve(SectionFactory::class)->make($section);
                    $builder->getControlPanel()->addSection($section);
                }
                foreach ($builder->getControlPanelSections() as $section) /** @var \Pyro\Platform\Ui\ControlPanel\Section $section */ {
                    $section->setActive(true);
                    $builder->setButtons($section->getButtons());
                    resolve(ButtonInput::class)->read($builder);
                    $section->setActive(false);
                    $buttons = $builder->getButtons();

                    $nav->set($navSlug . '.sections.' . $section->getSlug() . '.buttons', $buttons);
                }
            }
            return $nav;
        });
    }
}
