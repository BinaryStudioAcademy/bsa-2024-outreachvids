import { Link } from '~/bundles/common/components/components.js';
import { type AppRoute } from '~/bundles/common/enums/enums.js';
import { useLocation } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    type CollapseButtonProperties,
    CollapseButton,
} from '../collapse-button/collapse-button.js';

type Properties = Omit<CollapseButtonProperties, 'bg' | 'handleClick'> & {
    to: ValueOf<typeof AppRoute>;
};

const CollapseButtonLink = ({
    icon,
    isCollapsed,
    label,
    to,
}: Properties): JSX.Element => {
    const { pathname } = useLocation();

    const activeButtonPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'background.600' : '';
    };

    return (
        <Link to={to}>
            <CollapseButton
                bg={activeButtonPage(to)}
                icon={icon}
                isCollapsed={isCollapsed}
                label={label}
            />
        </Link>
    );
};

export { CollapseButtonLink };
