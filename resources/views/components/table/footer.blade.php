<tfoot>
<?php/**
 * @var \Pyro\AdminTheme\Components\Table\Footer $this
 * @var \Collective\Html\HtmlBuilder            $html
 * @var \Collective\Html\FormBuilder            $form
 */?>
@if($this->actions->isNotEmpty() || $this->getParent()->hasPaginationLinks())
    <tr>
        <th colspan="100%" style="padding: 10px;">

            <div class="pull-left actions table__actions">
                @include('streams::buttons/buttons', ['buttons' => $this->actions])
            </div>

            @if($this->getParent()->hasPaginationLinks())
            <div class="pull-right">

                <select onchange="window.location=this.value;"
                        class="custom-select table-limit">
                </select>
                {!! $this->table->getData()->get('pagination')['links']  !!}
            </div>
            @endif
            <div style="clear: both;"></div>

        </th>
    </tr>
@endif
@if($this->option('total_results'))
<tr>
    <td colspan="100%">
        <small class="text-muted pull-right">
            {{ $this->option('total_results') }} {{ trans('streams::message.results') }}
        </small>
    </td>
</tr>
@endif
</tfoot>


{{--
<tfoot>
{% if table.actions|length or table.data.pagination.links|length %}
    <tr>
        <th colspan="100%" style="padding: 10px;">

            <div class="pull-left actions table__actions">
                {{ buttons(table.actions)|raw }}
            </div>

            {% if table.data.pagination.links|length %}
                <div class="pull-right">

                    <select onchange="window.location=this.value;"
                            class="custom-select table-limit">
                        <option {{ table.options.limit == 5 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 5} + request_query()) }}">
                            5 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 10 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 10} + request_query()) }}">
                            10 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 15 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 15} + request_query()) }}">
                            15 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 25 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 25} + request_query()) }}">
                            25 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 50 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 50} + request_query()) }}">
                            50 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 75 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 75} + request_query()) }}">
                            75 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 100 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 100} + request_query()) }}">
                            100 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 150 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 150} + request_query()) }}">
                            150 {{ trans('streams::message.results') }}</option>
                        <option {{ table.options.limit == 10000 ? 'selected' }}
                                value="{{ url_current() }}?{{ http_build_query({(table.options.prefix ~ 'limit'): 10000} + request_query()) }}">
                            {{ trans('streams::message.show_all') }}</option>
                    </select>

                    {{ table.data.pagination.links|raw }}
                </div>
            {% endif %}

            <div style="clear: both;"></div>

        </th>
    </tr>
{% endif %}
{% if table.options.total_results %}
    <tr>
        <td colspan="100%">
            <small class="text-muted pull-right">
                {{ table.options.total_results }} {{ trans('streams::message.results') }}
            </small>
        </td>
    </tr>
{% endif %}
</tfoot>


--}}
