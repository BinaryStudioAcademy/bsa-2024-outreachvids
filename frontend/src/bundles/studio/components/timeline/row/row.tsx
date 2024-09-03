import { useRow } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { type RowType } from '~/bundles/studio/types/types.js';

type Properties = {
    id: string;
    type?: RowType;
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

const Row: React.FC<Properties> = ({ id, type, children, style = {} }) => {
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
