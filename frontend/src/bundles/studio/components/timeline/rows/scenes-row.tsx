import { Text } from '~/bundles/common/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { type TimelineItemWithSpan } from '~/bundles/studio/types/types.js';

import { Item, Row } from '../components.js';

type Properties = {
    items: Array<TimelineItemWithSpan>;
};

const ScenesRow: React.FC<Properties> = ({ items }) => {
    return (
        <Row
            id={RowNames.SCENE}
            type={RowNames.SCENE}
            style={{ height: '60px' }}
        >
            {items.map((item) => (
                <Item key={item.id} type={RowNames.SCENE} {...item}>
                    {/* TODO: replace text with avatars */}
                    {/* <Image src={photo} alt="Video preview" borderRadius="5px" /> */}
                    <Text
                        variant="bodySmall"
                        color="typography.900"
                        padding="0 5px"
                    >{`Avatar ${item.id.slice(0, 4)}`}</Text>
                </Item>
            ))}
        </Row>
    );
};

export { ScenesRow };
