import { Button as LibraryButton } from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
    size?: 'md' | 'lg';
    isDisabled?: boolean;
};

const Button: React.FC<Properties> = ({
    type = 'button',
    label,
    size = 'md',
    isDisabled = false,
}) => (
    <LibraryButton type={type} width="full" size={size} isDisabled={isDisabled}>
        {label}
    </LibraryButton>
);

export { Button };
