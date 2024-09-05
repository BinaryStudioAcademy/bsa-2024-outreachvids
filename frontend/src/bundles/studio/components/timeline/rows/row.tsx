import { Box } from '~/bundles/common/components/components.js';
import {
    useTimelineContext,
    useTimelineRow,
} from '~/bundles/common/hooks/hooks.js';
import { type RowType } from '~/bundles/studio/types/types.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    id: string;
    type?: RowType;
    children?: React.ReactNode;
    destinationPointerValue?: number | null;
    style?: React.CSSProperties;
};

const Row: React.FC<Properties> = ({
    id,
    type,
    children,
    destinationPointerValue,
    style = {},
}) => {
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
        >
            <Box ref={setNodeRef} style={rowStyle} className={styles['row']}>
                {children}
                {destinationPointerValue && (
                    <Box
                        h="100%"
                        w="1.5px"
                        bgColor="background.900"
                        position="absolute"
                        left={valueToPixels(destinationPointerValue)}
                    />
                )}
            </Box>
        </Box>
    );
};

export { Row };
