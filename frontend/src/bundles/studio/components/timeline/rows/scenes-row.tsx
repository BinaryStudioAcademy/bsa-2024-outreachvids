import {
    Badge,
    Icon,
    IconButton,
    Image,
    Tooltip,
} from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

import { Item, Row } from '../components.js';

const ScenesRow: React.FC = () => {
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scenesWithSpan = useMemo(() => setItemsSpan(scenes), [scenes]);
    const { pixelsToValue } = useTimelineContext();

    const scenesEnd = scenesWithSpan.at(-1)?.span.end ?? 0;
    const buttonWidthInPixels = 60;
    const buttonWidth = pixelsToValue(buttonWidthInPixels);
    const buttonEnd =
        scenesEnd + (Number.isFinite(buttonWidth) ? buttonWidth : 0);

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

            <Item
                type={RowNames.SCENE}
                id="Add scene button"
                span={{ start: scenesEnd, end: buttonEnd }}
            >
                <Tooltip hasArrow label={'Add a scene'} placement="top">
                    <IconButton
                        height="100%"
                        width="100%"
                        size={IconSize.LARGE}
                        aria-label={'Add a scene'}
                        icon={<Icon as={IconName.ADD} />}
                    />
                </Tooltip>
            </Item>
        </Row>
    );
};

export { ScenesRow };
