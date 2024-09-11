import { Badge, Image } from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';

import { Item, Row } from '../components.js';
import styles from '../timeline.module.css';

const ScenesRow: React.FC = () => {
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scenesWithSpan = useMemo(() => setItemsSpan(scenes), [scenes]);

    return (
        <Row
            id={RowNames.SCENE}
            type={RowNames.SCENE}
            style={{ height: '60px' }}
        >
            {scenesWithSpan.map((item, index) => (
                <Item key={item.id} type={RowNames.SCENE} {...item}>
                    <Badge
                        className={styles['scene-badge']}
                        variant="solid"
                        borderRadius="5px"
                        px="8px"
                    >
                        {index + 1}
                    </Badge>
                    {item.avatar && (
                        <Image
                            src={item.avatar.url}
                            alt="Video preview"
                            height="100%"
                        />
                    )}
                </Item>
            ))}
        </Row>
    );
};

export { ScenesRow };
