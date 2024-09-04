import { type Span, useItem } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';
import { type RowType } from '~/bundles/studio/types/types.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    id: string;
    type: RowType;
    span: Span;
    children: React.ReactNode;
};

const Item: React.FC<Properties> = ({ id, type, span, children }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        itemStyle,
        itemContentStyle,
        isDragging,
    } = useItem({
        id,
        span,
        data: { type },
    });

    return (
        <Box
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                ...itemStyle,
                zIndex: isDragging ? '100' : 'auto',
            }}
        >
            <Box style={itemContentStyle}>
                <Flex
                    width="100%"
                    overflow="hidden"
                    borderRadius="10px"
                    backgroundColor="lightblue"
                    color="darkblue"
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    marginRight="2px"
                    border="1px solid"
                    className={styles['item']}
                >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export { Item };
