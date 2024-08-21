import { Box, Flex, VStack } from '~/bundles/common/components/components.js';

type MenuItem = {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
};

type MenuProperties = {
    items: MenuItem[];
};

const Menu: React.FC<MenuProperties> = ({ items }) => {
    return (
        <Box w="7%" h="100%" color="white" bg="background.900">
            <VStack spacing={6} align="stretch" p={4} w="100%">
                {items.map((item, index) => (
                    <Flex
                        key={index}
                        flexDirection="column"
                        alignItems="center"
                        padding={2}
                        gap={1}
                        cursor="pointer"
                        onClick={item.onClick}
                    >
                        {item.icon}
                        <div>{item.label}</div>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export { Menu };
