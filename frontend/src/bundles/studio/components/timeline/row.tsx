import { type RowDefinition, useRow } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';

type Properties = RowDefinition & {
    children: React.ReactNode;
};

const Row: React.FC<Properties> =({ id, children }: Properties): JSX.Element => {
    const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({ id });

    return (
        <Box style={{ ...rowWrapperStyle, minHeight: 50 }}>
            <Box
                ref={setNodeRef}
                style={{ ...rowStyle, border: '1px solid white' }}
            >
                {children}
            </Box>
        </Box>
    );
};

export { Row };
