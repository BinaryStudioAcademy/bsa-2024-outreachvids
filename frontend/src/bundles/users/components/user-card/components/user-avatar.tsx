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
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                    }}
                />
            ) : (
                <>{initials}</>
            )}
        </Circle>
    );
};

export { UserAvatar };
