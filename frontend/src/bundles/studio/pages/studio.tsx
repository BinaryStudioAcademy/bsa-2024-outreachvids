import { type PlayerRef } from '@remotion/player';

import {
    Box,
    Button,
    Flex,
    Header,
    Icon,
    LibraryButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Player,
    VStack,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
    useRef,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { notificationService } from '~/bundles/common/services/services.js';

import { AudioPlayer } from '../components/audio-player/audio-player.js';
import {
    PlayerControls,
    Timeline,
    VideoMenu,
    VideoNameInput,
} from '../components/components.js';
import {
    SCRIPT_AND_AVATAR_ARE_REQUIRED,
    VIDEO_SAVE_FAILED_NOTIFICATION_ID,
    VIDEO_SAVE_NOTIFICATION_ID,
    VIDEO_SUBMIT_FAILED_NOTIFICATION_ID,
    VIDEO_SUBMIT_NOTIFICATION_ID,
} from '../constants/constants.js';
import { NotificationMessage, NotificationTitle } from '../enums/enums.js';
import { getVoicesConfigs } from '../helpers/helpers.js';
import { selectVideoDataById } from '../store/selectors.js';
import { actions as studioActions } from '../store/studio.js';

const Studio: React.FC = () => {
    const { state: locationState } = useLocation();

    const videoData = useAppSelector((state) =>
        selectVideoDataById(state, locationState?.id),
    );

    const { scenes, scripts, videoName, videoId, scriptPlayer } =
        useAppSelector(({ studio }) => studio);

    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect((): void => {
        if (videoData) {
            void dispatch(studioActions.loadVideoData(videoData));
        }
    }, [dispatch, videoData]);

    const handleResize = useCallback(() => {
        dispatch(studioActions.changeVideoSize());
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        // TODO: REPLACE LOGIC WITH MULTIPLE SCENES
        const scene = scenes[0];
        const script = scripts[0];

        if (!scene?.avatar || !script) {
            notificationService.warn({
                id: SCRIPT_AND_AVATAR_ARE_REQUIRED,
                message: NotificationMessage.SCRIPT_AND_AVATAR_ARE_REQUIRED,
                title: NotificationTitle.SCRIPT_AND_AVATAR_ARE_REQUIRED,
            });
            return;
        }

        dispatch(
            studioActions.renderAvatar({
                composition: {
                    scenes,
                    scripts: getVoicesConfigs(scripts),
                },
                name: videoName,
                ...(videoId && { videoId }),
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
    }, [dispatch, navigate, scenes, scripts, videoId, videoName]);

    useEffect(() => {
        return () => {
            dispatch(studioActions.resetStudio());
        };
    }, [dispatch]);

    const handleSaveDraft = useCallback((): void => {
        if (!scenes[0]?.avatar || scripts.length === 0) {
            return notificationService.warn({
                id: SCRIPT_AND_AVATAR_ARE_REQUIRED,
                message: NotificationMessage.SCRIPT_AND_AVATAR_ARE_REQUIRED,
                title: NotificationTitle.SCRIPT_AND_AVATAR_ARE_REQUIRED,
            });
        }

        const action = videoId
            ? studioActions.updateVideo
            : studioActions.saveVideo;

        void dispatch(
            action({
                composition: {
                    scenes,
                    scripts: getVoicesConfigs(scripts),
                },
                name: videoName,
            }),
        )
            .then(() => {
                notificationService.success({
                    id: VIDEO_SAVE_NOTIFICATION_ID,
                    message: NotificationMessage.VIDEO_SAVE,
                    title: NotificationTitle.VIDEO_SAVED,
                });
            })
            .catch(() => {
                notificationService.error({
                    id: VIDEO_SAVE_FAILED_NOTIFICATION_ID,
                    message: NotificationMessage.VIDEO_SAVE_FAILED,
                    title: NotificationTitle.VIDEO_SAVE_FAILED,
                });
            });
    }, [dispatch, scenes, scripts, videoId, videoName]);

    const handleAudioEnd = useCallback((): void => {
        dispatch(studioActions.playScript({ isPlaying: false }));
    }, [dispatch]);

    const handleSetScriptDuration = useCallback(
        (duration: number): void => {
            dispatch(studioActions.playScript({ duration }));
        },
        [dispatch],
    );

    const { isPlaying, url } = scriptPlayer;

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
                        <VideoNameInput />
                        <Menu>
                            <MenuButton
                                variant="primaryOutlined"
                                as={LibraryButton}
                                rightIcon={<Icon as={IconName.CHEVRON_DOWN} />}
                                flexShrink={0}
                            >
                                Submit
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleSaveDraft}>
                                    Save draft
                                </MenuItem>
                                <MenuItem onClick={handleSubmit}>
                                    Submit to render
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                }
            />

            <VideoMenu />
            <Box flex="1 1 auto">
                <Player playerRef={playerReference} />
            </Box>

            <VStack alignItems="stretch">
                <PlayerControls playerRef={playerReference} />
                <Box overflowY="auto">
                    <Timeline playerRef={playerReference} />
                </Box>
            </VStack>
            {url && (
                <AudioPlayer
                    isPlaying={isPlaying}
                    audioUrl={url}
                    onAudioEnd={handleAudioEnd}
                    onSetDuration={handleSetScriptDuration}
                />
            )}
        </Box>
    );
};

export { Studio };
