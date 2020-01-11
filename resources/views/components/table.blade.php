<div class="{{ $this->option('container_class',  'container-fluid') }}">
    <?php/**
     * @var \Pyro\AdminTheme\Components\Table $this
     * @var \Collective\Html\HtmlBuilder      $html
     * @var \Collective\Html\FormBuilder      $form
     */?>
    @inject('form','form')
    @inject('html','html')

    @livewire('pyro.theme.admin::table.filters', $this)
    @livewire('pyro.theme.admin::table.views', $this)
    @include($this->option('heading','streams::table/partials/heading'), ['table' => $this->getTable()])

    @if($this->table->getRows()->isNotEmpty())
        <div class="card">

            {!! $form->open(['url' => url()->current()]) !!}
            <div class="table-stack">
                <table
                    class="{{ $this->option('class', 'table') }} @ifthen($this->option('sortable'),'table--sortable')"
                    @ifthen($this->option('sortable'),'data-sortable')
                    {{ $html->attributes($this->option('attributes',[])) }}
                >
                    @livewire("pyro.theme.admin::table.header", $this)
                    @livewire("pyro.theme.admin::table.body", $this)
                    @livewire("pyro.theme.admin::table.footer", $this)
                </table>
            </div>
            {!! $form->close() !!}
        </div>
    @endif

    {{--    {!! $this->table->getContent() !!}--}}
</div>

{{--
{{ asset_add("scripts.js", "streams::js/table/table.js") }}

{% if not actions.empty() %}
    {{ asset_add("scripts.js", "streams::js/table/actions.js") }}
{% endif %}

{% if table.options.sortable %}
    {{ asset_add("scripts.js", "streams::js/table/sortable.js") }}
{% endif %}

<div class="{{ table.options.container_class ?: 'container-fluid' }}">

    {{ view("streams::table/partials/filters", {'table': table}) }}
    {{ view("streams::table/partials/views", {'table': table}) }}

    {{ view(table.options.heading ?: "streams::table/partials/heading", {'table': table}) }}

    {% if not table.rows.empty() %}
        {% block card %}
            <div class="card">

                {{ form_open({ 'url': url_full() }) }}
                <div class="table-stack">
                    <table
                            class="
                                {{ table.options.class ?: 'table' }}
                                {{ table.options.sortable ? 'table--sortable' }}
                                "
                            {{ table.options.sortable ? 'data-sortable' }}
                            {{ html_attributes(table.options.attributes) }}>

                        {{ view("streams::table/partials/header", {'table': table}) }}

                        {% block body %}
                            {{ view("streams::table/partials/body", {'table': table}) }}
                        {% endblock %}

                        {{ view("streams::table/partials/footer", {'table': table}) }}

                    </table>
                </div>
                {{ form_close() }}

            </div>
        {% endblock %}
    {% else %}

        {% block no_results %}
            <div class="card">
                <div class="card-block card-body">
                    {{ trans(table.options.get('no_results_message', 'streams::message.no_results')) }}
                </div>
            </div>
        {% endblock %}

    {% endif %}

</div>


--}}
