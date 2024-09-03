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

const AvatarsRow: React.FC<Properties> = ({ items, destinationPointer }) => {
    const { valueToPixels } = useTimelineContext();

    return (
        <Row
            id={RowNames.AVATAR}
            type={RowNames.AVATAR}
            style={{ height: '60px' }}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.AVATAR} {...item}>
                    {/* TODO: replace text with avatars */}
                    {/* <Image src={photo} alt="Video preview" borderRadius="5px" /> */}
                    <Text
                        variant="bodySmall"
                        color="typography.900"
                        padding="0 5px"
                    >{`Avatar ${item.id.slice(0, 4)}`}</Text>
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

export { AvatarsRow };
