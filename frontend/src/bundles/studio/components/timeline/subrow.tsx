import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    children: React.ReactNode;
};
const Subrow = (properties: Properties): JSX.Element => {
    return (
        <Box height="50px" position="relative">
            {properties.children}
        </Box>
    );
};

export { Subrow };
