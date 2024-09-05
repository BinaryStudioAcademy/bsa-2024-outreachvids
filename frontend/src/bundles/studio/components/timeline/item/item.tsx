import { type Span, useItem } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';

import styles from '../timeline.module.css';

type Properties = {
    id: string;
    span: Span;
    children: React.ReactNode;
};

const Item: React.FC<Properties> = ({ id, span, children }): JSX.Element => {
    const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
        useItem({
            id,
            span,
        });

    return (
        <Box ref={setNodeRef} {...listeners} {...attributes} style={itemStyle}>
            <Box style={itemContentStyle}>
                <Flex className={styles['item']}>{children}</Flex>
            </Box>
        </Box>
    );
};

export { Item };
