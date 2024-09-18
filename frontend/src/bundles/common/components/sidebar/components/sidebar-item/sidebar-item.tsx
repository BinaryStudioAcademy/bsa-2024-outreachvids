import { type ReactElement } from 'react';

import { Box } from '~/bundles/common/components/components.js';

import styles from '../../styles.module.css';

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
            className={`${styles['sidebar-item']} ${isCollapsed ? styles['item-justify-center'] : styles['item-justify-start']}`}
            bg={bg}
            color={color}
            onClick={onClick}
        >
            {icon}
            {isCollapsed ? '' : label}
        </Box>
    );
};

export { SidebarItem };
