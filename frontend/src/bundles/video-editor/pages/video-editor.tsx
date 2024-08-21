import { CalendarIcon } from '@chakra-ui/icons';
import { useCallback, useState } from 'react';

import { Menu, MenuBody } from '../components/components.js';
import {
    AssetsContent,
    AvatarsContent,
    ScriptContent,
    TemplatesContent,
    TextContent,
} from '../components/mock/menu-mock.js';

const VideoEditor: React.FC = () => {
    const [activeContent, setActiveContent] = useState<React.ReactNode | null>(
        null,
    );
    const [activeTitle, setActiveTitle] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = (label: string, content: React.ReactNode): void => {
        setActiveContent(content);
        setActiveTitle(label);
        setIsOpen(true);
    };

    const handleClose = useCallback((): void => {
        setIsOpen(false);
    }, []);

    const menuItems = [
        {
            label: 'Templates',
            icon: <CalendarIcon />,
            onClick: () => handleMenuClick('Templates', <TemplatesContent />),
        },
        {
            label: 'Avatars',
            icon: <CalendarIcon />,
            onClick: () => handleMenuClick('Avatars', <AvatarsContent />),
        },
        {
            label: 'Script',
            icon: <CalendarIcon />,
            onClick: () => handleMenuClick('Script', <ScriptContent />),
        },
        {
            label: 'Text',
            icon: <CalendarIcon />,
            onClick: () => handleMenuClick('Text', <TextContent />),
        },
        {
            label: 'Assets',
            icon: <CalendarIcon />,
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
