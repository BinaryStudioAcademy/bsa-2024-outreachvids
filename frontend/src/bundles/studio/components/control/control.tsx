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
    iconColor?: string;
    onClick?: (event: React.MouseEvent) => void;
    width?: string;
    height?: string;
    isRound?: boolean;
    variant?: string;
};

const Control: React.FC<Properties> = ({
    label,
    size,
    icon,
    iconColor,
    onClick = (): void => {},
    width,
    height,
    isRound = true,
    variant = 'gray',
}) => {
    return (
        <Tooltip hasArrow label={label} placement="top">
            <IconButton
                aria-label={label}
                isRound={isRound}
                {...(width && { width })}
                {...(height && { height })}
                size={size}
                variant={variant}
                icon={
                    <Icon as={icon} {...(iconColor && { color: iconColor })} />
                }
                onClick={onClick}
            />
        </Tooltip>
    );
};

export { Control };
