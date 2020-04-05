<template>
    <div :class="classes" :style="style">
        <template v-if="debug">
            <div class="span3">
                <div class="span1 ellipsis">
                    <h1>Error {{ code }}</h1>
                </div>
            </div>
            <h2>{{ name }}</h2>
            <p>{{ summary }}</p>
            <hr>

            <h3>What does this mean?</h3>

            <p>
                Something went wrong on our side while we were processing your request.
                {{ message }}
            </p>
            <p>
                This occurrence has been logged. We're really sorry about this, and will
                work hard to get this resolved as soon as possible.
            </p>
            <p>
                This error can be identified by <i>{{ errorId }}</i>.
                You might want to take a note of this code.
            </p>
            <p>
                Perhaps you would like to go to our <a href="/admin">home page</a>?
            </p>
        </template>
        <template v-else>
            <h1>E</h1>
        </template>
    </div>
</template>
<style lang="scss">
@import '~@pyro/admin-theme/lib/styling/base';


$http-error-prefix : #{$prefix}-http-error;

.#{$http-error-prefix} {
    padding : 10px;
}
</style>
<script lang="ts">
import { Component, component, prop, route, Styles } from '@pyro/platform';

@component()
export default class HttpError extends Component {
    @prop.classPrefix('http-error') classPrefix: string;
    @prop.boolean() debug: boolean;
    @prop.number() code: number;
    @prop.string() name: string;
    @prop.string() summary: string;
    @prop.string() message: string;
    @prop.string() errorId: string;
    route = route;

    get classes() {return { [ this.classPrefix ]: true }; }

    get style(): Styles { return {}; }
}
</script>