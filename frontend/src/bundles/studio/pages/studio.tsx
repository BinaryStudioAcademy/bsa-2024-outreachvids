import { type PlayerRef } from '@remotion/player';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Flex,
    Header,
    LibraryInput,
    Player,
    VStack,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useRef,
} from '~/bundles/common/hooks/hooks.js';
import { notificationService } from '~/bundles/common/services/services.js';

import {
    PlayerControls,
    Timeline,
    VideoMenu,
} from '../components/components.js';
import {
    SCRIPT_AND_AVATAR_ARE_REQUIRED,
    VIDEO_SUBMIT_FAILED_NOTIFICATION_ID,
    VIDEO_SUBMIT_NOTIFICATION_ID,
} from '../constants/constants.js';
import { NotificationMessage, NotificationTitle } from '../enums/enums.js';
import { actions as studioActionCreator } from '../store/studio.js';

const Studio: React.FC = () => {
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scripts = useAppSelector(({ studio }) => studio.scripts);
    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleResize = useCallback(() => {
        dispatch(studioActionCreator.changeVideoSize());
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        // TODO: REPLACE LOGIC WITH MULTIPLE SCENES
        const scene = scenes[0];
        const script = scripts[0];

        if (!scene?.avatar || !script) {
            notificationService.info({
                id: SCRIPT_AND_AVATAR_ARE_REQUIRED,
                message: NotificationMessage.SCRIPT_AND_AVATAR_ARE_REQUIRED,
                title: NotificationTitle.SCRIPT_AND_AVATAR_ARE_REQUIRED,
            });
            return;
        }

        dispatch(
            studioActionCreator.renderAvatar({
                avatarName: scene.avatar.name,
                avatarStyle: scene.avatar.style,
                text: script?.text,
                voice: script.voiceName,
            }),
        )
            .then(() => {
                notificationService.success({
                    id: VIDEO_SUBMIT_NOTIFICATION_ID,
                    message: NotificationMessage.VIDEO_SUBMITTED,
                    title: NotificationTitle.VIDEO_SUBMITTED,
                });
                navigate(AppRoute.ROOT);
            })
            .catch(() => {
                notificationService.error({
                    id: VIDEO_SUBMIT_FAILED_NOTIFICATION_ID,
                    message: NotificationMessage.VIDEO_SUBMIT_FAILED,
                    title: NotificationTitle.VIDEO_SUBMIT_FAILED,
                });
            });
    }, [dispatch, navigate, scenes, scripts]);

    return (
        <Box
            minHeight="100vh"
            height="100%"
            position="relative"
            display="flex"
            flexDirection="column"
        >
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        width="135px"
                        onClick={handleResize}
                    />
                }
                right={
                    <Flex gap="10px">
                        <LibraryInput
                            variant="unstyled"
                            placeholder="Untitled video"
                            color="white"
                        />
                        <Button
                            variant="primaryOutlined"
                            label="Submit"
                            sx={{ width: '100px' }}
                            onClick={handleSubmit}
                        />
                    </Flex>
                }
            />

            <VideoMenu />
            <Box flex="1 1 auto">
                <Player playerRef={playerReference} />
            </Box>

            <VStack alignItems={'stretch'}>
                <PlayerControls playerRef={playerReference} />
                <Box overflowY="auto">
                    <Timeline playerRef={playerReference} />
                </Box>
            </VStack>
        </Box>
    );
};

export { Studio };
