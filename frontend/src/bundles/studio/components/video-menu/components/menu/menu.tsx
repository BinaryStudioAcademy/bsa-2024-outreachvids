import { Box, Flex, VStack } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type MenuItems } from '~/bundles/studio/enums/enums.js';

import { type MenuItem } from '../../types/types.js';

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
        <Box
            sx={{
                position: 'fixed',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                h: 'auto',
                w: '84px',
                bg: 'background.900',
                color: 'white',
                borderTopRightRadius: 'xl',
                borderBottomRightRadius: 'xl',
                zIndex: 100,
            }}
        >
            <VStack spacing={1} align="stretch" p={2} w="100%">
                {Object.entries(items).map(([key, item]) => (
                    <Flex
                        key={key}
                        data-menu-item={key}
                        onClick={handleClick}
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                            w: '66px',
                            gap: 1,
                            cursor: 'pointer',
                            borderRadius: '8px',
                            bg:
                                activeItem === key
                                    ? 'background.600'
                                    : 'transparent',
                            _hover: {
                                bg: 'background.600',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: 'xl',
                            }}
                        >
                            {item.icon}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '12px',
                            }}
                        >
                            {item.label}
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export { Menu };
