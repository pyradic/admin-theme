<tbody>
<?php/**
 * @var \Pyro\AdminTheme\Components\Table\Body $this
 * @var \Collective\Html\HtmlBuilder           $html
 * @var \Collective\Html\FormBuilder           $form
 */?>
@inject('html','html')
@foreach($this->rows as $row)
    <tr id="{{ $loop->index }}" class="{{ $row->getClass() }}">
        @if($this->option('sortable'))
            <td>
                @icon('fa fa-arrows handle')
                <input type="hidden" name="{{ $this->option('prefix') }}order[]" value="{{ $row->getKey() }}">
            </td>
        @endif
        @if($this->actions->isNotEmpty())
            <td>
                <input type="checkbox" data-toggle="action" name="{{ $this->option('prefix') }}id[]" value="{{ $row->getKey() }}">
            </td>
        @endif
        @foreach($row->getColumns() as $column)
            <td data-title="{{ __($column->getHeading()) }}"
                class="{{ $column->getClass() }}"
                {{ $html->attributes($column->getAttributes()) }}
            >{!! $column->getValue() !!}</td>
        @endforeach
        <td class="text-lg-right">
            @include('streams::buttons/buttons', ['buttons' => $row->getButtons()])
        </td>
    </tr>
@endforeach
</tbody>


{{--

<tbody>
{% for row in table.rows %}
    <tr id="{{ loop.index }}" class="{{ row.class }}">

        {% if table.options.sortable %}
            <td>
                {{ icon('fa fa-arrows handle') }}
                <input type="hidden" name="{{ row.table.options.prefix }}order[]" value="{{ row.key }}"/>
            </td>
        {% endif %}

        {% if not table.actions.empty() %}
            <td>
                <input type="checkbox" data-toggle="action" name="{{ row.table.options.prefix }}id[]" value="{{ row.key }}"/>
            </td>
        {% endif %}

        {% for column in row.columns %}
            <td data-title="{{ trans(column.heading) }}"
                class="{{ column.class }}" {{ html_attributes(column.attributes) }}>
                {{ column.value|raw }}
            </td>
        {% endfor %}

        <td class="text-lg-right">
            <nobr>{{ buttons(row.buttons)|raw }}</nobr>
        </td>

    </tr>
{% endfor %}
</tbody>

--}}
