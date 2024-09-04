import { Box } from '~/bundles/common/components/components.js';
import styles from '~/framework/theme/styles/css-modules/timeline.module.css';

type Properties = {
    children: React.ReactNode;
};

const Subrow: React.FC<Properties> = ({
    children,
}: Properties): JSX.Element => {
    return <Box className={styles['subrow']}>{children}</Box>;
};

export { Subrow };
