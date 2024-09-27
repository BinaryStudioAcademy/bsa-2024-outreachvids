import { Header, Sidebar } from '~/bundles/common/components/components.js';

import { Avatars } from '../components/components.js';

const AIAvatars: React.FC = () => {
    return (
        <>
            <Header />
            <Sidebar>
                <Avatars />
            </Sidebar>
        </>
    );
};

export { AIAvatars };
