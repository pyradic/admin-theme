<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Anomaly\Streams\Platform\View\Event\TemplateDataIsLoading;
use Anomaly\UsersModule\User\Login\LoginFormBuilder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Laradic\Support\Wrap;
use Pyro\AdminTheme\Command\GetControlPanelStructure;
use Pyro\AdminTheme\Ui\Command\AddCPNavToTemplate;
use Pyro\MenusModule\Link\Contract\LinkRepositoryInterface;
use Pyro\MenusModule\Seeder\MenuModuleSeederHelper;
use Pyro\Platform\Command\GetClassArray;
use Pyro\Platform\Platform;
use Tightenco\Ziggy\ZiggyServiceProvider;

class AdminThemeServiceProvider extends AddonServiceProvider
{

    public function register(Platform $platform)
    {
        $this->app->register(ZiggyServiceProvider::class);
//        $platform->addAddon($this->addon);
        $this->dispatchNow(new AddCPNavToTemplate());
        LoginFormBuilder::when('make', function () use ($platform) {
            $platform->preventBootstrap();
        });
        $this->app->events->listen(TemplateDataIsLoading::class, function (TemplateDataIsLoading $event) use ($platform) {
            /** @var \Laradic\Support\Dot $nav */
            $nav         = $this->dispatchNow(new GetControlPanelStructure());
            $moduleLinks = [];
            $links       = [];


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
            if ($cpnav = $template->get('cp_nav')) {
                $platform[ 'cp.nav' ] = $cpnav->toArray();
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
