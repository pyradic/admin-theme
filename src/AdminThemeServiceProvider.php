<?php namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Anomaly\Streams\Platform\View\Event\TemplateDataIsLoading;
use Pyro\AdminTheme\Ui\Command\AddCPNavToTemplate;

class AdminThemeServiceProvider extends AddonServiceProvider
{
    public function register()
    {
        $this->dispatchNow(new AddCPNavToTemplate());

        $this->app->events->listen(TemplateDataIsLoading::class, function (TemplateDataIsLoading $event) {
            $template  =$event->getTemplate();

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

            if($module) {
                $this->app->platform->set('module', $module->toArray());
            }
            if($cp) {
                $section = $cp->getSections()->active();
                if ($section) {
                    $this->app->platform->set('section.title', trans($section->getTitle()));
                    $this->app->platform->set('section.slug', $section->getSlug());
                }
            }
            $template  =$event->getTemplate();
            return;
        });
    }
}
