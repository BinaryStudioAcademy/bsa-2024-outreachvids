import { Button } from '@chakra-ui/react';

type Properties = {
    label: string;
    style?: React.CSSProperties;
};

const PropertyStylingButton: React.FC<Properties> = ({
    label,
    style = {},
}) => (
    <Button
        style={{
            ...style, // Apply styles passed through props
        }}
    >
        {label}
    </Button>
);

export { PropertyStylingButton };