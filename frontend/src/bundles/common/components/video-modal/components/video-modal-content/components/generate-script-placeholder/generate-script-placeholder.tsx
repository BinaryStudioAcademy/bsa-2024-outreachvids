import { Icon, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

type Properties = {
    generatedText: string;
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({ generatedText }) => {
    const isGenearatedTextEmpty = useMemo(() => generatedText.length === 0, [generatedText]);

    return (
        <VStack w="full" p="40px" gap="10px">
            {isGenearatedTextEmpty && (
                <Icon
                    as={FontAwesomeIcon}
                    icon={IconName.SCROLL}
                    color="brand.secondary.300"
                    opacity="0.5"
                    size="2x"
                />
            )}
            <Text
                color="gray.400"
                // variant="H3"
                // w="40%"
                minWidth="175px"
                // textAlign="center"
                // fontStyle="italic"
            >
                {isGenearatedTextEmpty
                    ? 'Here you will see your generated script'
                    : generatedText}
            </Text>
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
