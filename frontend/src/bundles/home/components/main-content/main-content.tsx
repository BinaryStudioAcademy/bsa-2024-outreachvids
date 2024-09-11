import {
    Box,
    Loader,
    Overlay,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';

import { VideoSection } from '../components.js';

const MainContent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { videos, dataStatus } = useAppSelector(({ home }) => home);

    // TODO: filter videos to get recent videos

    useEffect(() => {
        void dispatch(homeActions.loadUserVideos());
    }, [dispatch]);

    return (
        <Box bg="background.50" borderRadius="lg">
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <VideoSection videos={videos} title="Recent videos" />
            <VideoSection videos={[]} title="Videos" />
        </Box>
    );
};

export { MainContent };
