import { Button as LibraryButton } from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
    <LibraryButton type={type} color="brand.900" width="full">
        {label}
    </LibraryButton>
);

export { Button };
