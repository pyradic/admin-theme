<?php

namespace Pyro\AdminTheme\Ui;

use Pyro\IdeHelper\Examples\FormBuilderExamples;

class Examples
{

    public static function section()
    {
        $section = FormBuilderExamples::section();
        $section[ 'rows' ]   = [
            null => self::sectionRow(),
        ];
        return $section;
    }

    public static function sectionRow()
    {
        return [
            'columns' => [
                [
                    'classes' => '',
                    'size'    => 24,
                    'fields'  => [],
                    'html'    => '',
                    'view'    => '',
                    'sections' => self::sections()
                ],
            ],
        ];
    }


    public static function sections()
    {
        return [ static::section(), null => static::section() ];
    }
}
