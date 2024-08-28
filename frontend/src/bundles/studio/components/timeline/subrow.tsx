import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    children: React.ReactNode;
};

const Subrow: React.FC<Properties> =({ children }: Properties): JSX.Element => {
    return (
        <Box height="50px" position="relative">
            {children}
        </Box>
    );
};

export { Subrow };
