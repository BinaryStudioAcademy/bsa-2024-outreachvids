import { Fade, Flex } from '@chakra-ui/react';

type Properties = {
    isOpen: boolean;
    children: React.ReactNode;
};

const Overlay = ({ isOpen, children }: Properties): JSX.Element => {
    return (
        <Fade in={isOpen}>
            <Flex
                width="full"
                height="full"
                position="absolute"
                background="shadow.700"
                color="white"
                justifyContent="center"
                alignItems="center"
            >
                {children}
            </Flex>
        </Fade>
    );
};

export { Overlay };
