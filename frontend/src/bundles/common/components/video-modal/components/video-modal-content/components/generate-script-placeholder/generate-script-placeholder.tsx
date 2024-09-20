import { Box, Loader, VStack } from '~/bundles/common/components/components.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import { GenerateScriptPlaceholderContent } from '../generate-script-placeholder-content/generate-script-placeholder-content.js';
import { GenerateScriptScene } from '../generate-script-scene/generate-script-scene.js';
import styles from './styles.module.css';

type Properties = {
    videoScripts: VideoScript[];
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({ videoScripts }) => {
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
        if (videoScripts.length === EMPTY_VALUE) {
            return renderEmptyState();
        }
        return renderScripts();
    };

    return (
        <VStack className={styles['script-placeholder-container']}>
            {getContent()}
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
