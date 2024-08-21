import {
    Box,
    CloseButton,
    Flex,
    Heading,
    VStack,
} from '~/bundles/common/components/components.js';

type Properties = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

const MenuBody: React.FC<Properties> = ({
    title,
    children,
    isOpen,
    onClose,
}) => {
    return (
        <>
            {isOpen && (
                <Box
                    position="fixed"
                    top="5%"
                    left="8%"
                    height="85vh"
                    width="335px"
                    zIndex={1000}
                    boxShadow="lg"
                    bg="background.900"
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading as="h3" size="md">
                            {title}
                        </Heading>
                        <CloseButton onClick={onClose} color="white" />
                    </Flex>
                    <VStack mt={4} spacing={4} align="start">
                        {children}
                    </VStack>
                </Box>
            )}
        </>
    );
};

export { MenuBody };
