import { ChatModal } from '~/bundles/chat/pages/chat-modal.js';
import { Icon } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type MenuItems } from '~/bundles/studio/enums/enums.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Menu, MenuBody } from './components/components.js';
import {
    AvatarsContent,
    BackgroundsContent,
    ScriptContent,
} from './components/menu-content/content.js';
// import {
//     AssetsContent,
//     TemplatesContent,
//     TextContent,
// } from './components/mock/menu-mock.js';
import { type MenuItem } from './types/types.js';

const VideoMenu: React.FC = () => {
    const activeItem = useAppSelector(({ studio }) => studio.ui.menuActiveItem);

    const dispatch = useAppDispatch();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const setActiveItem = useCallback(
        (item: ValueOf<typeof MenuItems> | null): void => {
            dispatch(studioActions.setMenuActiveItem(item));
        },
        [dispatch],
    );

    const handleMenuClose = useCallback((): void => {
        setActiveItem(null);
    }, [setActiveItem]);

    const handleChatOpen = useCallback(() => {
        setIsChatOpen(true);
    }, []);

    const handleChatClose = useCallback(() => {
        setIsChatOpen(false);
    }, []);

    const { selectedItem } = useAppSelector(({ studio }) => studio.ui);

    useEffect(() => {
        if (selectedItem?.type === 'script') {
            setActiveItem('script');
            dispatch(studioActions.selectScript(selectedItem.id));
        }
    }, [selectedItem, setActiveItem, dispatch]);

    // TODO: Uncomment menu items after demo

    const menuItems: Record<ValueOf<typeof MenuItems>, MenuItem> = {
        // templates: {
        //     label: 'Templates',
        //     icon: <Icon as={IconName.TEMPLATE} />,
        //     getContent: () => <TemplatesContent />,
        // },
        avatars: {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            getContent: () => <AvatarsContent />,
        },
        script: {
            label: 'Script',
            icon: <Icon as={IconName.SCRIPT} />,
            getContent: () => <ScriptContent />,
        },
        // text: {
        //     label: 'Text',
        //     icon: <Icon as={IconName.TEXT} />,
        //     getContent: () => <TextContent />,
        // },
        // assets: {
        //     label: 'Assets',
        //     icon: <Icon as={IconName.UPLOAD} />,
        //     getContent: () => <AssetsContent />,
        // },
        backgrounds: {
            label: 'Backgrounds',
            icon: <Icon as={IconName.IMAGE} />,
            getContent: () => <BackgroundsContent />,
        },
    };

    const activeMenuItem = activeItem && menuItems[activeItem];

    return (
        <>
            <Menu
                items={menuItems}
                activeItem={activeItem}
                onActiveItemSet={setActiveItem}
            />
            {activeMenuItem && (
                <MenuBody
                    title={activeMenuItem.label}
                    onClose={handleMenuClose}
                    onChatOpen={handleChatOpen}
                >
                    {activeMenuItem.getContent()}
                </MenuBody>
            )}
            <ChatModal
                isChatOpen={isChatOpen}
                onModalChatClose={handleChatClose}
            />
        </>
    );
};

export { VideoMenu };
