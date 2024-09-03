import {
    Flex,
    Heading,
    Icon,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { INSTRUCTION } from './libs/constants/constants.js';

const DropzoneInstructions: React.FC = () => {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
        >
            <Heading color="background.600" variant="H2">
                <Icon
                    paddingRight="10px"
                    fontSize="50px"
                    as={IconName.CLOUD_ARROW_DOWN}
                    color="background.600"
                />
                Drag and drop your footage here
            </Heading>
            <Text color="gray" maxWidth="393px">
                {INSTRUCTION}
            </Text>
        </Flex>
    );
};

export { DropzoneInstructions };
