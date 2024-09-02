import { RowNames } from '~/bundles/studio/enums/enums.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/timeline-item.type.js';

import { Item } from '../item/item.js';
import { Row } from './row.js';

type Properties = {
    items: Array<TimelineItemWithSpan>;
};

const AvatarsRow: React.FC<Properties> = ({ items }) => {
    return (
        <Row
            id={RowNames.AVATAR}
            type={RowNames.AVATAR}
            style={{ height: '60px' }}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.AVATAR} {...item}>
                    {`Avatar ${item.id.slice(0, 4)}`}
                </Item>
            ))}
        </Row>
    );
};

export { AvatarsRow };
