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
import { actions as homeActions } from '~/bundles/home/store/home.js';

import { VideoSection } from '../components.js';

const MainContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);

    const { videos, dataStatus } = useAppSelector(({ home }) => home);

    // TODO: filter videos to get recent videos

    useEffect(() => {
        void dispatch(homeActions.loadUserVideos());
    }, [dispatch]);

    useEffect(() => {
        // socket.on('TEST', (a: boolean) => { console.log('c: ' + a)} );
        // socket.emit(AvatarVideoEvent.RENDER_SUCCESS, true);
        socket.on(AvatarVideoEvent.RENDER_SUCCESS, () => {
            void dispatch(homeActions.loadUserVideos());
        });

        return () => {
            // socket.removeAllListeners(AvatarVideoEvent.RENDER_SUCCESS).close();
        };
    }, [socket, dispatch]);

    return (
        <Box bg="background.50" borderRadius="lg">
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <VideoSection videos={videos} title="Recent videos" />
            <VideoSection videos={videos} title="Videos" />
        </Box>
    );
};

export { MainContent };
