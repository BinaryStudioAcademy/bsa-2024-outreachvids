import { Button } from '@chakra-ui/react';

type Properties = {
    label: string;
    onClick?: () => void;
};

const InlineStylingButton: React.FC<Properties> = ({ label, onClick }) => (
    <Button
        // Inline styles applied directly to the Button component
        style={{
            backgroundColor: '#3182ce',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {label}
    </Button>
);

export { InlineStylingButton };
