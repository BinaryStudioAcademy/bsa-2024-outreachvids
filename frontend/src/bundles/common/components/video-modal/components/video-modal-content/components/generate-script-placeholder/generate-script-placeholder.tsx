import {
    Box,
    Button,
    Flex,
    Loader,
    Navigate,
    VStack,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import { GenerateScriptPlaceholderContent } from '../generate-script-placeholder-content/generate-script-placeholder-content.js';
import { GenerateScriptScene } from '../generate-script-scene/generate-script-scene.js';
import styles from './styles.module.css';

type Properties = {
    videoScripts: VideoScript[];
    onClose: () => void;
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({
    videoScripts,
    onClose,
}) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const { dataStatus } = useAppSelector(({ chat }) => ({
        dataStatus: chat.dataStatus,
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

        if (videoScripts.length === 0) {
            return renderEmptyState();
        }

        return renderScripts();
    };

    const isScriptAvailable: boolean = useMemo(() => {
        return dataStatus !== DataStatus.PENDING && videoScripts.length > 0;
    }, [dataStatus, videoScripts]);

    const goToStudio = useCallback(() => {
        onClose();
        setShouldRedirect(true);
    }, [onClose]);

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
