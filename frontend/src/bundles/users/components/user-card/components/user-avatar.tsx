import { Circle, Image } from '~/bundles/common/components/components.js';

import { getInitials } from '../helpers/helpers.js';

type Properties = {
    username: string | undefined;
    imageUrl?: string;
};

const UserAvatar: React.FC<Properties> = ({ username, imageUrl }) => {
    const initials = getInitials(username);
    return (
        <Circle
            size="40px"
            border="2px solid"
            borderColor="brand.secondary.900"
            color="brand.secondary.900"
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={initials}
                    h={'100%'}
                    w={'100%'}
                    borderRadius={'50%'}
                />
            ) : (
                <>{initials}</>
            )}
        </Circle>
    );
};

export { UserAvatar };
