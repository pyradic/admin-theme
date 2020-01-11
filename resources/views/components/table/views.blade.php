<div class="card">
    <?php/**
     * @var \Pyro\AdminTheme\Components\Table\Views $this
     * @var \Collective\Html\HtmlBuilder            $html
     * @var \Collective\Html\FormBuilder            $form
     */?>

    @inject('html','html')
    <nav class="navbar navbar-light">
        <div class="nav navbar-nav">
            @foreach($this->views as $view)
                    <a class="nav-item nav-link @ifthen($view->isActive(), 'active')" {{ $html->attributes($view->getAttributes()) }}>
                        @if($view->getIcon())
                            @icon($view->getIcon())
                        @endif

                        {{ __($view->getText()) }}

                        @if($view->getLabel())
                            <span class="tag tag-{{ $view->getContext() }}">
                                {{ __($view->getLabel()) }}
                            </span>
                        @endif
                    </a>
            @endforeach

        </div>
    </nav>
</div>
