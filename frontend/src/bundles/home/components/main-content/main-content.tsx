import {
    Box,
    Loader,
    Overlay,
} from '~/bundles/common/components/components.js';
import { useCollapse } from '~/bundles/common/components/sidebar/hooks/use-collapse.hook.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { VideoGallery } from '~/bundles/home/enums/video-gallery.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import { VideoSection } from '../components.js';
import styles from './styles.module.css';

const MainContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isCollapsed } = useCollapse();

    const { videos, dataStatus } = useAppSelector(({ home }) => home);

    // TODO: filter videos to get recent videos

    useEffect(() => {
        void dispatch(homeActions.loadUserVideos());
    }, [dispatch]);

    return (
        <Box
            className={styles['main-content']}
            w={isCollapsed ? 'calc(100vw - 60px)' : 'calc(100vw - 270px)'}
        >
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <VideoSection videos={videos} title={VideoGallery.RECENT_VIDEOS} />
            <VideoSection videos={videos} title={VideoGallery.VIDEOS} />
        </Box>
    );
};

export { MainContent };
