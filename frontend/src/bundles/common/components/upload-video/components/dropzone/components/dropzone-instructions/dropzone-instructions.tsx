import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Flex, Icon, Text } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { INSTRUCTION } from './libs/constants/constants.js';

const DropzoneInstructions = (): JSX.Element => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
        >
            <Text color="background.600" fontWeight="bold" fontSize="x-large">
                <Icon
                    paddingRight="10px"
                    fontSize="40px"
                    as={FontAwesomeIcon}
                    icon={IconName.CLOUD_ARROW_DOWN}
                    color="background.600"
                />
                Drag and drop your footage here
            </Text>
            <Text color="gray" maxWidth="393px">
                {INSTRUCTION}
            </Text>
        </Flex>
    );
};

export { DropzoneInstructions };
