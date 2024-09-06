import {
    type SystemStyleObject,
    Button as LibraryButton,
} from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
    variant?: string;
    size?: 'md' | 'lg';
    isDisabled?: boolean;
    sx?: SystemStyleObject;
    onClick?: () => void;
};

const Button: React.FC<Properties> = ({
    label,
    type = 'button',
    variant = 'solid',
    size = 'md',
    isDisabled = false,
    sx = {},
    onClick,
}) => (
    <LibraryButton
        type={type}
        w="full"
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        sx={sx}
        onClick={onClick}
    >
        {label}
    </LibraryButton>
);

export { Button };
