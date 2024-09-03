import { type ReactElement } from 'react';

import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    icon: ReactElement;
    isCollapsed: boolean;
    label: string;
    bg?: string;
    color?: string;
    onClick?: () => void;
};

const SidebarItem = ({
    icon,
    isCollapsed,
    label,
    bg = 'none',
    color = 'white',
    onClick = (): void => {},
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
            onClick={onClick}
        >
            {icon}
            {isCollapsed ? '' : label}
        </Box>
    );
};

export { SidebarItem };
