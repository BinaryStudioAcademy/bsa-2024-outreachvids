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
    className?: string | undefined;
};

const Button: React.FC<Properties> = ({
    label,
    type = 'button',
    variant = 'solid',
    size = 'md',
    isDisabled = false,
    sx = {},
    className,
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
        className={className}
    >
        {label}
    </LibraryButton>
);

export { Button };
