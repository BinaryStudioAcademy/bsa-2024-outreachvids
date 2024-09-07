import { Box, Flex, VStack } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type MenuItem } from '../../types/types.js';
import styles from './Menu.module.css';

type Properties = {
    items: MenuItem[];
    activeIndex: number | null;
    onActiveIndexSet: (index: number) => void;
};

const Menu: React.FC<Properties> = ({
    items,
    activeIndex,
    onActiveIndexSet,
}) => {
    const handleClick = useCallback(
        (index: number) => {
            return () => {
                if (!items || items.length === 0 || index >= items.length) {
                    return;
                }

                const item = items[index];
                if (!item) {
                    return;
                }

                onActiveIndexSet(index);
                item.onClick();
            };
        },
        [onActiveIndexSet, items],
    );

    return (
        <Box className={styles['menuContainer']}>
            <VStack spacing={1} align="stretch" className={styles['vStack']}>
                {items.map((item, index) => (
                    <Flex
                        key={index}
                        onClick={handleClick(index)}
                        className={`${styles['menuItem']} ${
                            activeIndex === index
                                ? styles['menuItemActive']
                                : ''
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
