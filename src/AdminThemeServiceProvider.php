<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Illuminate\Routing\Router;

class AdminThemeServiceProvider extends AddonServiceProvider
{

    /**
     * The addon routes.
     *
     * @type array|null
     */
    protected $routes = [
        'sdf' => [
            ''
        ]
    ];
}
