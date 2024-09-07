import { Box, Heading } from '~/bundles/common/components/components.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import styles from './styles.module.css';

type Properties = {
    videoScript: VideoScript;
};

const GenerateScriptScene: React.FC<Properties> = ({ videoScript }) => {
    const { title, description } = videoScript;
    return (
        <Box>
            <Heading as="h4" variant="h4" className={`${styles['typewriter']}`}>
                {title}
            </Heading>
            <Box as="p" className={`${styles['typewriter']}`}>
                {description}
            </Box>
        </Box>
    );
};

export { GenerateScriptScene };
