import { Circle } from '~/bundles/common/components/components.js';

type Properties = {
    username: string;
};

const UserAvatar: React.FC<Properties> = ({ username }) => {
    return (
        <Circle
            size="40px"
            border="2px solid"
            borderColor="brand.secondary.900"
            color="brand.secondary.900"
        >
            {username}
        </Circle>
    );
};

export { UserAvatar };
