import { Fade, Flex } from '@chakra-ui/react';

type Properties = {
    isOpen: boolean;
    children: React.ReactNode;
};

const Overlay = ({ isOpen, children }: Properties): JSX.Element => {
    return (
        <Fade
            in={isOpen}
            hidden={!isOpen}
            style={{
                zIndex: '101',
                position: 'fixed',
                top: '0',
                right: '0',
            }}
        >
            <Flex
                zIndex="101"
                background="shadow.700"
                color="white"
                justifyContent="center"
                alignItems="center"
                width="100vw"
                height="100vh"
            >
                {children}
            </Flex>
        </Fade>
    );
};

export { Overlay };
