import { type Span } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { useTimelineItem } from '~/bundles/studio/hooks/hooks.js';
import { type RowType } from '~/bundles/studio/types/types.js';

import styles from './styles.module.css';

type Properties = {
    id: string;
    type: RowType;
    span: Span;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
};

const Item: React.FC<Properties> = ({ id, type, span, children, onClick }) => {
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
            {...(type !== RowNames.BUTTON && listeners)}
            {...attributes}
            style={itemStyle}
            zIndex={isDragging ? '100' : 'auto'}
            onClick={onClick}
            data-id={id}
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
