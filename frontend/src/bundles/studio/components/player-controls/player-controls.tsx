import { Flex } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { Control, TimeDisplay } from './components/components.js';

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
                <Control
                    label="Skip to the previous scene"
                    size="xs"
                    icon={IconName.PLAY_STEP_BACK}
                />

                <Control
                    label={isPlaying ? 'Pause' : 'Play video'}
                    size="sm"
                    icon={isPlaying ? IconName.PAUSE : IconName.PLAY}
                    onClick={handleClick}
                />

                <Control
                    label="Skip to the next scene"
                    size="xs"
                    icon={IconName.PLAY_STEP_NEXT}
                />

                <TimeDisplay currentTime={currentTime} duration={duration} />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
