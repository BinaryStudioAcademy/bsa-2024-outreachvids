import { Flex } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Control, TimeDisplay } from './components/components.js';

const PlayerControls: React.FC = () => {
    // Mocked data. Update later
    const duration = 10;

    const dispatch = useAppDispatch();
    const { isPlaying } = useAppSelector(({ studio }) => ({
        isPlaying: studio.player.isPlaying,
    }));

    const handleTogglePlaying = useCallback((): void => {
        void dispatch(studioActions.setPlaying(!isPlaying));
    }, [dispatch, isPlaying]);

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
                    size={IconSize.EXTRA_SMALL}
                    icon={IconName.PLAY_STEP_BACK}
                />

                <Control
                    label={isPlaying ? 'Pause' : 'Play video'}
                    size={IconSize.SMALL}
                    icon={isPlaying ? IconName.PAUSE : IconName.PLAY}
                    onClick={handleTogglePlaying}
                />

                <Control
                    label="Skip to the next scene"
                    size={IconSize.EXTRA_SMALL}
                    icon={IconName.PLAY_STEP_NEXT}
                />

                <TimeDisplay duration={duration} />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
