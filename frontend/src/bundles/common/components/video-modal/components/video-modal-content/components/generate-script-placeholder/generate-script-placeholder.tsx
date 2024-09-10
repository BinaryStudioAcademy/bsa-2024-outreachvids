import { VStack } from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import { GenerateScriptPlaceholderContent } from '../generate-script-placeholder-content/generate-script-placeholder-content.js';
import { GenerateScriptScene } from '../generate-script-scene/generate-script-scene.js';

type Properties = {
    videoScripts: VideoScript[];
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({ videoScripts }) => {
    const { dataStatus } = useAppSelector(({ chat }) => ({
        dataStatus: chat.dataStatus,
    }));
    const isGeneratedTextEmpty = useMemo(
        () => videoScripts.length === 0,
        [videoScripts],
    );

    return (
        <VStack
            w="full"
            paddingX="40px"
            gap="10px"
            height={'100vh'}
            maxH={'550px'}
            overflowY={'auto'}
        >
            {dataStatus === DataStatus.PENDING ? (
                <GenerateScriptPlaceholderContent message="Loading..." />
            ) : (isGeneratedTextEmpty ? (
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
            ))}
        </VStack>
    );
};

export { GenerateScriptPlaceholder };
