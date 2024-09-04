import { useRow, useTimelineContext } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { type RowType } from '~/bundles/studio/types/types.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    id: string;
    type?: RowType;
    children?: React.ReactNode;
    destinationPointerValue?: number | undefined;
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
    const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({
        id,
        data: { type },
    });

    return (
        <Box
            style={{
                ...rowWrapperStyle,
                margin: '3px 0',
                minHeight: '30px',
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
