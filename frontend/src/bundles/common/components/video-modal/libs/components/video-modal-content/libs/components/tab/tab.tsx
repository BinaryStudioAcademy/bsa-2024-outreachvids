import { Tab as ChakraTab } from '@chakra-ui/react';

type Properties = {
    label: string;
};

const Tab = ({ label }: Properties): JSX.Element => {
    return (
        <ChakraTab
            justifyContent="stretch"
            borderRadius="10px"
            textAlign="left"
            _selected={{ backgroundColor: 'gray.300' }}
        >
            {label}
        </ChakraTab>
    );
};

export { Tab };
