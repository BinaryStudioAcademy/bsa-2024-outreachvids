import {
    Loader,
    Overlay,
    VStack,
} from '~/bundles/common/components/components.js';
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

    return (
        <VStack className={styles['scriptPlaceholderContainer']}>
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>
            {videoScripts.length === 0 ? (
                <GenerateScriptPlaceholderContent
                    message="Here you will see your generated script"
                    icon={IconName.SCROLL}
                />
            ) : (
                <>
                    {videoScripts.map((videoScript, index) => (
                        <GenerateScriptScene
                            key={index}
                            videoScript={videoScript}
                        />
                    ))}
                </>
            )}
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
