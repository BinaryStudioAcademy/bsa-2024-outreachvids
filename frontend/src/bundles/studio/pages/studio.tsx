import { type PlayerRef } from '@remotion/player';
import { minutesToMilliseconds } from 'date-fns';
import { type Range } from 'dnd-timeline';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Header,
    Player,
    VStack,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useRef,
} from '~/bundles/common/hooks/hooks.js';

import {
    PlayerControls,
    Timeline,
    VideoMenu,
} from '../components/components.js';
import { actions as studioActionCreator } from '../store/studio.js';

const initialRange: Range = {
    start: minutesToMilliseconds(0),
    end: minutesToMilliseconds(1),
};

const Studio: React.FC = () => {
    const playerReference = useRef<PlayerRef>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleResize = useCallback(() => {
        dispatch(studioActionCreator.changeVideoSize());
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

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
                    <Button
                        variant="primaryOutlined"
                        label="Submit"
                        sx={{ width: '100px' }}
                        onClick={handleSubmit}
                    />
                }
            />

            <VideoMenu />
            <Box flex="1 1 auto">
                <Player playerRef={playerReference} />
            </Box>

            <VStack alignItems={'stretch'}>
                <PlayerControls playerRef={playerReference} />
                <Box>
                    <Timeline
                        initialRange={initialRange}
                        playerRef={playerReference}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export { Studio };
