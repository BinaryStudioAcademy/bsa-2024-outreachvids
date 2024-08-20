import { Tab as ChakraTab } from '@chakra-ui/react';

type Properties = {
    label: string;
};

const Tab = ({ label }: Properties): JSX.Element => {
    return (
        <ChakraTab borderRadius="10px" _selected={{ backgroundColor: '' }}>
            {label}
        </ChakraTab>
    );
};

export { Tab };
