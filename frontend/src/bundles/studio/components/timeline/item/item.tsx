import { type Span } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { useTimelineItem } from '~/bundles/studio/hooks/hooks.js';
import { type RowType } from '~/bundles/studio/types/types.js';

import styles from '../styles.module.css';

type Properties = {
    id: string;
    type: RowType;
    span: Span;
    children: React.ReactNode;
};

const Item: React.FC<Properties> = ({ id, type, span, children }) => {
    const selectedItem = useAppSelector(({ studio }) => studio.ui.selectedItem);

    const {
        setNodeRef,
        attributes,
        listeners,
        itemStyle,
        itemContentStyle,
        isDragging,
    } = useTimelineItem({
        id,
        span,
        data: { type },
    });

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={itemStyle}
            zIndex={isDragging ? '100' : 'auto'}
        >
            <Box style={itemContentStyle}>
                <Flex
                    className={styles['item']}
                    data-selected={selectedItem?.id === id}
                >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export { Item };
