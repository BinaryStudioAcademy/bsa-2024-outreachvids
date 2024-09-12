import {
    FontAwesomeIcon,
    Icon,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type MenuItems } from '~/bundles/studio/enums/enums.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

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
import { type MenuItem } from './types/types.js';

const VideoMenu: React.FC = () => {
    const activeItem = useAppSelector(({ studio }) => studio.ui.menuActiveItem);

    const dispatch = useAppDispatch();

    const setActiveItem = useCallback(
        (item: keyof typeof MenuItems | null): void => {
            dispatch(studioActions.setMenuActiveItem(item));
        },
        [dispatch],
    );

    const handleMenuClose = useCallback((): void => {
        setActiveItem(null);
    }, [setActiveItem]);

    const menuItems: Record<keyof typeof MenuItems, MenuItem> = {
        TEMPLATES: {
            label: 'Templates',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEMPLATE} />,
            getContent: () => <TemplatesContent />,
        },
        AVATARS: {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            getContent: () => <AvatarsContent />,
        },
        SCRIPT: {
            label: 'Script',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.SCRIPT} />,
            getContent: () => <ScriptContent />,
        },
        TEXT: {
            label: 'Text',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEXT} />,
            getContent: () => <TextContent />,
        },
        ASSETS: {
            label: 'Assets',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.UPLOAD} />,
            getContent: () => <AssetsContent />,
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
                >
                    {activeMenuItem.getContent()}
                </MenuBody>
            )}
        </>
    );
};

export { VideoMenu };
