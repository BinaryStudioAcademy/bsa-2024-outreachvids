import { Box, Heading } from '~/bundles/common/components/components.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

type Properties = {
    videoScript: VideoScript;
};

const GenerateScriptScene: React.FC<Properties> = ({ videoScript }) => {
    const { title, description } = videoScript;

    return (
        <Box mb="10" width="100%">
            <Heading as="h4" variant="H4" color="typography.600">
                {title}
            </Heading>
            <Box as="p">{description}</Box>
        </Box>
    );
};

export { GenerateScriptScene };
