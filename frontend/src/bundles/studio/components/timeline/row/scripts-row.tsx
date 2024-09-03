import { useTimelineContext } from 'dnd-timeline';

import { Text } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import {
    type DestinationPointer,
    type TimelineItemWithSpan,
} from '~/bundles/studio/types/types.js';

import { DragPointer } from '../drag-pointer/drag-pointer.js';
import { Item } from '../item/item.js';
import { Row } from './row.js';

type Properties = {
    items: Array<TimelineItemWithSpan>;
    destinationPointer?: DestinationPointer | null;
};

const ScriptsRow: React.FC<Properties> = ({ items, destinationPointer }) => {
    const { valueToPixels } = useTimelineContext();

    return (
        <Row
            id={RowNames.SCRIPT}
            type={RowNames.SCRIPT}
            style={{ height: '35px' }}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.SCRIPT} {...item}>
                    <Text
                        variant="bodySmall"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        color="typography.900"
                        padding="0 5px"
                    >{`Script ${item.id}`}</Text>
                </Item>
            ))}
            {destinationPointer && (
                <DragPointer
                    sx={{ left: valueToPixels(destinationPointer.value) }}
                />
            )}
        </Row>
    );
};

export { ScriptsRow };
