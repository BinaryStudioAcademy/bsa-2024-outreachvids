import {
    Box,
    CloseButton,
    Flex,
    Heading,
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
                        padding: '12px 18px 0 18px',
                        zIndex: 1000,
                        borderRadius: '8px',
                        boxShadow: 'lg',
                        bg: 'background.900',
                        color: 'white',
                    }}
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom="30px"
                    >
                        <Heading variant="H3">{title}</Heading>
                        <CloseButton onClick={onClose} color="background.600" />
                    </Flex>
                    <Box
                        sx={{
                            overflowY: 'auto',
                            maxHeight: 'calc(100% - 65px)',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            )}
        </>
    );
};

export { MenuBody };
