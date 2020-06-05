import { component, Component, prop, Styles } from '@crvs/platform';

@component()
export class ShortcutTypeMixin extends Component {
    classPrefix:string
    @prop.string() label: string;
    @prop.string() title: string;
    @prop.string() href: string;
    @prop.string() slug: string;
    @prop.string() icon: string;
    @prop.string('default') type: string;
    @prop.boolean() highlighted: boolean;
    @prop.array() children: any[];
    @prop.object(() => ({})) attributes: string;

    get classes() {
        return {
            [ this.classPrefix ]: true,
        };
    }

    get style(): Styles {
        return {};
    }

    mounted(){
        this.$log('fhg', this)
    }

    handleMouseEnter(event: MouseEvent) {
        this.$log('handleMouseEnter', 'shortcut-info:set', this.title, event);
        this.$py.events.emit('shortcut-info:set', this.title);
    }

    handleMouseOut(event: MouseEvent) {
        this.$log('handleMouseOut', 'shortcut-info:unset', event);
        this.$py.events.emit('shortcut-info:unset');
    }

    handleClick(event: MouseEvent) {
        this.$log('handleClick', event);
        this.$emit('click', event);
    }
    get classNames() {
        return {
            icon : { [ `${this.classPrefix}__icon` ]: true},
            iconClass : { [ this.icon ]: true },
            label: `${this.classPrefix}__label`,
        };
    }
}