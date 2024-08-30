import { Flex, Image } from '~/bundles/common/components/components.js';

type Properties = {
    preview: string;
};

const AvatarCard: React.FC<Properties> = ({ preview }) => {
    return (
        <Flex
            bg="background.700"
            height="162px"
            alignItems="flex-end"
            borderRadius="7px"
            borderWidth="1px"
            borderColor="transparent"
            transition="all 0.3s ease"
            _hover={{
                backgroundColor: 'background.600',
                borderColor: 'brand.secondary.300',
            }}
        >
            <Image
                boxSize="130px"
                objectFit="cover"
                src={preview}
                alt="Avatar preview"
                borderRadius="7px"
            />
        </Flex>
    );
};

export { AvatarCard };
