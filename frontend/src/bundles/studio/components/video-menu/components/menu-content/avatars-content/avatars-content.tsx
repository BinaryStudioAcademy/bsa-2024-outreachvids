import avatar from '~/assets/img/avatar.png';
import { SimpleGrid, Text } from '~/bundles/common/components/components.js';

import { AvatarCard } from './components/components.js';

const AvatarsContent: React.FC = () => {
    {
        /* This is mocked data. Should be updated later */
    }
    const avatars = [];
    for (let index = 0; index < 10; index++) {
        avatars.push(<AvatarCard preview={avatar} key={index} />);
    }

    return (
        <>
            <Text variant="body1" mb="12px">
                Public avatar
            </Text>
            <SimpleGrid columns={3} spacingX="13px" spacingY="10px">
                {avatars}
            </SimpleGrid>
        </>
    );
};

export { AvatarsContent };
