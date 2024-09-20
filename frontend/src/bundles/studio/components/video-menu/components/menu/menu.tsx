import { Box, Flex, VStack } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type MenuItems } from '~/bundles/studio/enums/enums.js';

import { type MenuItem } from '../../types/types.js';
import styles from './styles.module.css';

type Properties = {
    items: Record<ValueOf<typeof MenuItems>, MenuItem>;
    activeItem: ValueOf<typeof MenuItems> | null;
    onActiveItemSet: (item: ValueOf<typeof MenuItems>) => void;
};

const Menu: React.FC<Properties> = ({ items, activeItem, onActiveItemSet }) => {
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            onActiveItemSet(
                event.currentTarget.dataset['menuItem'] as ValueOf<
                    typeof MenuItems
                >,
            );
        },
        [onActiveItemSet],
    );

    return (
        <Box className={styles['menu-container']}>
            <VStack spacing={1} align="stretch" className={styles['v-stack']}>
                {Object.entries(items).map(([key, item]) => (
                    <Flex
                        key={key}
                        data-menu-item={key}
                        onClick={handleClick}
                        className={`${styles['menu-item']} ${
                            activeItem === key ? styles['menu-item-active'] : ''
                        }`}
                    >
                        <Box className={styles['icon']}>{item.icon}</Box>
                        <Box className={styles['label']}>{item.label}</Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export { Menu };
