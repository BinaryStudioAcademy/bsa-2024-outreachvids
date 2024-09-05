import { type RowDefinition, useRow } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = RowDefinition & {
    children: React.ReactNode;
};

const Row: React.FC<Properties> = ({
    id,
    children,
}: Properties): JSX.Element => {
    const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({ id });

    return (
        <Box style={{ ...rowWrapperStyle, minHeight: 50 }}>
            <Box
                ref={setNodeRef}
                style={{ ...rowStyle, border: '1px solid black' }}
                className={styles['row']}
            >
                {children}
            </Box>
        </Box>
    );
};

export { Row };
