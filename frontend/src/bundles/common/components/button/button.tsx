import {
    type SystemStyleObject,
    Button as LibraryButton,
} from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
    size?: 'md' | 'lg';
    isDisabled?: boolean;
    sx?: SystemStyleObject;
};

const Button: React.FC<Properties> = ({
    type = 'button',
    label,
    size = 'md',
    isDisabled = false,
    sx = {},
}) => (
    <LibraryButton
        type={type}
        width="full"
        size={size}
        isDisabled={isDisabled}
        sx={sx}
    >
        {label}
    </LibraryButton>
);

export { Button };
