import { Circle } from '~/bundles/common/components/components.js';

import { getInitials } from '../helpers/helpers.js';

type Properties = {
    username: string | undefined;
};

const UserAvatar: React.FC<Properties> = ({ username }) => {
    const initials = getInitials(username);
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
