import { Icon, Tab as ChakraTab, Text } from '@chakra-ui/react';
import { type ElementType } from 'react';

type Properties = {
    label: string;
    icon: ElementType;
};

const Tab: React.FC<Properties> = ({ label, icon }) => {
    return (
        <ChakraTab
            justifyContent="stretch"
            borderRadius="10px"
            textAlign="left"
            _selected={{ backgroundColor: 'gray.300' }}
        >
            <Icon as={icon} padding="5px" height="16px" />
            <Text variant="bodySmall" color="typography.900">
                {label}
            </Text>
        </ChakraTab>
    );
};

export { Tab };
