import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Flex,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { TimeDisplay } from './components/components.js';

const PlayerControllers: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleClick = useCallback((): void => {
        setIsPlaying((previous) => !previous);
    }, []);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height="45px"
            borderColor="background.50"
            borderWidth="1px"
        >
            <Flex alignItems="center" gap="11px" position="relative">
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
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    isRound={true}
                    size="sm"
                    variant="gray"
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={isPlaying ? IconName.PAUSE : IconName.PLAY}
                        />
                    }
                    onClick={handleClick}
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
                <TimeDisplay />
            </Flex>
        </Flex>
    );
};

export { PlayerControllers };
