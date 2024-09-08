import { Box } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import {
    useTimelineContext,
    useTimelineRow,
} from '~/bundles/studio/hooks/hooks.js';
import { type RowType } from '~/bundles/studio/types/types.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    id: string;
    type?: RowType;
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

const Row: React.FC<Properties> = ({ id, type, children, style = {} }) => {
    const destinationPointer = useAppSelector(
        ({ studio }) => studio.ui.destinationPointer,
    );
    const { valueToPixels } = useTimelineContext();
    const { setNodeRef, rowWrapperStyle, rowStyle } = useTimelineRow({
        id,
        data: { type },
    });

    return (
        <Box
            style={{
                ...rowWrapperStyle,
                ...style,
            }}
            margin="3px 0"
        >
            <Box ref={setNodeRef} style={rowStyle} className={styles['row']}>
                {children}
                {destinationPointer?.type === type && (
                    <Box
                        h="100%"
                        w="1.5px"
                        bgColor="background.900"
                        position="absolute"
                        left={valueToPixels(
                            destinationPointer?.value as number,
                        )}
                    />
                )}
            </Box>
        </Box>
    );
};

export { Row };
