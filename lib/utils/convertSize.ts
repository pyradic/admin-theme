import { ElementUIComponentSize } from 'element-ui/types/component';
import { objectKeyValueSwitch }   from '@pyro/platform';

export type BootstrapSize = 'lg' | 'md' | 'sm' | 'xs'

export interface ConvertSize {
    sizes: {
        bootstrapToElementUI: Record<BootstrapSize, ElementUIComponentSize>
        elementUIToBootstrap: Record<ElementUIComponentSize, BootstrapSize>
    }

    toElementUI(bootstrapSize: BootstrapSize): ElementUIComponentSize

    toBootstrap(elementUISize: ElementUIComponentSize): BootstrapSize
}

export const convertSize: ConvertSize = {
    sizes: {
        bootstrapToElementUI: {
            lg: 'large',
            md: 'medium',
            sm: 'small',
            xs: 'mini',
        },
        elementUIToBootstrap: {} as any,
    },
    toElementUI(bootstrapSize: BootstrapSize): ElementUIComponentSize {
        return bootstrapSize in this.sizes.bootstrapToElementUI ? this.sizes.bootstrapToElementUI[ bootstrapSize ] : bootstrapSize;
    },
    toBootstrap(elementUISize: ElementUIComponentSize): BootstrapSize {
        return this.sizes.elementUIToBootstrap[ elementUISize ];
    },
};

convertSize.sizes.elementUIToBootstrap = objectKeyValueSwitch(convertSize.sizes.bootstrapToElementUI);