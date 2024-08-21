import { Link as LibraryLink } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
};

const Link: React.FC<Properties> = ({ children, to, variant = 'primary' }) => (
    <LibraryLink as={NavLink} to={to} variant={variant}>
        {children}
    </LibraryLink>
);

export { Link };
