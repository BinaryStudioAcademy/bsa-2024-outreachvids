import {
    FontAwesomeIcon,
    Icon,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { Menu, MenuBody } from './components/components.js';
import { AvatarsContent } from './components/menu-content/content.js';
import {
    AssetsContent,
    ScriptContent,
    ScriptHeader,
    TemplatesContent,
    TextContent,
} from './components/mock/menu-mock.js';
import { type MenuItem } from './types/menu-item.type.js';

type ActiveItem = {
    title: string | React.ReactNode;
    content: React.ReactNode | null;
};

const VideoMenu: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<ActiveItem>({
        title: '',
        content: null,
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = useCallback(
        (header: string | React.ReactNode, content: React.ReactNode): void => {
            setActiveItem({ title: header, content });
            setIsOpen(true);
        },
        [],
    );

    const resetActiveItem = useCallback((): void => {
        setIsOpen(false);
        setActiveIndex(null);
    }, []);

    const menuItems: MenuItem[] = [
        {
            label: 'Templates',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEMPLATE} />,
            onClick: () => handleMenuClick('Templates', <TemplatesContent />),
        },
        {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            onClick: () => handleMenuClick('Avatars', <AvatarsContent />),
        },
        {
            label: 'Script',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.SCRIPT} />,
            onClick: () => handleMenuClick(<ScriptHeader />, <ScriptContent />),
        },
        {
            label: 'Text',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEXT} />,
            onClick: () => handleMenuClick('Text', <TextContent />),
        },
        {
            label: 'Assets',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.UPLOAD} />,
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
                onClose={resetActiveItem}
            >
                {activeItem.content}
            </MenuBody>
        </>
    );
};

export { VideoMenu };
