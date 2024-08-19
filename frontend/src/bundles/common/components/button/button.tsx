import { Button as LibraryButton } from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
    isDisabled?: boolean;
};

const Button: React.FC<Properties> = ({ type = 'button', label, isDisabled = false }) => (
    <LibraryButton type={type} color="brand.900" width="full" isDisabled={isDisabled}>
        {label}
    </LibraryButton>
);

export { Button };
