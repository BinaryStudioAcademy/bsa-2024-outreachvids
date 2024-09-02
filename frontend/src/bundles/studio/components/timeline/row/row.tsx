import { type RowDefinition, useRow } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ItemType } from '../enums/enums.js';

type Properties = RowDefinition & {
    type?: ValueOf<typeof ItemType>;
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

const Row: React.FC<Properties> = ({
    id,
    type,
    children,
    style = {},
}: Properties): JSX.Element => {
    const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({
        id,
        data: { type },
    });

    return (
        <Box
            style={{
                ...rowWrapperStyle,
                margin: '3px 0',
                minHeight: '30px',
                ...style,
            }}
        >
            <Box ref={setNodeRef} style={rowStyle}>
                {children}
            </Box>
        </Box>
    );
};

export { Row };
