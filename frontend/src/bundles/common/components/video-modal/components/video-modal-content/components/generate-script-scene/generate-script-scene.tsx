import { Box, Heading } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type VideoScript } from '~/bundles/common/types/types.js';

import styles from './styles.module.css';

type Properties = {
    videoScript: VideoScript;
};

const GenerateScriptScene: React.FC<Properties> = ({ videoScript }) => {
    const { title, description } = videoScript;
    const [animationDone, setAnimationDone] = useState(false);

    const handleAnimationEnd = useCallback(() => {
        setAnimationDone(true);
    }, [setAnimationDone]);

    return (
        <Box mb={'10'}>
            <Heading as="h4" variant={'H4'} color={'typography.600'}>
                {title}
            </Heading>
            <Box as="p" className={animationDone ? styles['typing-effect--done'] : styles['typing-effect']} onAnimationEnd={handleAnimationEnd}>{description}</Box>
        </Box>
    );
};

export { GenerateScriptScene };
