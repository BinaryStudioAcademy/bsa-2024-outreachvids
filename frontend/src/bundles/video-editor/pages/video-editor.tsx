import {
    faCircleUser,
    faCloudArrowUp,
    faFont,
    faT,
    faTableColumns,
    FontAwesomeIcon,
    Icon,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { Menu, MenuBody } from '../components/components.js';
import {
    AssetsContent,
    AvatarsContent,
    ScriptContent,
    ScriptHeader,
    TemplatesContent,
    TextContent,
} from '../components/mock/menu-mock.js';
import { type MenuItem } from '../types/menu-item.type.js';

const VideoEditor: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeContent, setActiveContent] = useState<React.ReactNode | null>(
        null,
    );
    const [activeTitle, setActiveTitle] = useState<string | React.ReactNode>(
        '',
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = (
        header: string | React.ReactNode,
        content: React.ReactNode,
    ): void => {
        setActiveContent(content);
        setActiveTitle(header);
        setIsOpen(true);
    };

    const resetActiveItem = useCallback((): void => {
        setIsOpen(false);
        setActiveIndex(null);
    }, []);

    const menuItems: MenuItem[] = [
        {
            label: 'Templates',
            icon: <Icon as={FontAwesomeIcon} icon={faTableColumns} />,
            onClick: () => handleMenuClick('Templates', <TemplatesContent />),
        },
        {
            label: 'Avatars',
            icon: <Icon as={FontAwesomeIcon} icon={faCircleUser} />,
            onClick: () => handleMenuClick('Avatars', <AvatarsContent />),
        },
        {
            label: 'Script',
            icon: <Icon as={FontAwesomeIcon} icon={faFont} />,
            onClick: () => handleMenuClick(<ScriptHeader />, <ScriptContent />),
        },
        {
            label: 'Text',
            icon: <Icon as={FontAwesomeIcon} icon={faT} />,
            onClick: () => handleMenuClick('Text', <TextContent />),
        },
        {
            label: 'Assets',
            icon: <Icon as={FontAwesomeIcon} icon={faCloudArrowUp} />,
            onClick: () => handleMenuClick('Assets', <AssetsContent />),
        },
    ];

    return (
        <>
            <Menu
                items={menuItems}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <MenuBody
                title={activeTitle}
                isOpen={isOpen}
                onClose={resetActiveItem}
            >
                {activeContent}
            </MenuBody>
        </>
    );
};

export { VideoEditor };
