import { Box, Text } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { selectTotalDuration } from '~/bundles/studio/store/selectors.js';

import styles from './styles.module.css';

const VideoEndingCursor: React.FC = () => {
    const totalDuration = useAppSelector(selectTotalDuration);
    const { valueToPixels } = useTimelineContext();

    const position = valueToPixels(totalDuration);

    return (
        <Box
            className={styles['cursor']}
            backgroundColor="typography.300"
            style={{ left: `${position}px` }}
        >
            <Text
                position="absolute"
                transform="translateX(-50%)"
                color="typography.300"
                fontSize="sm"
                backgroundColor='white'
            >
                End
            </Text>
        </Box>
    );
};

export { VideoEndingCursor };
