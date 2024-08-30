import {
    Box,
    CloseButton,
    Flex,
    Heading,
    VStack,
} from '~/bundles/common/components/components.js';

type Properties = {
    title: string | React.ReactNode;
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
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '100px',
                        height: '72vh',
                        width: '335px',
                        p: 4,
                        zIndex: 1000,
                        borderRadius: '8px',
                        boxShadow: 'lg',
                        bg: 'background.900',
                        color: 'white',
                    }}
                >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading variant="H3">{title}</Heading>
                        <CloseButton onClick={onClose} color="background.600" />
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
