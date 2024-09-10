import { Text } from '~/bundles/common/components/components.js';
import { useAppSelector, useMemo } from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/enums.js';
import { setItemsSpan } from '~/bundles/studio/helpers/set-items-span.js';

import { Item, Row } from '../components.js';

const ScriptsRow: React.FC = () => {
    const scripts = useAppSelector(({ studio }) => studio.scripts);
    const scriptsWithSpan = useMemo(() => setItemsSpan(scripts), [scripts]);

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
        </Row>
    );
};

export { ScriptsRow };
