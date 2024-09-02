import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Flex,
    Icon,
    IconButton,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

const PlayerControllers: React.FC = () => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            gap="15px"
            height="45px"
            borderColor="background.50"
            borderWidth="1px"
        >
            <Flex alignItems="center" gap="11px">
                <IconButton
                    aria-label="Step back"
                    isRound={true}
                    size="xs"
                    variant="gray"
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.PLAY_STEP_BACK}
                        />
                    }
                />
                <IconButton
                    aria-label="Play"
                    isRound={true}
                    size="sm"
                    variant="gray"
                    icon={<Icon as={FontAwesomeIcon} icon={IconName.PLAY} />}
                />
                <IconButton
                    aria-label="Step next"
                    isRound={true}
                    size="xs"
                    variant="gray"
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.PLAY_STEP_NEXT}
                        />
                    }
                />
            </Flex>
            <Flex gap="2px">
                <Text color="typography.900" variant="caption">
                    00:00
                </Text>
                <Text color="background.50" variant="caption">
                    /
                </Text>
                <Text color="background.50" variant="caption">
                    00:10
                </Text>
            </Flex>
        </Flex>
    );
};

export { PlayerControllers };
