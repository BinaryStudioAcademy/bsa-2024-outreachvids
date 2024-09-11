import { Icon } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { Menu, MenuBody } from './components/components.js';
import {
    AvatarsContent,
    ScriptContent,
} from './components/menu-content/content.js';
import {
    AssetsContent,
    TemplatesContent,
    TextContent,
} from './components/mock/menu-mock.js';
import { type ActiveItem, type MenuItem } from './types/types.js';

const VideoMenu: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<ActiveItem>({
        title: '',
        content: null,
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = useCallback(
        (header: string, content: React.ReactNode): void => {
            setActiveItem({ title: header, content });
            setIsOpen(true);
        },
        [],
    );

    const handleActiveItemReset = useCallback((): void => {
        setIsOpen(false);
        setActiveIndex(null);
    }, []);

    const menuItems: MenuItem[] = [
        {
            label: 'Templates',
            icon: <Icon as={IconName.TEMPLATE} />,
            onClick: () => handleMenuClick('Templates', <TemplatesContent />),
        },
        {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            onClick: () => handleMenuClick('Avatars', <AvatarsContent />),
        },
        {
            label: 'Script',
            icon: <Icon as={IconName.SCRIPT} />,
            onClick: () => handleMenuClick('Script', <ScriptContent />),
        },
        {
            label: 'Text',
            icon: <Icon as={IconName.TEXT} />,
            onClick: () => handleMenuClick('Text', <TextContent />),
        },
        {
            label: 'Assets',
            icon: <Icon as={IconName.UPLOAD} />,
            onClick: () => handleMenuClick('Assets', <AssetsContent />),
        },
    ];

    return (
        <>
            <Menu
                items={menuItems}
                activeIndex={activeIndex}
                onActiveIndexSet={setActiveIndex}
            />
            <MenuBody
                title={activeItem.title}
                isOpen={isOpen}
                onClose={handleActiveItemReset}
            >
                {activeItem.content}
            </MenuBody>
        </>
    );
};

export { VideoMenu };
