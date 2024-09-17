import { type PlayerRef } from '@remotion/player';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Flex,
    Header,
    Icon,
    LibraryButton,
    LibraryInput,
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
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
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
import { getVoicesConfigs } from '../helpers/helpers.js';
import { actions as studioActions } from '../store/studio.js';
import styles from './styles.module.css';

const Studio: React.FC = () => {
    const { scenes, scripts, videoName, isDraftSaved } = useAppSelector(
        ({ studio }) => studio,
    );
    const [inputValue, setInputValue] = useState(
        isDraftSaved ? videoName : `${videoName}*`,
    );

    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleResize = useCallback(() => {
        dispatch(studioActions.changeVideoSize());
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
            studioActions.renderAvatar({
                composition: {
                    scenes,
                    scripts: getVoicesConfigs(scripts),
                },
                name: 'Untitled',
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

    useEffect(() => {
        return () => void dispatch(studioActions.resetStudio());
    }, [dispatch]);

    const handleEditVideoName = useCallback(
        (event: React.FocusEvent<HTMLInputElement>): void => {
            void dispatch(studioActions.setVideoName(event.target.value));
        },
        [dispatch],
    );

    const handleSaveDraft = useCallback((): void => {
        // TODO: Dispatch real save draft action
        void dispatch(studioActions.setDraftSaved(true));
    }, [dispatch]);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setInputValue(event.target.value);
        },
        [],
    );

    useEffect(() => {
        setInputValue(isDraftSaved ? videoName : `${videoName}*`);
    }, [isDraftSaved, videoName]);

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
                            value={inputValue}
                            className={styles['videoName']}
                            variant="unstyled"
                            placeholder="Untitled video"
                            onChange={handleInputChange}
                            onBlur={handleEditVideoName}
                        />
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
        </Box>
    );
};

export { Studio };
