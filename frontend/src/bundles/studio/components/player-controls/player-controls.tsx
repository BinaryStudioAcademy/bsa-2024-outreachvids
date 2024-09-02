import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Flex,
    Icon,
    IconButton,
    Tooltip,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { TimeDisplay } from './components/components.js';

const PlayerControls: React.FC = () => {
    // Mocked data. Update later
    const currentTime = 5;
    const duration = 10;

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
                <Tooltip
                    hasArrow
                    label="Skip to the previous scene"
                    placement="top"
                >
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
                </Tooltip>

                <Tooltip
                    hasArrow
                    label={isPlaying ? 'Pause' : 'Play'}
                    placement="top"
                >
                    <IconButton
                        aria-label={isPlaying ? 'Pause' : 'Play video'}
                        isRound={true}
                        size="sm"
                        variant="gray"
                        icon={
                            <Icon
                                as={FontAwesomeIcon}
                                icon={
                                    isPlaying ? IconName.PAUSE : IconName.PLAY
                                }
                            />
                        }
                        onClick={handleClick}
                    />
                </Tooltip>

                <Tooltip
                    hasArrow
                    label="Skip to the next scene"
                    placement="top"
                >
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
                </Tooltip>

                <TimeDisplay currentTime={currentTime} duration={duration} />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
