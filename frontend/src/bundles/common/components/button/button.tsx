import { type ChakraProps as ChakraProperties,Button as LibraryButton } from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
    variant?: string;
    size?: 'md' | 'lg';
    isDisabled?: boolean;
    className?: string | undefined;
    onClick?: () => void;
} & ChakraProperties;

const Button: React.FC<Properties> = ({
    label,
    type = 'button',
    variant = 'solid',
    size = 'md',
    isDisabled = false,
    className,
    onClick,
    ...ChakraProperties
}) => (
    <LibraryButton
        type={type}
        w="full"
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        className={className}
        onClick={onClick}
        {...ChakraProperties}
    >
        {label}
    </LibraryButton>
);

export { Button };