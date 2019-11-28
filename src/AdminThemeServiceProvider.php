<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Anomaly\Streams\Platform\View\Event\TemplateDataIsLoading;
use Anomaly\Streams\Platform\View\ViewIncludes;
use Anomaly\UsersModule\User\Login\LoginFormBuilder;
use Illuminate\Support\Arr;
use Laradic\Support\Wrap;
use Pyro\Platform\Platform;
use Tightenco\Ziggy\ZiggyServiceProvider;

class AdminThemeServiceProvider extends AddonServiceProvider
{

    public function register(Platform $platform)
    {
        $this->app->register(ZiggyServiceProvider::class);

        LoginFormBuilder::when('make', function () use ($platform) {
            $platform->preventBootstrap();
        });


        $this->app->events->listen(TemplateDataIsLoading::class, function (TemplateDataIsLoading $event) use ($platform) {
            $template = $event->getTemplate();
            /** @var \Anomaly\Streams\Platform\Addon\Module\Module|\Anomaly\Streams\Platform\Addon\Module\ModulePresenter $module */
            $module = $template->get('module');

            // if admin request using this theme;
            if (request()->is('admin*') && $template->get('theme')->getNamespace() === 'pyro.theme.admin') {
                // add scripts, styles for theme webpack entry
                $platform->addWebpackEntry('@pyro/admin-theme');

                // include webpack assets and entrypoints
                // include platform frontend application
                resolve(ViewIncludes::class)
                    ->include('cp_scripts', 'webpack::include_webpack')
                    ->include('cp_scripts', 'platform::include_platform_frontend');
            }

            if ($module) {
                $platform[ 'module' ] = $module->toArray();
            }

            if ($breadcrumbs = $template->get('breadcrumbs')) {
                $platform[ 'breadcrumbs' ] = $breadcrumbs->mapWithKeys(function ($url, $title) {
                    return [ trans($title) => $url ];
                })->toArray();
            }

            $user = null;
            if (auth()->check()) {
                $user     = Wrap::dot(auth()->user()->toArrayWithRelations())->map('roles', function ($role) {
                    return Arr::only($role, [ 'id', 'slug', 'name' ]);
                })->toArray();
                $user     = Arr::except($user, [ 'created_at', 'created_by_id', 'updated_at', 'updated_by_id', 'deleted_at', 'password', 'remember_token', 'activation_code', 'reset_code' ]);
                $gravatar = $this->dispatchNow(new GetGravatar($user[ 'email' ]));
                if ($gravatar) {
                    $user[ 'gravatar' ] = $gravatar->url();
                }
            }

            $platform->set('user', $user);
        });
    }
}
