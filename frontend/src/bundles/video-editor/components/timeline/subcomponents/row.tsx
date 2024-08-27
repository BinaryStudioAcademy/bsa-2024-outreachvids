import { type RowDefinition, useRow } from 'dnd-timeline';

import { Box } from '../../../../common/components/components.js';

interface RowProperties extends RowDefinition {
    children: React.ReactNode;
}
const Row = (properties: RowProperties): JSX.Element => {
    const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({
        id: properties.id,
    });

    return (
        <Box style={{ ...rowWrapperStyle, minHeight: 50 }}>
            <Box
                ref={setNodeRef}
                style={{ ...rowStyle, border: '1px solid white' }}
            >
                {properties.children}
            </Box>
        </Box>
    );
};

export { Row };
