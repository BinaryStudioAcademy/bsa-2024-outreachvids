import avatar from '~/assets/img/avatar.png';
import { Flex, Image } from '~/bundles/common/components/components.js';

const AvatarCard: React.FC = () => {
    return (
        <Flex
            bg="background.700"
            height="162px"
            alignItems="flex-end"
            borderRadius="7px"
        >
            <Image
                boxSize="130px"
                objectFit="cover"
                src={avatar}
                alt="Avatar preview"
                borderRadius="7px"
            />
        </Flex>
    );
};

export { AvatarCard };
