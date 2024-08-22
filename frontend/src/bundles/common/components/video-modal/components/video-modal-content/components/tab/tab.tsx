import { Icon, Tab as ChakraTab } from '@chakra-ui/react';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Properties = {
    label: string;
    icon: IconDefinition;
};

const Tab = ({ label, icon }: Properties): JSX.Element => {
    return (
        <ChakraTab
            justifyContent="stretch"
            borderRadius="10px"
            textAlign="left"
            _selected={{ backgroundColor: 'gray.300' }}
        >
            <Icon
                as={FontAwesomeIcon}
                icon={icon}
                padding="5px"
                height="16px"
            />{' '}
            {label}
        </ChakraTab>
    );
};

export { Tab };