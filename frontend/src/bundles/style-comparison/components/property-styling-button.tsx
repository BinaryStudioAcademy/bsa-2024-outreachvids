import { Button } from '@chakra-ui/react';

type Properties = {
    label: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

const PropertyStylingButton: React.FC<Properties> = ({
    label,
    style = {},
    onClick,
}) => (
    <Button
        // Apply styles passed through props
        style={{
            ...style, // Spread operator to merge passed styles with default styles
        }}
        onClick={onClick}
    >
        {label}
    </Button>
);

export { PropertyStylingButton };
