import { SimpleGrid, Text } from '~/bundles/common/components/components.js';

import { AvatarCard } from '../components/components.js';

const AvatarsContent: React.FC = () => {
    return (
        <>
            <Text variant="body1" mb="12px">
                Public avatar
            </Text>
            <SimpleGrid columns={3} spacingX="13px" spacingY="10px">
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
            </SimpleGrid>
        </>
    );
};

export { AvatarsContent };
