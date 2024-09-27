import { type PlayerRef } from '@remotion/player';

import { AudioPlayer } from '~/bundles/common/components/audio-player/audio-player.js';
import {
    Box,
    Button,
    Flex,
    Header,
    Icon,
    LibraryButton,
    Loader,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Overlay,
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
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { notificationService } from '~/bundles/common/services/services.js';

import {
    PlayerControls,
    Timeline,
    VideoMenu,
    VideoNameInput,
    WarningModal,
} from '../components/components.js';
import {
    SCRIPT_AND_AVATAR_ARE_REQUIRED,
    TEMPLATE_SAVE_FAILED_NOTOFICATION_ID,
    TEMPLATE_SAVE_NOTOFICATION_ID,
    VIDEO_SAVE_FAILED_NOTIFICATION_ID,
    VIDEO_SAVE_NOTIFICATION_ID,
    VIDEO_SUBMIT_FAILED_NOTIFICATION_ID,
    VIDEO_SUBMIT_NOTIFICATION_ID,
} from '../constants/constants.js';
import { NotificationMessage, NotificationTitle } from '../enums/enums.js';
import {
    areAllScenesWithAvatar,
    getVoicesConfigs,
    scenesExceedScripts,
} from '../helpers/helpers.js';
import {
    selectTemplateDataById,
    selectVideoDataById,
} from '../store/selectors.js';
import { actions as studioActions } from '../store/studio.js';
import styles from './styles.module.css';

const Studio: React.FC = () => {
    const { state: locationState } = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const videoData = useAppSelector((state) =>
        selectVideoDataById(state, locationState?.id),
    );

    const templateData = useAppSelector((state) =>
        selectTemplateDataById(state, locationState?.templateId),
    );

    const {
        scenes,
        scripts,
        videoName,
        videoSize,
        videoId,
        scriptPlayer,
        isVideoScriptsGenerationReady,
        isVideoScriptsGenerationPending,
    } = useAppSelector(({ studio }) => studio);

    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect((): void => {
        if (videoData) {
            void dispatch(studioActions.loadVideoData(videoData));
        }
        if (templateData) {
            void dispatch(studioActions.loadTemplate(templateData));
        }
    }, [dispatch, templateData, videoData]);

    const handleResize = useCallback(() => {
        dispatch(studioActions.changeVideoSize());
    }, [dispatch]);

    const handleConfirmSubmit = useCallback(() => {
        // TODO: REPLACE LOGIC WITH MULTIPLE SCENES

        const script = scripts[0];
        if (!areAllScenesWithAvatar(scenes) || !script) {
            return notificationService.warn({
                id: SCRIPT_AND_AVATAR_ARE_REQUIRED,
                message: NotificationMessage.SCRIPT_AND_AVATAR_ARE_REQUIRED,
                title: NotificationTitle.SCRIPT_AND_AVATAR_ARE_REQUIRED,
            });
        }

        void dispatch(studioActions.generateAllScriptsSpeech())
            .unwrap()
            .then(() => {
                void dispatch(studioActions.renderAvatar());
            })
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

    const handleSubmit = useCallback(() => {
        if (scenesExceedScripts(scenes, scripts)) {
            handleOpenModal();
        } else {
            handleConfirmSubmit();
        }
    }, [handleConfirmSubmit, handleOpenModal, scenes, scripts]);

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
                    videoOrientation: videoSize,
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
    }, [dispatch, scenes, scripts, videoId, videoName, videoSize]);

    const handleAudioEnd = useCallback((): void => {
        dispatch(studioActions.playScript({ isPlaying: false }));
    }, [dispatch]);

    const handleSetScriptDuration = useCallback(
        (duration: number): void => {
            dispatch(studioActions.playScript({ duration }));
        },
        [dispatch],
    );

    const handleSaveTemplate = useCallback((): void => {
        void dispatch(studioActions.createTemplate())
            .then(() => {
                notificationService.success({
                    id: TEMPLATE_SAVE_NOTOFICATION_ID,
                    message: NotificationMessage.TEMPLATE_SAVE,
                    title: NotificationTitle.TEMPLATE_SAVED,
                });
            })
            .catch(() => {
                notificationService.error({
                    id: TEMPLATE_SAVE_FAILED_NOTOFICATION_ID,
                    message: NotificationMessage.TEMPLATE_SAVE_FAILED,
                    title: NotificationTitle.TEMPLATE_SAVE_FAILED,
                });
            });
    }, [dispatch]);

    useEffect(() => {
        if (isVideoScriptsGenerationReady) {
            dispatch(studioActions.setVideoScriptToPending());
            dispatch(studioActions.generateAllScriptsSpeech())
                .then(() => {
                    dispatch(
                        studioActions.recalculateScenesDurationForScript(),
                    );
                })
                .catch(() => {})
                .finally(() => {
                    dispatch(studioActions.setVideoScriptToComplete());
                });
        }
    }, [dispatch, isVideoScriptsGenerationReady]);

    const { isPlaying, url } = scriptPlayer;

    return (
        <>
            <Overlay isOpen={isVideoScriptsGenerationPending}>
                <Loader />
            </Overlay>
            <Box
                minHeight="100vh"
                height="100%"
                position="relative"
                display="flex"
                flexDirection="column"
                overflowY={'hidden'}
                className={styles['scrollableContainer']}
            >
                <WarningModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleConfirmSubmit}
                />
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
                                    rightIcon={
                                        <Icon as={IconName.CHEVRON_DOWN} />
                                    }
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
                                    <MenuItem onClick={handleSaveTemplate}>
                                        Save as template
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
        </>
    );
};

export { Studio };
