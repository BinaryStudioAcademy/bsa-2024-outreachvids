import {
    type ComponentWithAs,
    type IconProps,
    createIcon,
} from '@chakra-ui/react';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const convertIcon = (
    faIcon: IconDefinition,
): ComponentWithAs<'svg', IconProps> => {
    const { icon, iconName } = faIcon;

    return createIcon({
        displayName: iconName,
        viewBox: `0 0 ${icon[0]} ${icon[1]}`,
        d: `${icon[4]}`,
    });
};

export { convertIcon };
