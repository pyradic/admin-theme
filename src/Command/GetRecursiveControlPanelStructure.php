<?php

namespace Pyro\AdminTheme\Command;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Laradic\Support\Dot;

class GetRecursiveControlPanelStructure
{
    use DispatchesJobs;

    /** @var \Laradic\Support\Dot */
    protected $controlPanelNavigation;

    public function __construct(?Dot $controlPanelNavigation = null)
    {
        $this->controlPanelNavigation = $controlPanelNavigation;
    }

    public function handle()
    {
        if ($this->controlPanelNavigation === null) {
            $this->controlPanelNavigation = $this->dispatchNow(new GetControlPanelStructure());
        }
        $links = collect();
        foreach ($this->controlPanelNavigation as $navigationKey => $navigation) {
            $link[ 'title' ]    = $navigation[ 'title' ];
            $link[ 'slug' ]     = $navigation[ 'slug' ];
            $link[ 'type' ]     = 'navigation';
            $link[ 'key' ]      = $navigationKey;
            $link[ 'url' ]      = data_get($navigation, 'attributes.href');
            $link[ 'children' ] = collect();

            foreach (data_get($navigation[ 'sections' ], []) as $sectionKey => $section) {
                // @todo fix sections in wrong  navigation like dashbaord en widgets in module blocks
                if ( ! isset($section[ 'title' ])) {
                    continue;
                }
                $child               = [];
                $child[ 'title' ]    = trans($section[ 'title' ]);
                $child[ 'key' ]      = $navigationKey . '::' . $sectionKey;
                $child[ 'type' ]     = 'section';
                $child[ 'slug' ]     = $sectionKey;
                $child[ 'url' ]      = data_get($section, 'attributes.href');
                $child[ 'children' ] = collect();

                foreach (data_get($section[ 'buttons' ], []) as $buttonKey => $button) {
                    if (is_int($buttonKey)) {
                        $buttonKey = $button[ 'slug' ];
                    }
                    $b                     = [];
                    $b[ 'title' ]          = trans(data_get($button, 'text'));
                    $b[ 'key' ]            = $navigationKey . '::' . $sectionKey . '.' . $buttonKey;
                    $b[ 'slug' ]           = $buttonKey;
                    $b[ 'type' ]           = 'button';
                    $b[ 'url' ]            = data_get($button, 'attributes.href');
                    $child[ 'children' ][] = $b;
                }
                $link[ 'children' ][] = $child;
            }
            $links[] = $link;
        }
        return $links;
    }

    /**
     * This is a function for use in combination with PHPStorms 'Deep Assoc Completion' plugin.
     * The result of this command can be annotated with
     * [at]var array $structure = \Pyro\AdminTheme\Command\GetRecursiveControlPanelStructure::example()
     */
    public static function example($i = null)
    {
        $a = [
            'title' => '',
            'key'   => '',
            'slug'  => '',
            'url'   => '',
            'type'  => '',
        ];
        /** @var \Illuminate\Support\Collection|array $children */
        $children = [ $i => $a ];
        /** @var \Illuminate\Support\Collection|array $b */
        $b                                         = [ $i => array_merge($a, [ 'children' => $children ]) ];
        $b[ $i ][ 'children' ][ $i ][ 'children' ] = $a;
        return $b;
    }

}
