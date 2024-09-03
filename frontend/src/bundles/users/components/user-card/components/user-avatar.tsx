import { Circle, Image } from '~/bundles/common/components/components.js';

type Properties = {
    username: string;
    imageUrl?: string;
};

const UserAvatar: React.FC<Properties> = ({ username, imageUrl }) => {
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
                    alt={username}
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                    }}
                />
            ) : (
                <>{username}</>
            )}
        </Circle>
    );
};

export { UserAvatar };
