<?php

namespace Pyro\AdminTheme\Components;

use Illuminate\Support\Arr;
use Pyro\Platform\Livewire\Component;

class Button extends Component
{
    protected $name = 'pyro.theme.admin::button';

    public $text;

    //formatter:off
    public $type;
    public $size;
    public $icon;
    public $plain=false;
    public $round=false;
    public $circle=false;
    public $disabled=false;
    public $loading=false;
    public $autoFocus=false;
    //formatter:on

    // mount('De Titel', 'primary', 'users', ['round','plain','loading'], ['size' => 'mini'])
    // mount('De Titel', 'success', 'users', 'mini', ['round','plain','loading'], ['size' => 'mini'])
    // mount('De Titel', 'info', ['round' => true, 'size' => 'mini'])
    // mount(['text' => 'De Titel', 'round' => true, 'size' => 'mini'])
    public function mount(...$params)
    {
        foreach ($params as $param) {
            if (is_string($param)) {
                if ($this->text === null) {
                    $this->text = $param;
                } elseif ($this->type === null) {
                    $this->type = $param;
                } elseif ($this->icon === null) {
                    $this->icon = $param;
                } elseif ($this->size === null) {
                    $this->size = $param;
                }
            }
            if (is_array($param)) {
                if (Arr::isAssoc($param)) {
                    foreach ($param as $key => $value) {
                        $this->{$key} = $value;
                    }
                } else {
                    foreach($param as $key){
                        $this->{$key} = true;
                    }
                }
            }
        }
//        Arr::isAssoc($params[ 0 ]);
//        $modifiers = [ 'plain', 'round', 'circle', 'disabled', 'loading', 'autoFocus' ]

    }

    public function handleClick()
    {
       $this->emit('button.click',$this->id);
    }

    public function render()
    {
        return view('pyro.theme.admin::components.button');
    }

    //formatter:off
    public function setName($name){$this->name = $name;return $this;}
    public function setIcon($icon){$this->icon = $icon;return $this;}
    public function setPlain($plain){$this->plain = $plain;return $this;}
    public function setRound($round){$this->round = $round;return $this;}
    public function setCircle($circle){$this->circle = $circle;return $this;}
    public function setDisabled($disabled){$this->disabled = $disabled;return $this;}
    public function setLoading($loading){$this->loading = $loading;return $this;}
    public function setAutoFocus($autoFocus){$this->autoFocus = $autoFocus;return $this;}

    public function setSize($size){ $this->size=$size; return $this;}
    public function medium(){ $this->size='medium'; return $this;}
    public function small(){ $this->size='small'; return $this;}
    public function mini(){ $this->size='mini'; return $this;}

    public function setType($type){ $this->type=$type; return $this;}
    public function primary(){ $this->type='primary'; return $this;}
    public function success(){ $this->type='success'; return $this;}
    public function info(){ $this->type='info'; return $this;}
    public function warning(){ $this->type='warning'; return $this;}
    public function danger(){ $this->type='danger'; return $this;}
    public function text(){ $this->type='text'; return $this;}
}
