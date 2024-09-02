import {
    Button
} from '@chakra-ui/react';

type Properties = {
    label: string;
};

const InlineStylingButton: React.FC<Properties> = ({
    label,
}) => (
    <Button
    style={{
        backgroundColor: '#3182ce',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }}
>
    {label}
    </Button>
);

export { InlineStylingButton };
