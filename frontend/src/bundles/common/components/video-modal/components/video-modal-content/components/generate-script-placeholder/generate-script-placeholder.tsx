import { Icon, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName } from '~/bundles/common/icons/icons.js';

const GenerateScriptPlaceholder: React.FC = () => {
    return (
        <VStack w="full" p="40px" gap="10px">
            <Icon
                as={FontAwesomeIcon}
                icon={IconName.SCROLL}
                color="brand.secondary.300"
                opacity="0.5"
                size="2x"
            />
            <Text
                color="gray.400"
                variant="H3"
                w="40%"
                minWidth="175px"
                textAlign="center"
                fontStyle="italic"
            >
                Here you will see your generated script
            </Text>
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
