<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Anomaly\Streams\Platform\View\Event\TemplateDataIsLoading;
use Anomaly\UsersModule\User\Login\LoginFormBuilder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Laradic\Support\Wrap;
use Pyro\AdminTheme\Ui\Command\AddCPNavToTemplate;
use Pyro\Platform\Command\GetClassArray;
use Pyro\Platform\Platform;

class AdminThemeServiceProvider extends AddonServiceProvider
{
    public function register(Platform $platform)
    {
//        $platform->addAddon($this->addon);
        $this->dispatchNow(new AddCPNavToTemplate());
        LoginFormBuilder::when('make', function () use ($platform) {
            $platform->preventBootstrap();
        });
        $this->app->events->listen(TemplateDataIsLoading::class, function (TemplateDataIsLoading $event) use ($platform) {

            $template = $event->getTemplate();
            /** @var \Anomaly\Streams\Platform\Ui\ControlPanel\ControlPanel $cp */
            $cp = $template->get('cp');
            /** @var \Anomaly\Streams\Platform\Addon\Module\Module|\Anomaly\Streams\Platform\Addon\Module\ModulePresenter $module */
            $module = $template->get('module');
            /** @var \Pyro\Platform\Addon\Theme\Theme $theme */
            $theme = $template->get('theme');
            if ($theme->getNamespace() === 'pyro.theme.admin') {
//                $this->app->platform->addPublicScript('assets/js/pyro__admin_theme.js');
//                $this->app->platform->addPublicStyle('assets/css/pyro__admin_theme.css');
//                $this->app->platform->addProvider('pyro.pyro__admin_theme.AdminThemeServiceProvider');
                $platform->addWebpackEntry('@pyro/admin-theme');
            }

            if ($module) {
                $platform[ 'module' ] = $module->toArray();
            }
            if ($cp) {
                $section = $cp->getSections()->active();
                if ($section) {
                    $platform[ 'cp.section.title' ] = trans($section->getTitle());
                    $platform[ 'cp.section.slug' ]  = $section->getSlug();
                }
                $platform->set('cp.shortcuts', $shortcuts = $cp->getShortcuts()->toArray());
            }
            if ($cpnav = $template[ 'cp_nav' ]) {
                $platform[ 'cp.nav' ] = $cpnav->toArray();
            }
            if ($breadcrumbs = $template[ 'breadcrumbs' ]) {
                $platform[ 'breadcrumbs' ] = $breadcrumbs->mapWithKeys(function ($url, $title) {
                    return [ trans($title) => $url ];
                })->toArray();
            }

//            $cpdata = array_replace(
//                $this->dispatchNow(new GetClassArray($cp)),
//                [
//                    'navigation' => $this->getClassArray($cp->getNavigation()),
//                    'buttons'    => $this->getClassArray($cp->getButtons()),
//                    'shortcuts'  => $this->getClassArray($cp->getShortcuts()),
//                ]
//            );
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
            $template = $event->getTemplate();
            return;
        });
    }

    protected function getClassArray(Collection $collection)
    {
        return $collection->map(function ($item) {
            return $this->dispatchNow(new GetClassArray($item));
        });
    }

}
