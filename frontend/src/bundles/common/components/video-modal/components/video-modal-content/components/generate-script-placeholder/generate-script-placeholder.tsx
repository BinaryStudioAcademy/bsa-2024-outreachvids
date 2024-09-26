import {
    Box,
    Button,
    Flex,
    Loader,
    Navigate,
    VStack,
} from '~/bundles/common/components/components.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { GenerateScriptPlaceholderContent } from '../generate-script-placeholder-content/generate-script-placeholder-content.js';
import { GenerateScriptScene } from '../generate-script-scene/generate-script-scene.js';
import styles from './styles.module.css';

type Properties = {
    onClose: () => void;
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isScriptAdded, setIsScriptAdded] = useState(false);
    const { dataStatus, avatars, videoScripts, videoScriptErrorMessage } =
        useAppSelector(({ chat, studio }) => ({
            dataStatus: chat.dataStatus,
            videoScripts: chat.videoScripts,
            videoScriptErrorMessage: chat.videoScriptErrorMessage,
            avatars: studio.avatars,
        }));

    const renderLoadingState = (): React.ReactNode => (
        <Box mt="100px">
            <Loader isDark />
        </Box>
    );

    const renderEmptyState = (): React.ReactNode => (
        <GenerateScriptPlaceholderContent
            message="Here you will see your generated script"
            icon={IconName.SCROLL}
        />
    );

    const renderErrorMessage = (): React.ReactNode => (
        <GenerateScriptPlaceholderContent
            message={videoScriptErrorMessage}
            icon={IconName.WARNING}
        />
    );

    const renderScripts = (): React.ReactNode => (
        <>
            {videoScripts.map((videoScript, index) => (
                <GenerateScriptScene key={index} videoScript={videoScript} />
            ))}
        </>
    );

    const getContent = (): React.ReactNode => {
        if (dataStatus === DataStatus.PENDING) {
            return renderLoadingState();
        }
        if (videoScriptErrorMessage) {
            return renderErrorMessage();
        }
        if (videoScripts.length === EMPTY_VALUE) {
            return renderEmptyState();
        }

        return renderScripts();
    };

    const isScriptAvailable: boolean = useMemo(() => {
        return (
            dataStatus !== DataStatus.PENDING &&
            videoScripts.length > EMPTY_VALUE
        );
    }, [dataStatus, videoScripts]);

    const goToStudio = useCallback(() => {
        dispatch(studioActions.addGeneratedVideoScript(videoScripts));
        setIsScriptAdded(true);
    }, [dispatch, videoScripts]);

    useEffect(() => {
        if (avatars.length === EMPTY_VALUE) {
            void dispatch(studioActions.loadAvatars());
        }
    }, [dispatch, avatars.length]);

    useEffect(() => {
        if (isScriptAdded) {
            setShouldRedirect(true);
            onClose();
        }
    }, [isScriptAdded, onClose]);

    if (shouldRedirect) {
        return <Navigate to={AppRoute.STUDIO} replace />;
    }

    return (
        <Flex className={styles['script-placeholder-container']}>
            <VStack className={styles['script-placeholder-content']}>
                {getContent()}
            </VStack>

            {isScriptAvailable && (
                <Button
                    type="button"
                    label="Create Video"
                    className={styles['script-placeholder-button']}
                    onClick={goToStudio}
                />
            )}
        </Flex>
    );
};

export { GenerateScriptPlaceholder };
