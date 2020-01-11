<thead class="{{ $this->option('header_class') }}">
<?php/**
 * @var \Pyro\AdminTheme\Components\Table\Header $this
 * @var \Collective\Html\HtmlBuilder             $html
 * @var \Collective\Html\FormBuilder             $form
 */?>
@inject('html','html')

@if($this->option('sortable'))
    <th style="width: 30px;">&nbsp;</th>
@endif

@if($this->actions->isNotEmpty())
    <th style="width: 30px;">
        <input data-toggle="all" type="checkbox">
    </th>
@endif

@foreach($this->headers as $header)
    <th>
        @if($header->isSortable())
            {!! $html->link(url()->current() . '?' . $header->getQueryString(), __($header->getHeading()),['class' => 'ajax']) !!}
            @if($header->getDirection() === 'asc')
                @icon('sort-ascending','text-muted')
            @elseif($header->getDirection() === 'desc')
                @icon('sort-descending','text-muted')
            @else
                @icon('sortable','text-muted')
            @endif
        @else
            {!! __($header->getHeading()) !!}
        @endif
    </th>
@endforeach

</thead>
