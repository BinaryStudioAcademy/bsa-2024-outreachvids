import { Circle } from '~/bundles/common/components/components.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import { getInitials } from '../helpers/helpers.js';

const UserAvatar: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);
    const initials = getInitials(user?.fullName);
    return (
        <Circle
            size="40px"
            border="2px solid"
            borderColor="brand.secondary.900"
            color="brand.secondary.900"
        >
            {initials}
        </Circle>
    );
};

export { UserAvatar };
