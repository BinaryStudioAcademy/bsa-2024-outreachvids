import { type Span, useItem } from 'dnd-timeline';

import { Box, Flex } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ItemType } from '../enums/item-type.enum.js';

type Properties = {
    id: string;
    type: ValueOf<typeof ItemType>;
    span: Span;
    children: React.ReactNode;
};

const Item: React.FC<Properties> = ({
    id,
    type,
    span,
    children,
}): JSX.Element => {
    const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
        useItem({
            id,
            span,
            data: { type },
        });

    return (
        <Box ref={setNodeRef} {...listeners} {...attributes} style={itemStyle}>
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
                >
                    {children}
                </Flex>
            </Box>
        </Box>
    );
};

export { Item };
