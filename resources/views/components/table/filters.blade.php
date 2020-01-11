<div>
    <?php/**
     * @var \Pyro\AdminTheme\Components\Table\Filters $this
     * @var \Collective\Html\HtmlBuilder              $html
     * @var \Collective\Html\FormBuilder              $form
     */?>
    @inject('html','html')
    @if($this->filters->isNotEmpty())
        <div class="card card-container">

            <form method="get" id="filters" url="{{url()->current()}}" class="form-inline">
                {!! csrf_field() !!}
                <input type="hidden" name="{{ $this->options->get('prefix') }}limit" value="{{ $this->options->get('limit')}}">
                <input type="hidden" name="{{ $this->options->get('prefix')}}view" value="{{ $this->table->getViews()->active()->getSlug() }}">
                <input type="hidden" name="{{ $this->options->get('prefix')}}page" value="1">

                @foreach($this->filters as $filter)
                    <div class="form-group">
                        {!! $filter->getInput() !!}
                    </div>
                @endforeach

                <button {!! $html->attributes(['type'=>'button', 'wire:click'=>'filter','class'=>'btn btn-success'])  !!} >
                    {{--                    type="button" wire:click="filter" class="btn btn-success"--}}
                    {{--                    {{ icon($this->options->get('filters.filter_icon')?: 'filter') }}--}}
                    {{ trans($this->options->get('filters.filter_text','streams::button.filter')) }}
                </button>
                <a href="{{ url()->current() }}{{ request()->has('view') ? '?view=' . request()->get('view') : '' }}" class="btn btn-inverse">
                    {{--                    {{ icon($this->options->get('filters.clear_icon')? $this->options->get('filters.clear_icon)')}}--}}
                    {{ trans($this->options->get('filters.clear_text','streams::button.clear') ) }}
                </a>
            </form>
        </div>
    @endif
</div>
