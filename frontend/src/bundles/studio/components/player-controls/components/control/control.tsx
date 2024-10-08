import { type ElementType } from 'react';

import {
    Icon,
    IconButton,
    Tooltip,
} from '~/bundles/common/components/components.js';
import { type IconSizeT } from '~/bundles/common/icons/icons.js';

type Properties = {
    label: string;
    size: IconSizeT;
    icon: ElementType;
    onClick?: () => void;
};

const Control: React.FC<Properties> = ({
    label,
    size,
    icon,
    onClick = (): void => {},
}) => {
    return (
        <Tooltip hasArrow label={label} placement="top">
            <IconButton
                aria-label={label}
                isRound={true}
                size={size}
                variant="gray"
                icon={<Icon as={icon} />}
                onClick={onClick}
            />
        </Tooltip>
    );
};

export { Control };
