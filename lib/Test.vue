<script lang="ts">
    import { css } from 'styled-components';

    export default {

        methods: {
            generateAndInjectStyles (componentProps) {
                return componentStyle.generateAndInjectStyles(componentProps)
            }
        },
        computed: {
            generatedClassName () {
                const componentProps = { theme: this.theme, ...this.$props }
                return this.generateAndInjectStyles(componentProps)
            },
            theme () {
                return this.$theme()
            }
        },
        watch: {
            value (newValue) {
                this.localValue = newValue
            },
            localValue () {
                this.$emit('input', this.localValue)
            }
        },
        extend (cssRules:TemplateStringsArray, ...interpolations:TemplateStringsArray[]) {
            const extendedRules = css(cssRules, ...interpolations)
            return //;createStyledComponent(target, rules.concat(extendedRules), props)
        },
        withComponent (newTarget) {
            return //createStyledComponent(newTarget, rules, props)
        }
    }
</script>