import { Text } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/types.js';

import { Item } from '../item/item.js';
import { Row } from './row.js';

type Properties = {
    items: Array<TimelineItemWithSpan>;
    destinationPointerValue?: number | undefined;
};

const ScriptsRow: React.FC<Properties> = ({
    items,
    destinationPointerValue,
}) => {
    return (
        <Row
            id={RowNames.SCRIPT}
            type={RowNames.SCRIPT}
            style={{ height: '35px' }}
            destinationPointerValue={destinationPointerValue}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.SCRIPT} {...item}>
                    {/* TODO: replace text with scripts */}
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
        </Row>
    );
};

export { ScriptsRow };
