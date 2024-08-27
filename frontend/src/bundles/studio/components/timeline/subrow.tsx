import { Box } from '~/bundles/common/components/components.js';

interface SubrowProperties {
    children: React.ReactNode;
}

const Subrow = (properties: SubrowProperties): JSX.Element => {
    return (
        <Box height="50px" position="relative">
            {properties.children}
        </Box>
    );
};

export { Subrow };
