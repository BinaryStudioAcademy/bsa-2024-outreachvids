import { type ReactElement } from 'react';

import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    bg?: string;
    color?: string;
    handleClick?: () => void;
    icon: ReactElement;
    isCollapsed: boolean;
    label: string;
};

const CollapseButton = ({
    bg = 'none',
    color = 'white',
    handleClick = (): void => {},
    icon,
    isCollapsed,
    label,
}: Properties): JSX.Element => {
    return (
        <Box
            as="button"
            w="100%"
            h="50px"
            color={color}
            display="flex"
            justifyContent={isCollapsed ? 'center' : 'flex-start'}
            alignItems="center"
            gap="10px"
            fontSize="1rem"
            fontWeight="bold"
            bg={bg}
            borderRadius="10px"
            p="10px"
            onClick={handleClick}
        >
            {icon}
            {isCollapsed ? '' : label}
        </Box>
    );
};

export { type Properties as CollapseButtonProperties, CollapseButton };
