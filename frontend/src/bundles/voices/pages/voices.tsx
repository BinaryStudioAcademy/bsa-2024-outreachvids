import {
    AudioPlayer,
    Box,
    Header,
    Sidebar,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { actions as homeActions } from '~/bundles/home/store/home.js';
import { MainContent } from '~/bundles/voices/components/components.js';

const Voices: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isPlaying, url } = useAppSelector(({ home }) => home.voicePlayer);
    const handleAudioEnd = useCallback((): void => {
        dispatch(homeActions.playVoice({ isPlaying: false }));
    }, [dispatch]);

    return (
        <>
            <Box bg="background.900" minHeight="100vh">
                <Header />
                <Sidebar>
                    <MainContent />
                </Sidebar>
            </Box>
            {url && (
                <AudioPlayer
                    isPlaying={isPlaying}
                    audioUrl={url}
                    onAudioEnd={handleAudioEnd}
                />
            )}
        </>
    );
};

export { Voices };
