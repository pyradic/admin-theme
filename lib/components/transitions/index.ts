import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue';


export const ExpandTransition: FunctionalComponentOptions = {
    functional: true,
    props     : [ 'enabled', 'show' ],
    render(h: CreateElement, context: RenderContext) {
        return h('transition', {
            props: { name: context.props.enabled ? 'expand' : null, mode: 'out-in' },
            on   : {
                enter(el) { el.style.height = el.scrollHeight + 'px' },
                afterEnter(el) { el.style.height = 'auto' },
                beforeLeave(el) { el.style.height = el.scrollHeight + 'px' },
                leave(el) { el.style.height = el.scrollHeight + 'px' },
                afterLeave(el) { el.style.display = 'none' },
            },
        }, context.children)
    },
}
