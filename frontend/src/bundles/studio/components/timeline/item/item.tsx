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
    onResizeStart?: () => void;
    onResizeEnd?: () => void;
};

const Item: React.FC<Properties> = ({
    id,
    type,
    span,
    children,
    onClick,
    onResizeStart = (): void => {},
    onResizeEnd = (): void => {},
}) => {
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
        onResizeEnd,
        onResizeStart,
    });

    return (
        <Box
            ref={setNodeRef}
            {...(type !== RowNames.BUTTON && listeners)}
            {...attributes}
            style={itemStyle}
            zIndex={isDragging || selectedItem?.id === id ? '100' : 'auto'}
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
