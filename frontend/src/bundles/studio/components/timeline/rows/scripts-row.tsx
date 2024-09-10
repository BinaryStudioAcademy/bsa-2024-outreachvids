import { Text } from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/components.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';

import { Item, Row } from '../components.js';

const ScriptsRow: React.FC = () => {
    const scripts = useAppSelector(({ studio }) => studio.scripts);
    const scriptsWithSpan = useMemo(() => setItemsSpan(scripts), [scripts]);
    const { pixelsToValue } = useTimelineContext();

    const scriptsEnd = scriptsWithSpan.at(-1)?.span.end ?? 0;
    const buttonWidthInPixels = 100;
    const buttonWidth = pixelsToValue(buttonWidthInPixels);
    const buttonEnd =
        scriptsEnd + (Number.isFinite(buttonWidth) ? buttonWidth : 0);

    return (
        <Row
            id={RowNames.SCRIPT}
            type={RowNames.SCRIPT}
            style={{ height: '35px' }}
        >
            {scriptsWithSpan.map((item) => (
                <Item key={item.id} type={RowNames.SCRIPT} {...item}>
                    <Text
                        variant="bodySmall"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        color="typography.900"
                        padding="0 5px"
                    >
                        {item.text}
                    </Text>
                </Item>
            ))}

            <Item
                type={RowNames.SCENE}
                id="Add scene button"
                span={{ start: scriptsEnd, end: buttonEnd }}
            >
                <Control
                    label="Add script"
                    size={IconSize.MEDIUM}
                    icon={IconName.ADD}
                    variant="light"
                    height="100%"
                    width="100%"
                    isRound={false}
                />
            </Item>
        </Row>
    );
};

export { ScriptsRow };
