import { type ReactElement } from 'react';

import { Box } from '~/bundles/common/components/components.js';

import styles from '../../sidebar.module.css';

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
            className={`${styles['sidebarItem']} ${isCollapsed ? styles['itemJustifyCenter'] : styles['itemJustifyStart']}`}
            style={{ backgroundColor: bg, color }}
            onClick={onClick}
        >
            {icon}
            {isCollapsed ? '' : label}
        </Box>
    );
};

export { SidebarItem };
