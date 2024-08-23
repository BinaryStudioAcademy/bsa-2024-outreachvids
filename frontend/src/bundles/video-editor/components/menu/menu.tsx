import { Box, Flex, VStack } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { type MenuItem } from '../../types/types.js';

type Properties = {
    items: MenuItem[];
    activeIndex: number | null;
    setActiveIndex: (index: number) => void;
};

const Menu: React.FC<Properties> = ({ items, activeIndex, setActiveIndex }) => {
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

                setActiveIndex(index);
                item.onClick();
            };
        },
        [setActiveIndex, items],
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
            }}
        >
            <VStack spacing={1} align="stretch" p={2} w="100%">
                {items.map((item, index) => (
                    <Flex
                        key={index}
                        onClick={handleClick(index)}
                        sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                            w: '66px',
                            gap: 1,
                            cursor: 'pointer',
                            borderRadius: '8px',
                            bg:
                                activeIndex === index
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
