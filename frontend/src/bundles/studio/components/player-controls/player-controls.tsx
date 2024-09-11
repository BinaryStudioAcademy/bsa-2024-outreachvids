import { type PlayerRef } from '@remotion/player';
import { type RefObject } from 'react';

import { Flex } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Control, TimeDisplay } from './components/components.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const PlayerControls: React.FC<Properties> = ({ playerRef }) => {
    const dispatch = useAppDispatch();
    const { isPlaying, elapsedTime } = useAppSelector(({ studio }) => ({
        isPlaying: studio.player.isPlaying,
        elapsedTime: studio.player.elapsedTime,
    }));
    const totalDuration = useAppSelector(selectTotalDuration);

    const handleTogglePlaying = useCallback((): void => {
        if (elapsedTime >= totalDuration) {
            void dispatch(studioActions.setElapsedTime(0));
        }
        playerRef.current?.toggle();

        void dispatch(studioActions.setPlaying(!isPlaying));
    }, [elapsedTime, totalDuration, dispatch, isPlaying, playerRef]);

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

                <TimeDisplay />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
