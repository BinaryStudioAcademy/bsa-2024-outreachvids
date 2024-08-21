import { Button as LibraryButton } from '@chakra-ui/react';

type Properties = {
    label: string;
    type?: 'button' | 'submit';
};

const Button: React.FC<Properties> = ({ type = 'button', label }) => (
    <LibraryButton type={type} width="full">
        {label}
    </LibraryButton>
);

export { Button };
