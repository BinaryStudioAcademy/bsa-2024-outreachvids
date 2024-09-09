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
    VideoComponent,
    VideoMenu,
} from '../components/components.js';
import { actions as studioActionCreator } from '../store/studio.js';
import styles from './styles.module.css';

const initialRange: Range = {
    start: minutesToMilliseconds(0),
    end: minutesToMilliseconds(2),
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
        <Box minHeight="100vh" height="100%" position="relative">
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        sx={{ width: '135px' }}
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
            <VStack className={styles['timeline']} alignItems={'stretch'}>
                <PlayerControls />
                <Box>
                    <Timeline initialRange={initialRange} />
                </Box>
            </VStack>

            <Player
                VideoComponent={VideoComponent}
                playerRef={playerReference}
                durationInFrames={300}
            />
        </Box>
    );
};

export { Studio };
