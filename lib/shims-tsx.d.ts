import { TsxComponentAttrs } from 'vue-tsx-support/types/base';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "el-pagination"?: TsxComponentAttrs<{
                'pageSize'?: number
                'small'?: boolean
                'total'?: number
                'pageCount'?: number
                'pagerCount'?: number
                'currentPage'?: number
                'layout'?: any
                'pageSizes'?: Array<any>
                'popperClass'?: string
                'prevText'?: string
                'nextText'?: string
                'background'?: boolean
                'disabled'?: boolean
                'hideOnSinglePage'?: boolean
            }>
            "el-dialog"?: TsxComponentAttrs<{
                'visible'?: boolean
                'openDelay'?: any
                'closeDelay'?: any
                'zIndex'?: any
                'modal'?: boolean
                'modalFade'?: boolean
                'modalClass'?: any
                'modalAppendToBody'?: boolean
                'lockScroll'?: boolean
                'closeOnPressEscape'?: boolean
                'closeOnClickModal'?: boolean
                'title'?: string
                'appendToBody'?: boolean
                'showClose'?: boolean
                'width'?: string
                'fullscreen'?: boolean
                'customClass'?: string
                'top'?: string
                'beforeClose'?: Function
                'center'?: boolean
                'destroyOnClose'?: boolean
            }>
            "el-autocomplete"?: TsxComponentAttrs<{
                'valueKey'?: string
                'popperClass'?: string
                'popperOptions'?: object
                'placeholder'?: string
                'clearable'?: boolean
                'disabled'?: boolean
                'name'?: string
                'size'?: string
                'value'?: string
                'maxlength'?: number
                'minlength'?: number
                'autofocus'?: boolean
                'fetchSuggestions'?: Function
                'triggerOnFocus'?: boolean
                'customItem'?: string
                'selectWhenUnmatched'?: boolean
                'prefixIcon'?: string
                'suffixIcon'?: string
                'label'?: string
                'debounce'?: number
                'placement'?: string
                'hideLoading'?: boolean
                'popperAppendToBody'?: boolean
                'highlightFirstItem'?: boolean
            }>
            "el-dropdown"?: TsxComponentAttrs<{
                'trigger'?: string
                'type'?: string
                'size'?: string
                'splitButton'?: boolean
                'hideOnClick'?: boolean
                'placement'?: string
                'visibleArrow'?: any
                'showTimeout'?: number
                'hideTimeout'?: number
                'tabindex'?: number
            }>
            "el-dropdown-menu"?: TsxComponentAttrs<{
                'transformOrigin'?: any
                'placement'?: string
                'boundariesPadding'?: number
                'reference'?: any
                'popper'?: any
                'offset'?: any
                'value'?: boolean
                'visibleArrow'?: boolean
                'arrowOffset'?: number
                'appendToBody'?: boolean
                'popperOptions'?: object
            }>
            "el-dropdown-item"?: TsxComponentAttrs<{
                'command'?: any
                'disabled'?: boolean
                'divided'?: boolean
                'icon'?: string
            }>
            "el-menu"?: TsxComponentAttrs<{
                'tag'?: string
                'mode'?: string
                'defaultActive'?: string
                'defaultOpeneds'?: Array<any>
                'uniqueOpened'?: boolean
                'router'?: boolean
                'menuTrigger'?: string
                'collapse'?: boolean
                'backgroundColor'?: string
                'textColor'?: string
                'activeTextColor'?: string
                'collapseTransition'?: boolean
            }>
            "el-submenu"?: TsxComponentAttrs<{
                'transformOrigin'?: any
                'offset'?: any
                'boundariesPadding'?: number
                'popperOptions'?: object
                'index'?: string
                'showTimeout'?: number
                'hideTimeout'?: number
                'popperClass'?: string
                'disabled'?: boolean
                'popperAppendToBody'?: boolean
                'tag'?: string
            }>
            "el-menu-item"?: TsxComponentAttrs<{
                'tag'?: string
                'index'?: any
                'route'?: any
                'disabled'?: boolean
            }>
            "el-menu-item-group"?: TsxComponentAttrs<{
                'title'?: string
            }>
            "el-input"?: TsxComponentAttrs<{
                'value'?: any
                'size'?: string
                'resize'?: string
                'form'?: string
                'disabled'?: boolean
                'readonly'?: boolean
                'type'?: string
                'autosize'?: any
                'autocomplete'?: string
                'autoComplete'?: string
                'validateEvent'?: boolean
                'suffixIcon'?: string
                'prefixIcon'?: string
                'label'?: string
                'clearable'?: boolean
                'showPassword'?: boolean
                'showWordLimit'?: boolean
                'tabindex'?: string
            }>
            "el-input-number"?: TsxComponentAttrs<{
                'step'?: number
                'stepStrictly'?: boolean
                'max'?: number
                'min'?: number
                'value'?: any
                'disabled'?: boolean
                'size'?: string
                'controls'?: boolean
                'controlsPosition'?: string
                'name'?: string
                'label'?: string
                'placeholder'?: string
                'precision'?: number
            }>
            "el-radio"?: TsxComponentAttrs<{
                'value'?: any
                'label'?: any
                'disabled'?: boolean
                'name'?: string
                'border'?: boolean
                'size'?: string
            }>
            "el-radio-group"?: TsxComponentAttrs<{
                'value'?: any
                'size'?: string
                'fill'?: string
                'textColor'?: string
                'disabled'?: boolean
            }>
            "el-radio-button"?: TsxComponentAttrs<{
                'label'?: any
                'disabled'?: boolean
                'name'?: string
            }>
            "el-checkbox"?: TsxComponentAttrs<{
                'value'?: any
                'label'?: any
                'indeterminate'?: boolean
                'disabled'?: boolean
                'checked'?: boolean
                'name'?: string
                'trueLabel'?: any
                'falseLabel'?: any
                'id'?: string
                'controls'?: string
                'border'?: boolean
                'size'?: string
            }>
            "el-checkbox-button"?: TsxComponentAttrs<{
                'value'?: any
                'label'?: any
                'disabled'?: boolean
                'checked'?: boolean
                'name'?: string
                'trueLabel'?: any
                'falseLabel'?: any
            }>
            "el-checkbox-group"?: TsxComponentAttrs<{
                'value'?: any
                'disabled'?: boolean
                'min'?: number
                'max'?: number
                'size'?: string
                'fill'?: string
                'textColor'?: string
            }>
            "el-switch"?: TsxComponentAttrs<{
                'value'?: any
                'disabled'?: boolean
                'width'?: number
                'activeIconClass'?: string
                'inactiveIconClass'?: string
                'activeText'?: string
                'inactiveText'?: string
                'activeColor'?: string
                'inactiveColor'?: string
                'activeValue'?: any
                'inactiveValue'?: any
                'name'?: string
                'validateEvent'?: boolean
                'id'?: string
            }>
            "el-select"?: TsxComponentAttrs<{
                'name'?: string
                'id'?: string
                'value'?: any
                'autocomplete'?: string
                'autoComplete'?: string
                'automaticDropdown'?: boolean
                'size'?: string
                'disabled'?: boolean
                'clearable'?: boolean
                'filterable'?: boolean
                'allowCreate'?: boolean
                'loading'?: boolean
                'popperClass'?: string
                'remote'?: boolean
                'loadingText'?: string
                'noMatchText'?: string
                'noDataText'?: string
                'remoteMethod'?: Function
                'filterMethod'?: Function
                'multiple'?: boolean
                'multipleLimit'?: number
                'placeholder'?: string
                'defaultFirstOption'?: boolean
                'reserveKeyword'?: boolean
                'valueKey'?: string
                'collapseTags'?: boolean
                'popperAppendToBody'?: boolean
            }>
            "el-option"?: TsxComponentAttrs<{
                'value'?: any
                'label'?: any
                'created'?: boolean
                'disabled'?: boolean
            }>
            "el-option-group"?: TsxComponentAttrs<{
                'label'?: string
                'disabled'?: boolean
            }>
            "el-button"?: TsxComponentAttrs<{
                'type'?: string
                'size'?: string
                'icon'?: string
                'nativeType'?: string
                'loading'?: boolean
                'disabled'?: boolean
                'plain'?: boolean
                'autofocus'?: boolean
                'round'?: boolean
                'circle'?: boolean
            }>
            "el-button-group"?: TsxComponentAttrs<{

            }>
            "el-table"?: TsxComponentAttrs<{
                'data'?: Array<any>
                'size'?: string
                'width'?: any
                'height'?: any
                'maxHeight'?: any
                'fit'?: boolean
                'stripe'?: boolean
                'border'?: boolean
                'rowKey'?: any
                'context'?: any
                'showHeader'?: boolean
                'showSummary'?: boolean
                'sumText'?: string
                'summaryMethod'?: Function
                'rowClassName'?: any
                'rowStyle'?: any
                'cellClassName'?: any
                'cellStyle'?: any
                'headerRowClassName'?: any
                'headerRowStyle'?: any
                'headerCellClassName'?: any
                'headerCellStyle'?: any
                'highlightCurrentRow'?: boolean
                'currentRowKey'?: any
                'emptyText'?: string
                'expandRowKeys'?: Array<any>
                'defaultExpandAll'?: boolean
                'defaultSort'?: object
                'tooltipEffect'?: string
                'spanMethod'?: Function
                'selectOnIndeterminate'?: boolean
                'indent'?: number
                'treeProps'?: object
                'lazy'?: boolean
                'load'?: Function
            }>
            "el-table-column"?: TsxComponentAttrs<{
                'type'?: string
                'label'?: string
                'className'?: string
                'labelClassName'?: string
                'property'?: string
                'prop'?: string
                'width'?: any
                'minWidth'?: any
                'renderHeader'?: Function
                'sortable'?: any
                'sortMethod'?: Function
                'sortBy'?: any
                'resizable'?: boolean
                'columnKey'?: string
                'align'?: string
                'headerAlign'?: string
                'showTooltipWhenOverflow'?: boolean
                'showOverflowTooltip'?: boolean
                'fixed'?: any
                'formatter'?: Function
                'selectable'?: Function
                'reserveSelection'?: boolean
                'filterMethod'?: Function
                'filteredValue'?: Array<any>
                'filters'?: Array<any>
                'filterPlacement'?: string
                'filterMultiple'?: boolean
                'index'?: any
                'sortOrders'?: Array<any>
            }>
            "el-date-picker"?: TsxComponentAttrs<{
                'appendToBody'?: boolean
                'offset'?: any
                'boundariesPadding'?: number
                'arrowOffset'?: number
                'size'?: string
                'format'?: string
                'valueFormat'?: string
                'readonly'?: boolean
                'placeholder'?: string
                'startPlaceholder'?: string
                'endPlaceholder'?: string
                'prefixIcon'?: string
                'clearIcon'?: string
                'name'?: any
                'disabled'?: boolean
                'clearable'?: boolean
                'id'?: any
                'popperClass'?: string
                'editable'?: boolean
                'align'?: string
                'value'?: any
                'defaultValue'?: any
                'defaultTime'?: any
                'rangeSeparator'?: any
                'pickerOptions'?: any
                'unlinkPanels'?: boolean
                'validateEvent'?: boolean
                'type'?: string
                'timeArrowControl'?: boolean
            }>
            "el-time-select"?: TsxComponentAttrs<{
                'appendToBody'?: boolean
                'offset'?: any
                'boundariesPadding'?: number
                'arrowOffset'?: number
                'size'?: string
                'format'?: string
                'valueFormat'?: string
                'readonly'?: boolean
                'placeholder'?: string
                'startPlaceholder'?: string
                'endPlaceholder'?: string
                'prefixIcon'?: string
                'clearIcon'?: string
                'name'?: any
                'disabled'?: boolean
                'clearable'?: boolean
                'id'?: any
                'popperClass'?: string
                'editable'?: boolean
                'align'?: string
                'value'?: any
                'defaultValue'?: any
                'defaultTime'?: any
                'rangeSeparator'?: any
                'pickerOptions'?: any
                'unlinkPanels'?: boolean
                'validateEvent'?: boolean
                'type'?: string
            }>
            "el-time-picker"?: TsxComponentAttrs<{
                'appendToBody'?: boolean
                'offset'?: any
                'boundariesPadding'?: number
                'arrowOffset'?: number
                'size'?: string
                'format'?: string
                'valueFormat'?: string
                'readonly'?: boolean
                'placeholder'?: string
                'startPlaceholder'?: string
                'endPlaceholder'?: string
                'prefixIcon'?: string
                'clearIcon'?: string
                'name'?: any
                'disabled'?: boolean
                'clearable'?: boolean
                'id'?: any
                'popperClass'?: string
                'editable'?: boolean
                'align'?: string
                'value'?: any
                'defaultValue'?: any
                'defaultTime'?: any
                'rangeSeparator'?: any
                'pickerOptions'?: any
                'unlinkPanels'?: boolean
                'validateEvent'?: boolean
                'isRange'?: boolean
                'arrowControl'?: boolean
            }>
            "el-popover"?: TsxComponentAttrs<{
                'transformOrigin'?: any
                'placement'?: string
                'boundariesPadding'?: number
                'reference'?: any
                'popper'?: any
                'offset'?: any
                'value'?: boolean
                'visibleArrow'?: any
                'arrowOffset'?: number
                'appendToBody'?: boolean
                'popperOptions'?: object
                'trigger'?: string
                'openDelay'?: number
                'closeDelay'?: number
                'title'?: string
                'disabled'?: boolean
                'content'?: string
                'popperClass'?: string
                'width'?: any
                'transition'?: string
                'tabindex'?: number
            }>
            "el-tooltip"?: TsxComponentAttrs<{
                'transformOrigin'?: any
                'placement'?: string
                'boundariesPadding'?: number
                'reference'?: any
                'popper'?: any
                'offset'?: any
                'value'?: boolean
                'visibleArrow'?: any
                'arrowOffset'?: number
                'appendToBody'?: boolean
                'popperOptions'?: any
                'openDelay'?: number
                'disabled'?: boolean
                'manual'?: boolean
                'effect'?: string
                'popperClass'?: string
                'content'?: string
                'transition'?: string
                'enterable'?: boolean
                'hideAfter'?: number
                'tabindex'?: number
            }>
            "el-breadcrumb"?: TsxComponentAttrs<{
                'separator'?: string
                'separatorClass'?: string
            }>
            "el-breadcrumb-item"?: TsxComponentAttrs<{
                'to'?: any
                'replace'?: boolean
            }>
            "el-form"?: TsxComponentAttrs<{
                'model'?: object
                'rules'?: object
                'labelPosition'?: string
                'labelWidth'?: string
                'labelSuffix'?: string
                'inline'?: boolean
                'inlineMessage'?: boolean
                'statusIcon'?: boolean
                'showMessage'?: boolean
                'size'?: string
                'disabled'?: boolean
                'validateOnRuleChange'?: boolean
                'hideRequiredAsterisk'?: boolean
            }>
            "el-form-item"?: TsxComponentAttrs<{
                'label'?: string
                'labelWidth'?: string
                'prop'?: string
                'required'?: boolean
                'rules'?: any
                'error'?: string
                'validateStatus'?: string
                'for'?: string
                'inlineMessage'?: any
                'showMessage'?: boolean
                'size'?: string
            }>
            "el-tabs"?: TsxComponentAttrs<{
                'type'?: string
                'activeName'?: string
                'closable'?: boolean
                'addable'?: boolean
                'value'?: any
                'editable'?: boolean
                'tabPosition'?: string
                'beforeLeave'?: Function
                'stretch'?: boolean
            }>
            "el-tab-pane"?: TsxComponentAttrs<{
                'label'?: string
                'labelContent'?: Function
                'name'?: string
                'closable'?: boolean
                'disabled'?: boolean
                'lazy'?: boolean
            }>
            "el-tag"?: TsxComponentAttrs<{
                'text'?: string
                'closable'?: boolean
                'type'?: string
                'hit'?: boolean
                'disableTransitions'?: boolean
                'color'?: string
                'size'?: string
                'effect'?: string
            }>
            "el-tree"?: TsxComponentAttrs<{
                'data'?: Array<any>
                'emptyText'?: string
                'renderAfterExpand'?: boolean
                'nodeKey'?: string
                'checkStrictly'?: boolean
                'defaultExpandAll'?: boolean
                'expandOnClickNode'?: boolean
                'checkOnClickNode'?: boolean
                'checkDescendants'?: boolean
                'autoExpandParent'?: boolean
                'defaultCheckedKeys'?: Array<any>
                'defaultExpandedKeys'?: Array<any>
                'currentNodeKey'?: any
                'renderContent'?: Function
                'showCheckbox'?: boolean
                'draggable'?: boolean
                'allowDrag'?: Function
                'allowDrop'?: Function
                'props'?: any
                'lazy'?: boolean
                'highlightCurrent'?: boolean
                'load'?: Function
                'filterNodeMethod'?: Function
                'accordion'?: boolean
                'indent'?: number
                'iconClass'?: string
            }>
            "el-alert"?: TsxComponentAttrs<{
                'title'?: string
                'description'?: string
                'type'?: string
                'closable'?: boolean
                'closeText'?: string
                'showIcon'?: boolean
                'center'?: boolean
                'effect'?: string
            }>
            "el-slider"?: TsxComponentAttrs<{
                'min'?: number
                'max'?: number
                'step'?: number
                'value'?: any
                'showInput'?: boolean
                'showInputControls'?: boolean
                'inputSize'?: string
                'showStops'?: boolean
                'showTooltip'?: boolean
                'formatTooltip'?: Function
                'disabled'?: boolean
                'range'?: boolean
                'vertical'?: boolean
                'height'?: string
                'debounce'?: number
                'label'?: string
                'tooltipClass'?: string
                'marks'?: object
            }>
            "el-icon"?: TsxComponentAttrs<{
                'name'?: string
            }>
            "el-row"?: TsxComponentAttrs<{
                'tag'?: string
                'gutter'?: number
                'type'?: string
                'justify'?: string
                'align'?: string
            }>
            "el-col"?: TsxComponentAttrs<{
                'span'?: number
                'tag'?: string
                'offset'?: number
                'pull'?: number
                'push'?: number
                'xs'?: any
                'sm'?: any
                'md'?: any
                'lg'?: any
                'xl'?: any
            }>
            "el-upload"?: TsxComponentAttrs<{
                'action'?: string
                'headers'?: object
                'data'?: object
                'multiple'?: boolean
                'name'?: string
                'drag'?: boolean
                'dragger'?: boolean
                'withCredentials'?: boolean
                'showFileList'?: boolean
                'accept'?: string
                'type'?: string
                'beforeUpload'?: Function
                'beforeRemove'?: Function
                'onRemove'?: Function
                'onChange'?: Function
                'onPreview'?: Function
                'onSuccess'?: Function
                'onProgress'?: Function
                'onError'?: Function
                'fileList'?: Array<any>
                'autoUpload'?: boolean
                'listType'?: string
                'httpRequest'?: Function
                'disabled'?: boolean
                'limit'?: number
                'onExceed'?: Function
            }>
            "el-progress"?: TsxComponentAttrs<{
                'type'?: string
                'percentage'?: number
                'status'?: string
                'strokeWidth'?: number
                'textInside'?: boolean
                'width'?: number
                'showText'?: boolean
                'color'?: any
                'format'?: Function
            }>
            "el-spinner"?: TsxComponentAttrs<{
                'type'?: string
                'radius'?: number
                'strokeWidth'?: number
                'strokeColor'?: string
            }>
            "el-badge"?: TsxComponentAttrs<{
                'value'?: any
                'max'?: number
                'isDot'?: boolean
                'hidden'?: boolean
                'type'?: string
            }>
            "el-card"?: TsxComponentAttrs<{
                'header'?: any
                'bodyStyle'?: any
                'shadow'?: string
            }>
            "el-rate"?: TsxComponentAttrs<{
                'value'?: number
                'lowThreshold'?: number
                'highThreshold'?: number
                'max'?: number
                'colors'?: any
                'voidColor'?: string
                'disabledVoidColor'?: string
                'iconClasses'?: any
                'voidIconClass'?: string
                'disabledVoidIconClass'?: string
                'disabled'?: boolean
                'allowHalf'?: boolean
                'showText'?: boolean
                'showScore'?: boolean
                'textColor'?: string
                'texts'?: Array<any>
                'scoreTemplate'?: string
            }>
            "el-steps"?: TsxComponentAttrs<{
                'space'?: any
                'active'?: number
                'direction'?: string
                'alignCenter'?: boolean
                'simple'?: boolean
                'finishStatus'?: string
                'processStatus'?: string
            }>
            "el-step"?: TsxComponentAttrs<{
                'title'?: string
                'icon'?: string
                'description'?: string
                'status'?: string
            }>
            "el-carousel"?: TsxComponentAttrs<{
                'initialIndex'?: number
                'height'?: string
                'trigger'?: string
                'autoplay'?: boolean
                'interval'?: number
                'indicatorPosition'?: string
                'indicator'?: boolean
                'arrow'?: string
                'type'?: string
                'loop'?: boolean
                'direction'?: string
            }>
            "el-scrollbar"?: TsxComponentAttrs<{
                'native'?: boolean
                'wrapStyle'?: any
                'wrapClass'?: any
                'viewClass'?: any
                'viewStyle'?: any
                'noresize'?: boolean
                'tag'?: string
            }>
            "el-carousel-item"?: TsxComponentAttrs<{
                'name'?: string
                'label'?: any
            }>
            "el-collapse"?: TsxComponentAttrs<{
                'accordion'?: boolean
                'value'?: any
            }>
            "el-collapse-item"?: TsxComponentAttrs<{
                'title'?: string
                'name'?: any
                'disabled'?: boolean
            }>
            "el-cascader"?: TsxComponentAttrs<{
                'placement'?: string
                'appendToBody'?: boolean
                'visibleArrow'?: boolean
                'arrowOffset'?: number
                'offset'?: any
                'boundariesPadding'?: number
                'popperOptions'?: object
                'value'?: any
                'options'?: Array<any>
                'props'?: object
                'size'?: string
                'placeholder'?: string
                'disabled'?: boolean
                'clearable'?: boolean
                'filterable'?: boolean
                'filterMethod'?: Function
                'separator'?: string
                'showAllLevels'?: boolean
                'collapseTags'?: boolean
                'debounce'?: number
                'beforeFilter'?: Function
                'popperClass'?: string
            }>
            "el-color-picker"?: TsxComponentAttrs<{
                'value'?: string
                'showAlpha'?: boolean
                'colorFormat'?: string
                'disabled'?: boolean
                'size'?: string
                'popperClass'?: string
                'predefine'?: Array<any>
            }>
            "el-transfer"?: TsxComponentAttrs<{
                'data'?: Array<any>
                'titles'?: Array<any>
                'buttonTexts'?: Array<any>
                'filterPlaceholder'?: string
                'filterMethod'?: Function
                'leftDefaultChecked'?: Array<any>
                'rightDefaultChecked'?: Array<any>
                'renderContent'?: Function
                'value'?: Array<any>
                'format'?: object
                'filterable'?: boolean
                'props'?: object
                'targetOrder'?: string
            }>
            "el-container"?: TsxComponentAttrs<{
                'direction'?: string
            }>
            "el-header"?: TsxComponentAttrs<{
                'height'?: string
            }>
            "el-aside"?: TsxComponentAttrs<{
                'width'?: string
            }>
            "el-main"?: TsxComponentAttrs<{

            }>
            "el-footer"?: TsxComponentAttrs<{
                'height'?: string
            }>
            "el-timeline"?: TsxComponentAttrs<{
                'reverse'?: boolean
            }>
            "el-timeline-item"?: TsxComponentAttrs<{
                'timestamp'?: string
                'hideTimestamp'?: boolean
                'placement'?: string
                'type'?: string
                'color'?: string
                'size'?: string
                'icon'?: string
            }>
            "el-link"?: TsxComponentAttrs<{
                'type'?: string
                'underline'?: boolean
                'disabled'?: boolean
                'href'?: string
                'icon'?: string
            }>
            "el-divider"?: TsxComponentAttrs<{
                'direction'?: string
                'contentPosition'?: string
            }>
            "el-image"?: TsxComponentAttrs<{
                'src'?: string
                'fit'?: string
                'lazy'?: boolean
                'scrollContainer'?: any
                'previewSrcList'?: Array<any>
                'zIndex'?: number
            }>
            "el-calendar"?: TsxComponentAttrs<{
                'value'?: any
                'range'?: Array<any>
                'firstDayOfWeek'?: number
            }>
            "el-backtop"?: TsxComponentAttrs<{
                'visibilityHeight'?: number
                'target'?: any
                'right'?: number
                'bottom'?: number
            }>
            "el-page-header"?: TsxComponentAttrs<{
                'title'?: string
                'content'?: string
            }>
            "el-cascader-panel"?: TsxComponentAttrs<{
                'value'?: any
                'options'?: Array<any>
                'props'?: object
                'border'?: boolean
                'renderLabel'?: Function
            }>
            "el-avatar"?: TsxComponentAttrs<{
                'size'?: any
                'shape'?: string
                'icon'?: string
                'src'?: string
                'alt'?: string
                'srcSet'?: string
                'error'?: Function
                'fit'?: string
            }>
            "el-drawer"?: TsxComponentAttrs<{
                'visible'?: boolean
                'openDelay'?: any
                'closeDelay'?: any
                'zIndex'?: any
                'modal'?: boolean
                'modalFade'?: boolean
                'modalClass'?: any
                'modalAppendToBody'?: boolean
                'lockScroll'?: boolean
                'closeOnPressEscape'?: boolean
                'closeOnClickModal'?: boolean
                'appendToBody'?: boolean
                'beforeClose'?: Function
                'customClass'?: string
                'destroyOnClose'?: boolean
                'direction'?: string
                'showClose'?: boolean
                'size'?: string
                'title'?: string
                'wrapperClosable'?: boolean
            }>
            "el-collapse-transition"?: TsxComponentAttrs<{

            }>
            "py-form"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-lay"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-layout"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-layout-header"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-layout-footer"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-layout-sidebar"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-nav"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'menu'?: object
                'horizontal'?: boolean
            }>
            "py-nav-item"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'item'?: object
            }>
            "py-shortcut"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'label'?: string
                'title'?: string
                'href'?: string
                'slug'?: string
                'icon'?: string
                'highlighted'?: boolean
                'children'?: Array<any>
                'attributes'?: object
            }>
            "py-shortcut-info"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-toolbar"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'title'?: string
                'titleWidth'?: any
                'titleLink'?: string
                'showTitle'?: boolean
                'showToggle'?: boolean
                'justify'?: string
            }>
            "py-toolbar-item"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'clickable'?: boolean
                'separator'?: boolean
                'spacer'?: boolean
                'icon'?: string
            }>
            "py-toolbar-title"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'link'?: string
                'width'?: any
                'title'?: string
            }>
            "py-toolbar-toggle"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'tag'?: string
            }>
            "py-expand-transition"?: TsxComponentAttrs<{
                'show'?: any
                'enabled'?: any
            }>
            "py-menu-demo"?: TsxComponentAttrs<{
                'items'?: Array<any>
                'maxDepth'?: number
                'options'?: object
            }>
            "py-menu"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'tag'?: string
                'theme'?: string
                'slug'?: string
                'collapsed'?: boolean
                'horizontal'?: boolean
                'inline'?: boolean
                'dropdown'?: boolean
            }>
            "py-menu-item"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'tag'?: string
                'title'?: string
                'slug'?: string
                'url'?: string
                'icon'?: string
                'active'?: boolean
            }>
            "py-menu-submenu"?: TsxComponentAttrs<{
                'classPrefix'?: string
            }>
            "py-menu-node"?: TsxComponentAttrs<{

            }>
            "py-menu-item-node"?: TsxComponentAttrs<{

            }>
            "py-menu-item-node-array"?: TsxComponentAttrs<{

            }>
            "py-ui-table"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'uiTable'?: object
            }>
            "py-scroll"?: TsxComponentAttrs<{

            }>
            "py-menu-editor-view"?: TsxComponentAttrs<{

            }>
            "py-menu-editor-type-list"?: TsxComponentAttrs<{

            }>
            "py-menu-editor"?: TsxComponentAttrs<{

            }>
            "py-menu-editor-form"?: TsxComponentAttrs<{

            }>
            "py-department-picker"?: TsxComponentAttrs<{
                'classPrefix'?: string
                'modal'?: boolean
                'showDeselect'?: boolean
                'departments'?: Array<any>
                'current'?: number
                'selectUrl'?: string
                'deselectUrl'?: string
                'headerText'?: string
            }>
            "draggable"?: TsxComponentAttrs<{
                'options'?: object
                'list'?: Array<any>
                'value'?: Array<any>
                'noTransitionOnDrag'?: boolean
                'clone'?: Function
                'element'?: string
                'tag'?: string
                'move'?: Function
                'componentData'?: object
            }>
            "keep-alive"?: TsxComponentAttrs<{
                'include'?: any
                'exclude'?: any
                'max'?: any
            }>
            "transition"?: TsxComponentAttrs<{
                'name'?: string
                'appear'?: boolean
                'css'?: boolean
                'mode'?: string
                'type'?: string
                'enterClass'?: string
                'leaveClass'?: string
                'enterToClass'?: string
                'leaveToClass'?: string
                'enterActiveClass'?: string
                'leaveActiveClass'?: string
                'appearClass'?: string
                'appearActiveClass'?: string
                'appearToClass'?: string
                'duration'?: any
            }>
            "transition-group"?: TsxComponentAttrs<{
                'tag'?: any
                'moveClass'?: any
                'name'?: any
                'appear'?: any
                'css'?: any
                'type'?: any
                'enterClass'?: any
                'leaveClass'?: any
                'enterToClass'?: any
                'leaveToClass'?: any
                'enterActiveClass'?: any
                'leaveActiveClass'?: any
                'appearClass'?: any
                'appearActiveClass'?: any
                'appearToClass'?: any
                'duration'?: any
            }>
        }
    }
}



