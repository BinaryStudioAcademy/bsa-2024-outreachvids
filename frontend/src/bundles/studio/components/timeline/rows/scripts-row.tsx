import { Text } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/types.js';

import { Item, Row } from '../components.js';

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
