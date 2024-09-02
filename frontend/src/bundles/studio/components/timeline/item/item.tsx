import { type Span, useItem } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';

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
                <Flex
                    width="100%"
                    overflow="hidden"
                    margin="2px"
                    borderRadius="15px"
                    backgroundColor="lightblue"
                    color="darkblue"
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export { Item };
