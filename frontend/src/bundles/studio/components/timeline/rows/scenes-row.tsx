import { Text } from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';

import { Item, Row } from '../components.js';

const ScenesRow: React.FC = () => {
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scenesWithSpan = useMemo(() => setItemsSpan(scenes), [scenes]);

    return (
        <Row
            id={RowNames.SCENE}
            type={RowNames.SCENE}
            style={{ height: '60px' }}
        >
            {scenesWithSpan.map((item) => (
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
