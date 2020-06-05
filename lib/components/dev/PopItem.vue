<style lang="scss">
.py-pop {
    $self : &;

    &__item {
        &.is-open {
            #{$self}__sub {
                display : block;
            }
        }
    }

    &__content {}

    &__sub {
        display    : none;
        background : white;
        border     : 2px solid midnightblue;
        padding    : 5px;
    }
}
</style>
<template>
    <div :class="classes">
        <div ref="content" class="py-pop__content" @click="handleClick">
            <slot>{{ title || '' }}</slot>
        </div>
        <div ref="submenu" class="py-pop__sub" v-show="$slots.submenu && this.open">
            <slot name="submenu"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, component, inject, prop } from '@crvs/platform';
import Popper, { PopperOptions }              from 'popper.js';
import Pop                                    from './Pop.vue';
import { placements }                         from './utils';


@component({
    provide() {
        return { parent: this };
    },
})
export default class PopItem extends Component {
    $refs: { content: HTMLElement, submenu: HTMLElement };
    @inject({ default: null }) parent: PopItem;
    @inject() root: typeof Pop.prototype;

    @prop.classPrefix('pop__item') classPrefix: string;
    @prop.string() title;

    open = false;
    popper: Popper;

    get classes() {
        return {
            [ this.classPrefix ]: true,
            'is-open'           : this.open,
        };
    }

    get hasParent() { return !!this.parent; }

    get hasChildren() {return !!this.$slots.submenu;}

    hasParentPopper() {return this.hasParent && this.parent.hasPopper();}

    hasPopper() {return this.popper !== undefined; }

    getParentPoppers(){
        let parent = this.parent;
        let poppers:Popper[] = []
        while(parent){
            if(parent && parent.popper !== undefined){
                poppers.push(parent.popper)
            }
            parent = parent.parent
        }
        return poppers
    }

    createPopper() {
        this.destroyPopper();
        this.popper = new Popper(this.$el, this.$refs.submenu, this.calculatePopper());
    }

    calculatePopper(): PopperOptions {
        let ppo: PopperOptions;
        if ( this.hasParentPopper() ) {
            ppo = this.parent.popper.options;
        }

        let po: PopperOptions = {
            placement: 'bottom',
            modifiers: {
                offset: {
                    offset: 10,
                },
            },
        };

        let grow = this.root.grow;
        let [ position,placement] = placements[grow]
        let parentPoppers = this.getParentPoppers();
        let iParentPoppers = parentPoppers.length

        if(iParentPoppers === 0){
            po.placement = position
        } else if(iParentPoppers > 0){
            po.placement = placement
        }

        this.$log('calculatePopper', '    po:', po, '     haspp:', this.hasParentPopper(), '       ppo:', ppo, '    pps:', this.getParentPoppers());
        return po;
    }

    destroyPopper() {
        if ( this.popper ) {
            this.popper.destroy();
            delete this.popper;
        }
    }

    handleClick(event) {
        this.$log('handleClick', this.open, this.popper);
        if ( this.hasChildren ) {
            this.open = !this.open;
            this.open ? this.createPopper() : this.destroyPopper();
        }
    }
}
</script>