// import Vue, { VNode } from 'vue';
// import { WatchOptions } from 'vue'
// import * as CSS from 'csstype'
//
//
// declare global {
//     export namespace VueTSX {
//         /**
//          * Components:
//          */
//
//         type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
//         type Emit<Events> = UnionToIntersection<
//             {
//                 [P in keyof Events]: undefined extends Events[P]
//                                      ? (eventName: P, payload?: Events[P]) => void
//                                      : (eventName: P, payload: Events[P]) => void
//             }[keyof Events]
//             >
//         type Listeners<Events> = {
//             on?: ({ [P in keyof Events]?: (payload: Events[P]) => void })
//         }
//         type ScopedSlot<Args, T = Exclude<Args, void>> = (...args: T extends any[] ? T : []) => VNode
//         type ScopedSlots<SS> = { [T in keyof SS]: SS[T] extends void ? void | ScopedSlot<SS[T]> : ScopedSlot<SS[T]> }
//         type ScopedSlotsProp<SS> = {} extends ScopedSlots<SS>
//                                    ? { scopedSlots?: ScopedSlots<SS> }
//                                    : { scopedSlots: ScopedSlots<SS> }
//
//         interface DefaultOptions {
//             props?: Record<string, any>
//             events?: Record<string, any>
//             scopedSlots?: Record<string, any[] | undefined>
//         }
//
//         interface Component<Options extends DefaultOptions> extends ComponentInstance {
//             /**
//              * Attributes
//              */
//             $attrs: Options['props'] extends {} ? Options['props'] : {}
//             /**
//              * Emit an event
//              */
//             $emit: Emit<Options['events'] extends {} ? Options['events'] : {}>
//             /**
//              * Scoped slots
//              */
//             $scopedSlots: ScopedSlots<Options['scopedSlots'] extends {} ? Options['scopedSlots'] : {}>
//             /**
//              * Typescript trick, won't work in code
//              */
//             $_props: (Options['props'] extends {} ? Options['props'] : {}) &
//                 (Listeners<(Options['events'] extends {} ? Options['events'] : {}) & { [key: string]: any }>) &
//                 (ScopedSlotsProp<Options['scopedSlots'] extends {} ? Options['scopedSlots'] : {}>)
//
//             render(h: CreateElement): VNode
//         }
//
//         interface VNode {
//             _VNode: true
//         }
//
//         interface ComponentCreator {
//             new <Options extends DefaultOptions = DefaultOptions>(): Component<Options>
//         }
//
//         class BaseComponent {
//             render(h: CreateElement): VNode
//         }
//
//         interface Instance {}
//
//         interface ComponentInstance {}
//
//         interface Options {
//             el: HTMLElement | string | null
//             render(h: VueTSX.CreateElement): VueTSX.VNode
//         }
//
//         interface Vue {
//             new (options: Options): Instance
//             use(plugin: any, options?: any): void
//         }
//
//         type CreateElement = (tag: string | typeof BaseComponent) => VNode
//
//         type Watch = (path: string, options?: WatchOptions) => MethodDecorator
//
//         /**
//          * HTML Elements
//          */
//
//         interface Event<T extends Element> {
//             /**
//              * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
//              */
//             readonly bubbles: boolean
//             cancelBubble: boolean
//             readonly cancelable: boolean
//             /**
//              * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
//              */
//             readonly composed: boolean
//             /**
//              * Returns the object whose event listener's callback is currently being
//              * invoked.
//              */
//             readonly currentTarget: T
//             readonly defaultPrevented: boolean
//             readonly eventPhase: number
//             /**
//              * Returns true if event was dispatched by the user agent, and
//              * false otherwise.
//              */
//             readonly isTrusted: boolean
//             returnValue: boolean
//             /** @deprecated */
//             readonly srcElement: Element | null
//             /**
//              * Returns the object to which event is dispatched (its target).
//              */
//             readonly target: EventTarget | null
//             /**
//              * Returns the event's timestamp as the number of milliseconds measured relative to
//              * the time origin.
//              */
//             readonly timeStamp: number
//             /**
//              * Returns the type of event, e.g.
//              * "click", "hashchange", or
//              * "submit".
//              */
//             readonly type: string
//             composedPath(): EventTarget[]
//             initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void
//             preventDefault(): void
//             /**
//              * Invoking this method prevents event from reaching
//              * any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any
//              * other objects.
//              */
//             stopImmediatePropagation(): void
//             /**
//              * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
//              */
//             stopPropagation(): void
//             readonly AT_TARGET: number
//             readonly BUBBLING_PHASE: number
//             readonly CAPTURING_PHASE: number
//             readonly NONE: number
//         }
//
//         interface UIEvent<T extends Element> extends Event<T> {
//             readonly detail: number
//             readonly view: Window
//             initUIEvent(
//                 typeArg: string,
//                 canBubbleArg: boolean,
//                 cancelableArg: boolean,
//                 viewArg: Window,
//                 detailArg: number,
//             ): void
//         }
//
//         interface AnimationEvent<T extends Element> extends Event<T> {
//             readonly animationName: string
//             readonly elapsedTime: number
//             readonly pseudoElement: string
//         }
//
//         interface FocusEvent<T extends Element> extends UIEvent<T> {
//             readonly relatedTarget: EventTarget
//             initFocusEvent(
//                 typeArg: string,
//                 canBubbleArg: boolean,
//                 cancelableArg: boolean,
//                 viewArg: Window,
//                 detailArg: number,
//                 relatedTargetArg: EventTarget,
//             ): void
//         }
//
//         interface MouseEvent<T extends Element> extends UIEvent<T> {
//             readonly altKey: boolean
//             readonly button: number
//             readonly buttons: number
//             readonly clientX: number
//             readonly clientY: number
//             readonly ctrlKey: boolean
//             /** @deprecated */
//             readonly fromElement: Element
//             readonly layerX: number
//             readonly layerY: number
//             readonly metaKey: boolean
//             readonly movementX: number
//             readonly movementY: number
//             readonly offsetX: number
//             readonly offsetY: number
//             readonly pageX: number
//             readonly pageY: number
//             readonly relatedTarget: EventTarget
//             readonly screenX: number
//             readonly screenY: number
//             readonly shiftKey: boolean
//             /** @deprecated */
//             readonly toElement: Element
//             /** @deprecated */
//             readonly which: number
//             readonly x: number
//             readonly y: number
//             getModifierState(keyArg: string): boolean
//             initMouseEvent(
//                 typeArg: string,
//                 canBubbleArg: boolean,
//                 cancelableArg: boolean,
//                 viewArg: Window,
//                 detailArg: number,
//                 screenXArg: number,
//                 screenYArg: number,
//                 clientXArg: number,
//                 clientYArg: number,
//                 ctrlKeyArg: boolean,
//                 altKeyArg: boolean,
//                 shiftKeyArg: boolean,
//                 metaKeyArg: boolean,
//                 buttonArg: number,
//                 relatedTargetArg: EventTarget,
//             ): void
//         }
//
//         interface DragEvent<T extends Element> extends MouseEvent<T> {
//             /**
//              * Returns the DataTransfer object for the event.
//              */
//             readonly dataTransfer: DataTransfer | null
//         }
//
//         interface ErrorEvent<T extends Element> extends Event<T> {
//             readonly colno: number
//             readonly error: any
//             readonly filename: string
//             readonly lineno: number
//             readonly message: string
//         }
//
//         interface PointerEvent<T extends Element> extends MouseEvent<T> {
//             readonly height: number
//             readonly isPrimary: boolean
//             readonly pointerId: number
//             readonly pointerType: string
//             readonly pressure: number
//             readonly tangentialPressure: number
//             readonly tiltX: number
//             readonly tiltY: number
//             readonly twist: number
//             readonly width: number
//         }
//
//         interface KeyboardEvent<T extends Element> extends UIEvent<T> {
//             readonly altKey: boolean
//             /** @deprecated */
//             char: string
//             /** @deprecated */
//             readonly charCode: number
//             readonly code: string
//             readonly ctrlKey: boolean
//             readonly key: string
//             /** @deprecated */
//             readonly keyCode: number
//             readonly location: number
//             readonly metaKey: boolean
//             readonly repeat: boolean
//             readonly shiftKey: boolean
//             /** @deprecated */
//             readonly which: number
//             getModifierState(keyArg: string): boolean
//             /** @deprecated */
//             initKeyboardEvent(
//                 typeArg: string,
//                 canBubbleArg: boolean,
//                 cancelableArg: boolean,
//                 viewArg: Window,
//                 keyArg: string,
//                 locationArg: number,
//                 modifiersListArg: string,
//                 repeat: boolean,
//                 locale: string,
//             ): void
//             readonly DOM_KEY_LOCATION_JOYSTICK: number
//             readonly DOM_KEY_LOCATION_LEFT: number
//             readonly DOM_KEY_LOCATION_MOBILE: number
//             readonly DOM_KEY_LOCATION_NUMPAD: number
//             readonly DOM_KEY_LOCATION_RIGHT: number
//             readonly DOM_KEY_LOCATION_STANDARD: number
//         }
//
//         interface ProgressEvent<T extends Element> extends Event<T> {
//             readonly lengthComputable: boolean
//             readonly loaded: number
//             readonly total: number
//         }
//
//         interface SecurityPolicyViolationEvent<T extends Element> extends Event<T> {
//             readonly blockedURI: string
//             readonly columnNumber: number
//             readonly documentURI: string
//             readonly effectiveDirective: string
//             readonly lineNumber: number
//             readonly originalPolicy: string
//             readonly referrer: string
//             readonly sourceFile: string
//             readonly statusCode: number
//             readonly violatedDirective: string
//         }
//
//         interface TouchEvent<T extends Element> extends UIEvent<T> {
//             readonly altKey: boolean
//             readonly changedTouches: TouchList
//             readonly ctrlKey: boolean
//             readonly metaKey: boolean
//             readonly shiftKey: boolean
//             readonly targetTouches: TouchList
//             readonly touches: TouchList
//         }
//
//         interface TransitionEvent<T extends Element> extends Event<T> {
//             readonly elapsedTime: number
//             readonly propertyName: string
//             readonly pseudoElement: string
//         }
//
//         interface WheelEvent<T extends Element> extends MouseEvent<T> {
//             readonly deltaMode: number
//             readonly deltaX: number
//             readonly deltaY: number
//             readonly deltaZ: number
//             getCurrentPoint(element: Element): void
//             initWheelEvent(
//                 typeArg: string,
//                 canBubbleArg: boolean,
//                 cancelableArg: boolean,
//                 viewArg: Window,
//                 detailArg: number,
//                 screenXArg: number,
//                 screenYArg: number,
//                 clientXArg: number,
//                 clientYArg: number,
//                 buttonArg: number,
//                 relatedTargetArg: EventTarget,
//                 modifiersListArg: string,
//                 deltaXArg: number,
//                 deltaYArg: number,
//                 deltaZArg: number,
//                 deltaMode: number,
//             ): void
//             readonly DOM_DELTA_LINE: number
//             readonly DOM_DELTA_PAGE: number
//             readonly DOM_DELTA_PIXEL: number
//         }
//
//         interface ClipboardEvent<T extends Element> extends Event<T> {
//             readonly clipboardData: DataTransfer
//         }
//
//         interface ElementEventMap<T extends Element> {
//             fullscreenchange: Event<T>
//             fullscreenerror: Event<T>
//         }
//
//         interface GlobalEventHandlersEventMap<T extends Element> {
//             abort: UIEvent<T>
//             animationcancel: AnimationEvent<T>
//             animationend: AnimationEvent<T>
//             animationiteration: AnimationEvent<T>
//             animationstart: AnimationEvent<T>
//             auxclick: Event<T>
//             blur: FocusEvent<T>
//             cancel: Event<T>
//             canplay: Event<T>
//             canplaythrough: Event<T>
//             change: Event<T>
//             click: MouseEvent<T>
//             close: Event<T>
//             contextmenu: MouseEvent<T>
//             cuechange: Event<T>
//             dblclick: MouseEvent<T>
//             drag: DragEvent<T>
//             dragend: DragEvent<T>
//             dragenter: DragEvent<T>
//             dragexit: Event<T>
//             dragleave: DragEvent<T>
//             dragover: DragEvent<T>
//             dragstart: DragEvent<T>
//             drop: DragEvent<T>
//             durationchange: Event<T>
//             emptied: Event<T>
//             ended: Event<T>
//             error: ErrorEvent<T>
//             focus: FocusEvent<T>
//             gotpointercapture: PointerEvent<T>
//             input: Event<T>
//             invalid: Event<T>
//             keydown: KeyboardEvent<T>
//             keypress: KeyboardEvent<T>
//             keyup: KeyboardEvent<T>
//             load: Event<T>
//             loadeddata: Event<T>
//             loadedmetadata: Event<T>
//             loadend: ProgressEvent<T>
//             loadstart: Event<T>
//             lostpointercapture: PointerEvent<T>
//             mousedown: MouseEvent<T>
//             mouseenter: MouseEvent<T>
//             mouseleave: MouseEvent<T>
//             mousemove: MouseEvent<T>
//             mouseout: MouseEvent<T>
//             mouseover: MouseEvent<T>
//             mouseup: MouseEvent<T>
//             pause: Event<T>
//             play: Event<T>
//             playing: Event<T>
//             pointercancel: PointerEvent<T>
//             pointerdown: PointerEvent<T>
//             pointerenter: PointerEvent<T>
//             pointerleave: PointerEvent<T>
//             pointermove: PointerEvent<T>
//             pointerout: PointerEvent<T>
//             pointerover: PointerEvent<T>
//             pointerup: PointerEvent<T>
//             progress: ProgressEvent<T>
//             ratechange: Event<T>
//             reset: Event<T>
//             resize: UIEvent<T>
//             scroll: UIEvent<T>
//             securitypolicyviolation: SecurityPolicyViolationEvent<T>
//             seeked: Event<T>
//             seeking: Event<T>
//             select: UIEvent<T>
//             stalled: Event<T>
//             submit: Event<T>
//             suspend: Event<T>
//             timeupdate: Event<T>
//             toggle: Event<T>
//             touchcancel: TouchEvent<T>
//             touchend: TouchEvent<T>
//             touchmove: TouchEvent<T>
//             touchstart: TouchEvent<T>
//             transitioncancel: TransitionEvent<T>
//             transitionend: TransitionEvent<T>
//             transitionrun: TransitionEvent<T>
//             transitionstart: TransitionEvent<T>
//             volumechange: Event<T>
//             waiting: Event<T>
//             wheel: WheelEvent<T>
//         }
//         interface DocumentAndElementEventHandlersEventMap<T extends Element> {
//             copy: ClipboardEvent<T>
//             cut: ClipboardEvent<T>
//             paste: ClipboardEvent<T>
//         }
//
//         interface HTMLElementEventMap<T extends Element>
//             extends ElementEventMap<T>,
//                 GlobalEventHandlersEventMap<T>,
//                 DocumentAndElementEventHandlersEventMap<T> {}
//
//         interface HTMLAttributes<T> {
//             // Standard HTML Attributes
//             accessKey?: string
//             class?: string | string[] | { [key: string]: boolean }
//             contentEditable?: boolean
//             contextMenu?: string
//             dir?: string
//             draggable?: boolean
//             hidden?: boolean
//             id?: string
//             lang?: string
//             placeholder?: string
//             slot?: string
//             spellCheck?: boolean
//             style?: CSS.PropertiesHyphen | string
//             tabIndex?: number
//             title?: string
//
//             // Unknown
//             inputMode?: string
//             is?: string
//             radioGroup?: string // <command>, <menuitem>
//
//             // WAI-ARIA
//             role?: string
//
//             // RDFa Attributes
//             about?: string
//             datatype?: string
//             inlist?: any
//             prefix?: string
//             property?: string
//             resource?: string
//             typeof?: string
//             vocab?: string
//
//             // Non-standard Attributes
//             autoCapitalize?: string
//             autoCorrect?: string
//             autoSave?: string
//             color?: string
//             itemProp?: string
//             itemScope?: boolean
//             itemType?: string
//             itemID?: string
//             itemRef?: string
//             results?: number
//             security?: string
//             unselectable?: 'on' | 'off'
//
//             // Directives
//             vModel?: any
//         }
//
//         // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
//         interface HTMLAttributes<T> {
//             /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
//             'aria-activedescendant'?: string
//             /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
//             'aria-atomic'?: boolean | 'false' | 'true'
//             /**
//              * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
//              * presented if they are made.
//              */
//             'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
//             /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
//             'aria-busy'?: boolean | 'false' | 'true'
//             /**
//              * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
//              * @see aria-pressed @see aria-selected.
//              */
//             'aria-checked'?: boolean | 'false' | 'mixed' | 'true'
//             /**
//              * Defines the total number of columns in a table, grid, or treegrid.
//              * @see aria-colindex.
//              */
//             'aria-colcount'?: number
//             /**
//              * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
//              * @see aria-colcount @see aria-colspan.
//              */
//             'aria-colindex'?: number
//             /**
//              * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
//              * @see aria-colindex @see aria-rowspan.
//              */
//             'aria-colspan'?: number
//             /**
//              * Identifies the element (or elements) whose contents or presence are controlled by the current element.
//              * @see aria-owns.
//              */
//             'aria-controls'?: string
//             /** Indicates the element that represents the current item within a container or set of related elements. */
//             'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
//             /**
//              * Identifies the element (or elements) that describes the object.
//              * @see aria-labelledby
//              */
//             'aria-describedby'?: string
//             /**
//              * Identifies the element that provides a detailed, extended description for the object.
//              * @see aria-describedby.
//              */
//             'aria-details'?: string
//             /**
//              * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
//              * @see aria-hidden @see aria-readonly.
//              */
//             'aria-disabled'?: boolean | 'false' | 'true'
//             /**
//              * Indicates what functions can be performed when a dragged object is released on the drop target.
//              * @deprecated in ARIA 1.1
//              */
//             'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
//             /**
//              * Identifies the element that provides an error message for the object.
//              * @see aria-invalid @see aria-describedby.
//              */
//             'aria-errormessage'?: string
//             /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
//             'aria-expanded'?: boolean | 'false' | 'true'
//             /**
//              * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
//              * allows assistive technology to override the general default of reading in document source order.
//              */
//             'aria-flowto'?: string
//             /**
//              * Indicates an element's "grabbed" state in a drag-and-drop operation.
//              * @deprecated in ARIA 1.1
//              */
//             'aria-grabbed'?: boolean | 'false' | 'true'
//             /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
//             'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
//             /**
//              * Indicates whether the element is exposed to an accessibility API.
//              * @see aria-disabled.
//              */
//             'aria-hidden'?: boolean | 'false' | 'true'
//             /**
//              * Indicates the entered value does not conform to the format expected by the application.
//              * @see aria-errormessage.
//              */
//             'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
//             /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
//             'aria-keyshortcuts'?: string
//             /**
//              * Defines a string value that labels the current element.
//              * @see aria-labelledby.
//              */
//             'aria-label'?: string
//             /**
//              * Identifies the element (or elements) that labels the current element.
//              * @see aria-describedby.
//              */
//             'aria-labelledby'?: string
//             /** Defines the hierarchical level of an element within a structure. */
//             'aria-level'?: number
//             /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
//             'aria-live'?: 'off' | 'assertive' | 'polite'
//             /** Indicates whether an element is modal when displayed. */
//             'aria-modal'?: boolean | 'false' | 'true'
//             /** Indicates whether a text box accepts multiple lines of input or only a single line. */
//             'aria-multiline'?: boolean | 'false' | 'true'
//             /** Indicates that the user may select more than one item from the current selectable descendants. */
//             'aria-multiselectable'?: boolean | 'false' | 'true'
//             /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
//             'aria-orientation'?: 'horizontal' | 'vertical'
//             /**
//              * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
//              * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
//              * @see aria-controls.
//              */
//             'aria-owns'?: string
//             /**
//              * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
//              * A hint could be a sample value or a brief description of the expected format.
//              */
//             'aria-placeholder'?: string
//             /**
//              * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
//              * @see aria-setsize.
//              */
//             'aria-posinset'?: number
//             /**
//              * Indicates the current "pressed" state of toggle buttons.
//              * @see aria-checked @see aria-selected.
//              */
//             'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
//             /**
//              * Indicates that the element is not editable, but is otherwise operable.
//              * @see aria-disabled.
//              */
//             'aria-readonly'?: boolean | 'false' | 'true'
//             /**
//              * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
//              * @see aria-atomic.
//              */
//             'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
//             /** Indicates that user input is required on the element before a form may be submitted. */
//             'aria-required'?: boolean | 'false' | 'true'
//             /** Defines a human-readable, author-localized description for the role of an element. */
//             'aria-roledescription'?: string
//             /**
//              * Defines the total number of rows in a table, grid, or treegrid.
//              * @see aria-rowindex.
//              */
//             'aria-rowcount'?: number
//             /**
//              * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
//              * @see aria-rowcount @see aria-rowspan.
//              */
//             'aria-rowindex'?: number
//             /**
//              * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
//              * @see aria-rowindex @see aria-colspan.
//              */
//             'aria-rowspan'?: number
//             /**
//              * Indicates the current "selected" state of various widgets.
//              * @see aria-checked @see aria-pressed.
//              */
//             'aria-selected'?: boolean | 'false' | 'true'
//             /**
//              * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
//              * @see aria-posinset.
//              */
//             'aria-setsize'?: number
//             /** Indicates if items in a table or grid are sorted in ascending or descending order. */
//             'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
//             /** Defines the maximum allowed value for a range widget. */
//             'aria-valuemax'?: number
//             /** Defines the minimum allowed value for a range widget. */
//             'aria-valuemin'?: number
//             /**
//              * Defines the current value for a range widget.
//              * @see aria-valuetext.
//              */
//             'aria-valuenow'?: number
//             /** Defines the human readable text alternative of aria-valuenow for a range widget. */
//             'aria-valuetext'?: string
//         }
//
//         interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
//             download?: any
//             href?: string
//             hrefLang?: string
//             media?: string
//             rel?: string
//             target?: string
//             type?: string
//             referrerPolicy?: string
//         }
//
//         // tslint:disable-next-line:no-empty-interface
//         interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}
//
//         interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
//             alt?: string
//             coords?: string
//             download?: any
//             href?: string
//             hrefLang?: string
//             media?: string
//             rel?: string
//             shape?: string
//             target?: string
//         }
//
//         interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
//             href?: string
//             target?: string
//         }
//
//         interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
//             cite?: string
//         }
//
//         interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
//             autoFocus?: boolean
//             disabled?: boolean
//             form?: string
//             formAction?: string
//             formEncType?: string
//             formMethod?: string
//             formNoValidate?: boolean
//             formTarget?: string
//             name?: string
//             type?: 'submit' | 'reset' | 'button'
//             value?: string | string[] | number
//         }
//
//         interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
//             height?: number | string
//             width?: number | string
//         }
//
//         interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
//             span?: number
//             width?: number | string
//         }
//
//         interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
//             span?: number
//         }
//
//         interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
//             open?: boolean
//         }
//
//         interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
//             cite?: string
//             dateTime?: string
//         }
//
//         interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
//             open?: boolean
//         }
//
//         interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
//             height?: number | string
//             src?: string
//             type?: string
//             width?: number | string
//         }
//
//         interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
//             disabled?: boolean
//             form?: string
//             name?: string
//         }
//
//         interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
//             acceptCharset?: string
//             action?: string
//             autoComplete?: string
//             encType?: string
//             method?: string
//             name?: string
//             noValidate?: boolean
//             target?: string
//         }
//
//         interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
//             manifest?: string
//         }
//
//         interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
//             allow?: string
//             allowFullScreen?: boolean
//             allowTransparency?: boolean
//             frameBorder?: number | string
//             height?: number | string
//             marginHeight?: number
//             marginWidth?: number
//             name?: string
//             sandbox?: string
//             scrolling?: string
//             seamless?: boolean
//             src?: string
//             srcDoc?: string
//             width?: number | string
//         }
//
//         interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
//             alt?: string
//             crossOrigin?: 'anonymous' | 'use-credentials' | ''
//             decoding?: 'async' | 'auto' | 'sync'
//             height?: number | string
//             sizes?: string
//             src?: string
//             srcSet?: string
//             useMap?: string
//             width?: number | string
//         }
//
//         interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
//             cite?: string
//             dateTime?: string
//         }
//
//         interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
//             accept?: string
//             alt?: string
//             autoComplete?: string
//             autoFocus?: boolean
//             capture?: boolean | string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
//             checked?: boolean
//             crossOrigin?: string
//             disabled?: boolean
//             form?: string
//             formAction?: string
//             formEncType?: string
//             formMethod?: string
//             formNoValidate?: boolean
//             formTarget?: string
//             height?: number | string
//             list?: string
//             max?: number | string
//             maxLength?: number
//             min?: number | string
//             minLength?: number
//             multiple?: boolean
//             name?: string
//             pattern?: string
//             placeholder?: string
//             readOnly?: boolean
//             required?: boolean
//             size?: number
//             src?: string
//             step?: number | string
//             type?: string
//             value?: string | string[] | number
//             width?: number | string
//         }
//
//         interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
//             autoFocus?: boolean
//             challenge?: string
//             disabled?: boolean
//             form?: string
//             keyType?: string
//             keyParams?: string
//             name?: string
//         }
//
//         interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
//             form?: string
//             htmlFor?: string
//         }
//
//         interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
//             value?: string | string[] | number
//         }
//
//         interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
//             as?: string
//             crossOrigin?: string
//             href?: string
//             hrefLang?: string
//             integrity?: string
//             media?: string
//             rel?: string
//             sizes?: string
//             type?: string
//         }
//
//         interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
//             name?: string
//         }
//
//         interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
//             type?: string
//         }
//
//         interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
//             autoPlay?: boolean
//             controls?: boolean
//             controlsList?: string
//             crossOrigin?: string
//             loop?: boolean
//             mediaGroup?: string
//             muted?: boolean
//             playsinline?: boolean
//             preload?: string
//             src?: string
//         }
//
//         interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
//             charSet?: string
//             content?: string
//             httpEquiv?: string
//             name?: string
//         }
//
//         interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
//             form?: string
//             high?: number
//             low?: number
//             max?: number | string
//             min?: number | string
//             optimum?: number
//             value?: string | string[] | number
//         }
//
//         interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
//             cite?: string
//         }
//
//         interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
//             classID?: string
//             data?: string
//             form?: string
//             height?: number | string
//             name?: string
//             type?: string
//             useMap?: string
//             width?: number | string
//             wmode?: string
//         }
//
//         interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
//             reversed?: boolean
//             start?: number
//             type?: '1' | 'a' | 'A' | 'i' | 'I'
//         }
//
//         interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
//             disabled?: boolean
//             label?: string
//         }
//
//         interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
//             disabled?: boolean
//             label?: string
//             selected?: boolean
//             value?: string | string[] | number
//         }
//
//         interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
//             form?: string
//             htmlFor?: string
//             name?: string
//         }
//
//         interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
//             name?: string
//             value?: string | string[] | number
//         }
//
//         interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
//             max?: number | string
//             value?: string | string[] | number
//         }
//
//         interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
//             async?: boolean
//             charSet?: string
//             crossOrigin?: string
//             defer?: boolean
//             integrity?: string
//             noModule?: boolean
//             nonce?: string
//             src?: string
//             type?: string
//         }
//
//         interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
//             autoComplete?: string
//             autoFocus?: boolean
//             disabled?: boolean
//             form?: string
//             multiple?: boolean
//             name?: string
//             required?: boolean
//             size?: number
//             value?: string | string[] | number
//         }
//
//         interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
//             media?: string
//             sizes?: string
//             src?: string
//             srcSet?: string
//             type?: string
//         }
//
//         interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
//             media?: string
//             nonce?: string
//             scoped?: boolean
//             type?: string
//         }
//
//         interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
//             cellPadding?: number | string
//             cellSpacing?: number | string
//             summary?: string
//         }
//
//         interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
//             autoComplete?: string
//             autoFocus?: boolean
//             cols?: number
//             dirName?: string
//             disabled?: boolean
//             form?: string
//             maxLength?: number
//             minLength?: number
//             name?: string
//             placeholder?: string
//             readOnly?: boolean
//             required?: boolean
//             rows?: number
//             value?: string | string[] | number
//             wrap?: string
//         }
//
//         interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
//             align?: 'left' | 'center' | 'right' | 'justify' | 'char'
//             colSpan?: number
//             headers?: string
//             rowSpan?: number
//             scope?: string
//         }
//
//         interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
//             align?: 'left' | 'center' | 'right' | 'justify' | 'char'
//             colSpan?: number
//             headers?: string
//             rowSpan?: number
//             scope?: string
//         }
//
//         interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
//             dateTime?: string
//         }
//
//         interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
//             default?: boolean
//             kind?: string
//             label?: string
//             src?: string
//             srcLang?: string
//         }
//
//         interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
//             height?: number | string
//             playsInline?: boolean
//             poster?: string
//             width?: number | string
//         }
//
//         interface SVGAttributes<T> {
//             // Attributes which also defined in HTMLAttributes
//             // See comment in SVGDOMPropertyConfig.js
//             className?: string
//             color?: string
//             height?: number | string
//             id?: string
//             lang?: string
//             max?: number | string
//             media?: string
//             method?: string
//             min?: number | string
//             name?: string
//             style?: CSS.PropertiesHyphen | string
//             target?: string
//             type?: string
//             width?: number | string
//
//             // Other HTML properties supported by SVG elements in browsers
//             role?: string
//             tabIndex?: number
//
//             // SVG Specific attributes
//             accentHeight?: number | string
//             accumulate?: 'none' | 'sum'
//             additive?: 'replace' | 'sum'
//             alignmentBaseline?:
//                 | 'auto'
//                 | 'baseline'
//                 | 'before-edge'
//                 | 'text-before-edge'
//                 | 'middle'
//                 | 'central'
//                 | 'after-edge'
//                 | 'text-after-edge'
//                 | 'ideographic'
//                 | 'alphabetic'
//                 | 'hanging'
//                 | 'mathematical'
//                 | 'inherit'
//             allowReorder?: 'no' | 'yes'
//             alphabetic?: number | string
//             amplitude?: number | string
//             arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated'
//             ascent?: number | string
//             attributeName?: string
//             attributeType?: string
//             autoReverse?: number | string
//             azimuth?: number | string
//             baseFrequency?: number | string
//             baselineShift?: number | string
//             baseProfile?: number | string
//             bbox?: number | string
//             begin?: number | string
//             bias?: number | string
//             by?: number | string
//             calcMode?: number | string
//             capHeight?: number | string
//             clip?: number | string
//             clipPath?: string
//             clipPathUnits?: number | string
//             clipRule?: number | string
//             colorInterpolation?: number | string
//             colorInterpolationFilters?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
//             colorProfile?: number | string
//             colorRendering?: number | string
//             contentScriptType?: number | string
//             contentStyleType?: number | string
//             cursor?: number | string
//             cx?: number | string
//             cy?: number | string
//             d?: string
//             decelerate?: number | string
//             descent?: number | string
//             diffuseConstant?: number | string
//             direction?: number | string
//             display?: number | string
//             divisor?: number | string
//             dominantBaseline?: number | string
//             dur?: number | string
//             dx?: number | string
//             dy?: number | string
//             edgeMode?: number | string
//             elevation?: number | string
//             enableBackground?: number | string
//             end?: number | string
//             exponent?: number | string
//             externalResourcesRequired?: number | string
//             fill?: string
//             fillOpacity?: number | string
//             fillRule?: 'nonzero' | 'evenodd' | 'inherit'
//             filter?: string
//             filterRes?: number | string
//             filterUnits?: number | string
//             floodColor?: number | string
//             floodOpacity?: number | string
//             focusable?: number | string
//             fontFamily?: string
//             fontSize?: number | string
//             fontSizeAdjust?: number | string
//             fontStretch?: number | string
//             fontStyle?: number | string
//             fontVariant?: number | string
//             fontWeight?: number | string
//             format?: number | string
//             from?: number | string
//             fx?: number | string
//             fy?: number | string
//             g1?: number | string
//             g2?: number | string
//             glyphName?: number | string
//             glyphOrientationHorizontal?: number | string
//             glyphOrientationVertical?: number | string
//             glyphRef?: number | string
//             gradientTransform?: string
//             gradientUnits?: string
//             hanging?: number | string
//             horizAdvX?: number | string
//             horizOriginX?: number | string
//             href?: string
//             ideographic?: number | string
//             imageRendering?: number | string
//             in2?: number | string
//             in?: string
//             intercept?: number | string
//             k1?: number | string
//             k2?: number | string
//             k3?: number | string
//             k4?: number | string
//             k?: number | string
//             kernelMatrix?: number | string
//             kernelUnitLength?: number | string
//             kerning?: number | string
//             keyPoints?: number | string
//             keySplines?: number | string
//             keyTimes?: number | string
//             lengthAdjust?: number | string
//             letterSpacing?: number | string
//             lightingColor?: number | string
//             limitingConeAngle?: number | string
//             local?: number | string
//             markerEnd?: string
//             markerHeight?: number | string
//             markerMid?: string
//             markerStart?: string
//             markerUnits?: number | string
//             markerWidth?: number | string
//             mask?: string
//             maskContentUnits?: number | string
//             maskUnits?: number | string
//             mathematical?: number | string
//             mode?: number | string
//             numOctaves?: number | string
//             offset?: number | string
//             opacity?: number | string
//             operator?: number | string
//             order?: number | string
//             orient?: number | string
//             orientation?: number | string
//             origin?: number | string
//             overflow?: number | string
//             overlinePosition?: number | string
//             overlineThickness?: number | string
//             paintOrder?: number | string
//             panose1?: number | string
//             pathLength?: number | string
//             patternContentUnits?: string
//             patternTransform?: number | string
//             patternUnits?: string
//             pointerEvents?: number | string
//             points?: string
//             pointsAtX?: number | string
//             pointsAtY?: number | string
//             pointsAtZ?: number | string
//             preserveAlpha?: number | string
//             preserveAspectRatio?: string
//             primitiveUnits?: number | string
//             r?: number | string
//             radius?: number | string
//             refX?: number | string
//             refY?: number | string
//             renderingIntent?: number | string
//             repeatCount?: number | string
//             repeatDur?: number | string
//             requiredExtensions?: number | string
//             requiredFeatures?: number | string
//             restart?: number | string
//             result?: string
//             rotate?: number | string
//             rx?: number | string
//             ry?: number | string
//             scale?: number | string
//             seed?: number | string
//             shapeRendering?: number | string
//             slope?: number | string
//             spacing?: number | string
//             specularConstant?: number | string
//             specularExponent?: number | string
//             speed?: number | string
//             spreadMethod?: string
//             startOffset?: number | string
//             stdDeviation?: number | string
//             stemh?: number | string
//             stemv?: number | string
//             stitchTiles?: number | string
//             stopColor?: string
//             stopOpacity?: number | string
//             strikethroughPosition?: number | string
//             strikethroughThickness?: number | string
//             string?: number | string
//             stroke?: string
//             strokeDasharray?: string | number
//             strokeDashoffset?: string | number
//             strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
//             strokeLinejoin?: 'miter' | 'round' | 'bevel' | 'inherit'
//             strokeMiterlimit?: number | string
//             strokeOpacity?: number | string
//             strokeWidth?: number | string
//             surfaceScale?: number | string
//             systemLanguage?: number | string
//             tableValues?: number | string
//             targetX?: number | string
//             targetY?: number | string
//             textAnchor?: string
//             textDecoration?: number | string
//             textLength?: number | string
//             textRendering?: number | string
//             to?: number | string
//             transform?: string
//             u1?: number | string
//             u2?: number | string
//             underlinePosition?: number | string
//             underlineThickness?: number | string
//             unicode?: number | string
//             unicodeBidi?: number | string
//             unicodeRange?: number | string
//             unitsPerEm?: number | string
//             vAlphabetic?: number | string
//             values?: string
//             vectorEffect?: number | string
//             version?: string
//             vertAdvY?: number | string
//             vertOriginX?: number | string
//             vertOriginY?: number | string
//             vHanging?: number | string
//             vIdeographic?: number | string
//             viewBox?: string
//             viewTarget?: number | string
//             visibility?: number | string
//             vMathematical?: number | string
//             widths?: number | string
//             wordSpacing?: number | string
//             writingMode?: number | string
//             x1?: number | string
//             x2?: number | string
//             x?: number | string
//             xChannelSelector?: string
//             xHeight?: number | string
//             xlinkActuate?: string
//             xlinkArcrole?: string
//             xlinkHref?: string
//             xlinkRole?: string
//             xlinkShow?: string
//             xlinkTitle?: string
//             xlinkType?: string
//             xmlBase?: string
//             xmlLang?: string
//             xmlns?: string
//             xmlnsXlink?: string
//             xmlSpace?: string
//             y1?: number | string
//             y2?: number | string
//             y?: number | string
//             yChannelSelector?: string
//             z?: number | string
//             zoomAndPan?: string
//         }
//
//         type ElementBuilder<T, P extends HTMLElement> = T & Listeners<HTMLElementEventMap<P>>
//         type SVGElementBuilder<T, P extends SVGElement> = T & Listeners<HTMLElementEventMap<P>>
//
//         interface HTMLElements {
//             a: ElementBuilder<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
//             abbr: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             address: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             area: ElementBuilder<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>
//             article: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             aside: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             audio: ElementBuilder<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>
//             b: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             base: ElementBuilder<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>
//             bdi: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             bdo: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             big: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             blockquote: ElementBuilder<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
//             body: ElementBuilder<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
//             br: ElementBuilder<HTMLAttributes<HTMLBRElement>, HTMLBRElement>
//             button: ElementBuilder<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
//             canvas: ElementBuilder<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
//             caption: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             cite: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             code: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             col: ElementBuilder<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
//             colgroup: ElementBuilder<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
//             data: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             datalist: ElementBuilder<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
//             dd: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             del: ElementBuilder<DelHTMLAttributes<HTMLElement>, HTMLElement>
//             details: ElementBuilder<DetailsHTMLAttributes<HTMLElement>, HTMLElement>
//             dfn: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             dialog: ElementBuilder<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
//             div: ElementBuilder<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//             dl: ElementBuilder<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
//             dt: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             em: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             embed: ElementBuilder<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
//             fieldset: ElementBuilder<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
//             figcaption: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             figure: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             footer: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             form: ElementBuilder<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
//             h1: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             h2: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             h3: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             h4: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             h5: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             h6: ElementBuilder<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
//             head: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLHeadElement>
//             header: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             hgroup: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             hr: ElementBuilder<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
//             html: ElementBuilder<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
//             i: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             iframe: ElementBuilder<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
//             img: ElementBuilder<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
//             input: ElementBuilder<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
//             ins: ElementBuilder<InsHTMLAttributes<HTMLModElement>, HTMLModElement>
//             kbd: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             keygen: ElementBuilder<KeygenHTMLAttributes<HTMLElement>, HTMLElement>
//             label: ElementBuilder<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
//             legend: ElementBuilder<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>
//             li: ElementBuilder<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
//             link: ElementBuilder<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
//             main: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             map: ElementBuilder<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>
//             mark: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             menu: ElementBuilder<MenuHTMLAttributes<HTMLElement>, HTMLElement>
//             menuitem: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             meta: ElementBuilder<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
//             meter: ElementBuilder<MeterHTMLAttributes<HTMLElement>, HTMLElement>
//             nav: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             noscript: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             object: ElementBuilder<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
//             ol: ElementBuilder<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
//             optgroup: ElementBuilder<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
//             option: ElementBuilder<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
//             output: ElementBuilder<OutputHTMLAttributes<HTMLElement>, HTMLElement>
//             p: ElementBuilder<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
//             param: ElementBuilder<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>
//             picture: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             pre: ElementBuilder<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
//             progress: ElementBuilder<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>
//             q: ElementBuilder<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
//             rp: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             rt: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             ruby: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             s: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             samp: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             script: ElementBuilder<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
//             section: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             select: ElementBuilder<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
//             small: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             source: ElementBuilder<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>
//             span: ElementBuilder<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
//             strong: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             style: ElementBuilder<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>
//             sub: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             summary: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             sup: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             table: ElementBuilder<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
//             tbody: ElementBuilder<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
//             td: ElementBuilder<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
//             textarea: ElementBuilder<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
//             tfoot: ElementBuilder<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
//             th: ElementBuilder<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>
//             thead: ElementBuilder<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
//             time: ElementBuilder<TimeHTMLAttributes<HTMLElement>, HTMLElement>
//             title: ElementBuilder<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
//             tr: ElementBuilder<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
//             track: ElementBuilder<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>
//             u: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             ul: ElementBuilder<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
//             var: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//             video: ElementBuilder<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
//             wbr: ElementBuilder<HTMLAttributes<HTMLElement>, HTMLElement>
//         }
//         interface SVGElements {
//             animate: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             circle: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             clipPath: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             defs: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             desc: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             ellipse: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feBlend: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feColorMatrix: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feComponentTransfer: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feComposite: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feConvolveMatrix: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feDiffuseLighting: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feDisplacementMap: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feDistantLight: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feDropShadow: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feFlood: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feFuncA: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feFuncB: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feFuncG: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feFuncR: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feGaussianBlur: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feImage: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feMerge: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feMergeNode: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feMorphology: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feOffset: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             fePointLight: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feSpecularLighting: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feSpotLight: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feTile: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             feTurbulence: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             filter: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             foreignObject: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             g: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             image: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             line: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             linearGradient: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             marker: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             mask: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             metadata: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             path: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             pattern: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             polygon: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             polyline: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             radialGradient: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             rect: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             stop: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             svg: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             switch: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             symbol: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             text: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             textPath: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             tspan: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             use: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//             view: SVGElementBuilder<SVGAttributes<SVGElement>, SVGElement>
//         }
//         type Elements = HTMLElements & SVGElements
//     }
//     namespace JSX {
//         interface Element extends VueTSX.VNode {}
//         interface ElementClass extends VueTSX.BaseComponent {}
//         interface ElementAttributesProperty {
//             $_props: {}
//         }
//         interface IntrinsicAttributes extends VueTSX.HTMLAttributes<HTMLElement> {}
//         interface IntrinsicElements extends VueTSX.Elements {
//
//             [elem: string]: any;
//         }
//     }
// }
//
// export const Component: VueTSX.ComponentCreator
// export const Vue: VueTSX.Vue
// export const Watch: VueTSX.Watch