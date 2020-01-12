<?php

namespace Pyro\AdminTheme;

use Anomaly\Streams\Platform\Support\Decorator;
use Anomaly\Streams\Platform\Ui\Button\Command\GetButtons;
use Anomaly\Streams\Platform\Ui\Icon\Command\GetIcon;
use Pyro\Platform\View\BladeDirectives;

class AdminThemeBladeDirectives extends BladeDirectives
{
    protected static $map = [
        'ifthen',
        'icon',
    ];

    public static function ifthenExample($if, string $then, string $otherwise = ''){}
    public static function ifthen($expression)//$if, string $then, $otherwise = '')
    {
        $params = explode(',',$expression);
        if(count($params) === 2){
            $params[2] = "''";
        }

        [$if,$then,$otherwise] = $params;
        return "
<?php
if({$if}){
    echo {$then};
} else {
    echo {$otherwise};
}
?>
";
    }

    public static function iconExample(string $type, string $class = null) {}

    public static function icon($expression) {
        $params = explode(',',$expression);
        if(count($params) === 1){
            $params[1] = 'null';
        }
        [$type, $class] = $params;
        return "
<?php echo (new \Robbo\Presenter\Decorator())->decorate(dispatch_now(new \Anomaly\Streams\Platform\Ui\Icon\Command\GetIcon({$type}, {$class}))); ?>
        ";
    }

    public static function buttonsExample($buttons)
    {
        return dispatch_now(new GetButtons($buttons))->render();
    }

    public static function buttons($expression)
    {
        return "
<?php echo dispatch_now(new \Anomaly\Streams\Platform\Ui\Button\Command\GetButtons($expression))->render() ?>
        ";
    }

}
