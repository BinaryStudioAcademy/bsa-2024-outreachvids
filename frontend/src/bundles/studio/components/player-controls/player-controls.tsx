import { secondsToMilliseconds } from 'date-fns';

import { Flex } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { SKIP_TO_PREV_SCENE_THRESHOLD } from '~/bundles/studio/constants/constants.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Control } from '../components.js';
import { TimeDisplay } from './components/components.js';

const PlayerControls: React.FC = () => {
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

        void dispatch(studioActions.setPlaying(!isPlaying));
    }, [elapsedTime, totalDuration, dispatch, isPlaying]);

    const handleSkipToNextScene = useCallback((): void => {
        const currentScene = scenesWithSpan.find(
            (scene) =>
                elapsedTime >= scene.span.start && elapsedTime < scene.span.end,
        );

        if (!currentScene) {
            return;
        }

        void dispatch(studioActions.setElapsedTime(currentScene.span.end));
    }, [dispatch, elapsedTime, scenesWithSpan]);

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

        const previousScene = isCloseToStart
            ? (scenesWithSpan[currentSceneIndex - 1] ?? currentScene)
            : currentScene;

        void dispatch(studioActions.setElapsedTime(previousScene.span.start));
    }, [dispatch, elapsedTime, scenesWithSpan]);

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
                    onClick={handleSkipToPreviousScene}
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
                    onClick={handleSkipToNextScene}
                />

                <TimeDisplay />
            </Flex>
        </Flex>
    );
};

export { PlayerControls };
