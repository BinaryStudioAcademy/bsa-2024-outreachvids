import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Icon, Text, VStack } from '~/bundles/common/components/components.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import { GenerateScriptScene } from '../generate-script-scene/generate-script-scene.js';

type Properties = {
    videoScripts: VideoScript[];
};

const GenerateScriptPlaceholder: React.FC<Properties> = ({ videoScripts }) => {
    const isGenearatedTextEmpty = useMemo(
        () => videoScripts.length === 0,
        [videoScripts],
    );

    return (
        <VStack w="full" p="40px" gap="10px">
            {isGenearatedTextEmpty ? (
                <>
                    <Icon
                        as={FontAwesomeIcon}
                        icon={IconName.SCROLL}
                        color="brand.secondary.300"
                        opacity="0.5"
                        size="2x"
                    />
                    <Text
                        color="gray.400"
                        variant="H3"
                        w="40%"
                        minWidth="175px"
                        textAlign="center"
                        fontStyle="italic"
                    >
                        Here you will see your generated script
                    </Text>
                </>
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
