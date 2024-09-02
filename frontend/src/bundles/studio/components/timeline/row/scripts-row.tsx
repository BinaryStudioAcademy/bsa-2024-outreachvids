import { RowNames } from '~/bundles/studio/enums/enums.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/types.js';

import { Item } from '../item/item.js';
import { Row } from './row.js';

type Properties = {
    items: Array<TimelineItemWithSpan>;
};

const ScriptsRow: React.FC<Properties> = ({ items }) => {
    return (
        <Row
            id={RowNames.SCRIPT}
            type={RowNames.SCRIPT}
            style={{ height: '35px' }}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.SCRIPT} {...item}>
                    {`Script ${item.id.slice(0, 4)}`}
                </Item>
            ))}
        </Row>
    );
};

export { ScriptsRow };
