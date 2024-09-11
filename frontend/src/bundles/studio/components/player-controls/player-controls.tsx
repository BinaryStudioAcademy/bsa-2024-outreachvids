import { type PlayerRef } from '@remotion/player';
import { secondsToMilliseconds } from 'date-fns';
import { type RefObject } from 'react';

import { Flex } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';

import { FPS } from '../audio-player/constants/constants.js';
import { Control } from '../components.js';
import { TimeDisplay } from './components/components.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const PlayerControls: React.FC<Properties> = ({ playerRef }) => {
    const dispatch = useAppDispatch();
    const { isPlaying, elapsedTime, scenes } = useAppSelector(({ studio }) => ({
        isPlaying: studio.player.isPlaying,
        elapsedTime: studio.player.elapsedTime,
        scenes: studio.scenes,
    }));
    const totalDuration = useAppSelector(selectTotalDuration);
    const scenesWithSpan = useMemo(() => setItemsSpan(scenes), [scenes]);

    const handleTogglePlaying = useCallback((): void => {
        if (elapsedTime >= totalDuration) {
            void dispatch(studioActions.setElapsedTime(0));
        }
        playerRef.current?.toggle();

        void dispatch(studioActions.setPlaying(!isPlaying));
    }, [elapsedTime, totalDuration, dispatch, isPlaying, playerRef]);

    const handleSkipToNextScene = useCallback((): void => {
        const currentScene = scenesWithSpan.find(
            (scene) =>
                elapsedTime >= scene.span.start && elapsedTime < scene.span.end,
        );

        if (!currentScene) {
            return;
        }
        playerRef.current?.seekTo((currentScene.span.end / 1000) * FPS);
        void dispatch(studioActions.setElapsedTime(currentScene.span.end));
    }, [dispatch, elapsedTime, scenesWithSpan, playerRef]);

    const handleSkipToPreviousScene = useCallback((): void => {
        const currentSceneIndex = scenesWithSpan.findIndex(
            (scene) =>
                elapsedTime > scene.span.start && elapsedTime <= scene.span.end,
        );

        const currentScene = scenesWithSpan[currentSceneIndex];

        if (!currentScene) {
            return;
        }

        const isCloseToStart =
            elapsedTime - currentScene.span.start <
            secondsToMilliseconds(SKIP_TO_PREV_SCENE_THRESHOLD);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

        playerRef.current?.seekTo((previousScene.span.start / 1000) * FPS);
        void dispatch(studioActions.setElapsedTime(previousScene.span.start));
    }, [dispatch, elapsedTime, scenesWithSpan, playerRef]);

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
                    onClick={handleClick}
                />

                <Control
                    label="Skip to the next scene"
                    size={IconSize.EXTRA_SMALL}
                    icon={IconName.PLAY_STEP_NEXT}
                />

                <TimeDisplay currentTime={currentTime} duration={duration} />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
