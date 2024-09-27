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
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { loadVoices } from '~/bundles/home/store/actions.js';
import { VoiceSection } from '~/bundles/voices/components/components.js';
import { VoicesSections } from '~/bundles/voices/enums/voices-sections.js';

import styles from './styles.module.css';

const MainContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isCollapsed } = useCollapse();

    const { voices, dataStatus } = useAppSelector(({ home }) => home);

    const myVoices = useMemo(
        () => voices.filter((voice) => voice.isLiked),
        [voices],
    );

    useEffect(() => {
        void dispatch(loadVoices());
    }, [dispatch]);

    return (
        <Box
            className={styles['main-content']}
            w={isCollapsed ? 'calc(100vw - 60px)' : 'calc(100vw - 270px)'}
        >
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <VoiceSection voices={myVoices} title={VoicesSections.MY_VOICES} />
            <VoiceSection voices={voices} title={VoicesSections.VOICES} />
        </Box>
    );
};

export { MainContent };
