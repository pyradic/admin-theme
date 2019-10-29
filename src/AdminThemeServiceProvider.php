<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Anomaly\Streams\Platform\View\Event\TemplateDataIsLoading;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Laradic\Support\Wrap;
use Pyro\AdminTheme\Ui\Command\AddCPNavToTemplate;
use Pyro\Platform\Command\GetClassArray;

class AdminThemeServiceProvider extends AddonServiceProvider
{
    public function register()
    {
        $this->dispatchNow(new AddCPNavToTemplate());

        $this->app->events->listen(TemplateDataIsLoading::class, function (TemplateDataIsLoading $event) {
            $template = $event->getTemplate();

            /** @var \Anomaly\Streams\Platform\Ui\ControlPanel\ControlPanel $cp */
            $cp = $template->get('cp');
            /** @var \Anomaly\Streams\Platform\Addon\Module\Module|\Anomaly\Streams\Platform\Addon\Module\ModulePresenter $module */
            $module = $template->get('module');
            /** @var \Pyro\Platform\Addon\Theme\Theme $theme */
            $theme = $template->get('theme');
            if ($theme->getNamespace() === 'pyro.theme.admin') {
                $this->app->platform->addPublicScript('assets/js/pyro__admin_theme.js');
                $this->app->platform->addPublicStyle('assets/css/pyro__admin_theme.css');
                $this->app->platform->addProvider('pyro.pyro__admin_theme.AdminThemeServiceProvider');
            }

            if ($module) {
                $this->app->platform->set('module', $module->toArray());
            }
            if ($cp) {
                $section = $cp->getSections()->active();
                if ($section) {
                    $this->app->platform->set('section.title', trans($section->getTitle()));
                    $this->app->platform->set('section.slug', $section->getSlug());
                }
                $this->app->platform->set('shortcuts', $shortcuts = $cp->getShortcuts()->toArray());
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

            $this->app->platform->set('user', $user);
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
