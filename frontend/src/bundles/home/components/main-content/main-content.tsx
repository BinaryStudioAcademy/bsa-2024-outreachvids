import {
    Box,
    Loader,
    Overlay,
} from '~/bundles/common/components/components.js';
import { SocketContext } from '~/bundles/common/context/socket.js';
import { AvatarVideoEvent, DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useContext,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { notificationService } from '~/bundles/common/services/services.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import {
    VIDEO_RENDER_FAILED_NOTIFICATION_ID,
    VIDEO_RENDER_SUCCESS_NOTIFICATION_ID,
} from '../../constants/constants.js';
import { NotificationMessage, NotificationTitle } from '../../enums/enums.js';
import { VideoSection } from '../components.js';
import styles from './styles.module.css';

const MainContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);

    const { videos, dataStatus } = useAppSelector(({ home }) => home);

    // TODO: filter videos to get recent videos
    useEffect(() => {
        const handleLoadUserVideos = (): void => {
            void dispatch(homeActions.loadUserVideos());
        };

        const handleRenderedVideoSuccess = (): void => {
            notificationService.success({
                id: VIDEO_RENDER_SUCCESS_NOTIFICATION_ID,
                title: NotificationTitle.VIDEO_RENDER_SUCCESS,
                message: NotificationMessage.VIDEO_RENDER_SUCCESS,
            });
            handleLoadUserVideos();
        };

        const handleRenderedVideoFailed = (): void => {
            socket.on(AvatarVideoEvent.RENDER_FAILED, () => {
                notificationService.error({
                    id: VIDEO_RENDER_FAILED_NOTIFICATION_ID,
                    title: NotificationTitle.VIDEO_RENDER_FAILED,
                    message: NotificationMessage.VIDEO_RENDER_FAILED,
                });
            });
        };

        handleLoadUserVideos();
        socket.on(AvatarVideoEvent.RENDER_SUCCESS, handleRenderedVideoSuccess);
        socket.on(AvatarVideoEvent.RENDER_FAILED, handleRenderedVideoFailed);

        return () => {
            socket.off(AvatarVideoEvent.RENDER_SUCCESS, handleRenderedVideoSuccess);
            socket.off(AvatarVideoEvent.RENDER_FAILED, handleRenderedVideoFailed);
        };
    }, [dispatch, socket]);

    return (
        <Box className={styles['main-content']}>
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <VideoSection videos={videos} title="Recent videos" />
            <VideoSection videos={videos} title="Videos" />
        </Box>
    );
};

export { MainContent };
