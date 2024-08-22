import { useCallback, useState } from 'react';

import { AssetsIcon, AvatarIcon, ScriptIcon, TemplatesIcon, TextIcon } from '~/bundles/common/components/icons/icons.js';

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
    const [activeContent, setActiveContent] = useState<React.ReactNode | null>(
        null,
    );
    const [activeTitle, setActiveTitle] = useState<string | React.ReactNode>('');
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = (header: string | React.ReactNode, content: React.ReactNode): void => {
        setActiveContent(content);
        setActiveTitle(header);
        setIsOpen(true);
    };

    const handleClose = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const menuItems: MenuItem[] = [
        {
            label: 'Templates',
            icon: <TemplatesIcon />,
            onClick: () => handleMenuClick('Templates', <TemplatesContent />),
        },
        {
            label: 'Avatars',
            icon: <AvatarIcon />,
            onClick: () => handleMenuClick('Avatars', <AvatarsContent />),
        },
        {
            label: 'Script',
            icon: <ScriptIcon />,
            onClick: () => handleMenuClick(<ScriptHeader />, <ScriptContent />),
        },
        {
            label: 'Text',
            icon: <TextIcon />,
            onClick: () => handleMenuClick('Text', <TextContent />),
        },
        {
            label: 'Assets',
            icon: <AssetsIcon />,
            onClick: () => handleMenuClick('Assets', <AssetsContent />),
        },
    ];

    return (
        <>
            <Menu items={menuItems} />
            <MenuBody title={activeTitle} isOpen={isOpen} onClose={handleClose}>
                {activeContent}
            </MenuBody>
        </>
    );
};

export { VideoEditor };
