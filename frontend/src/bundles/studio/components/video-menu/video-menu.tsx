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
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type MenuItems } from '~/bundles/studio/enums/enums.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Menu, MenuBody } from './components/components.js';
import {
    AvatarsContent,
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

    const setActiveItem = useCallback(
        (item: ValueOf<typeof MenuItems> | null): void => {
            dispatch(studioActions.setMenuActiveItem(item));
        },
        [dispatch],
    );

    const handleMenuClose = useCallback((): void => {
        setActiveItem(null);
    }, [setActiveItem]);

    // TODO: Uncomment menu items after demo

    const menuItems: Record<ValueOf<typeof MenuItems>, MenuItem> = {
        // templates: {
        //     label: 'Templates',
        //     icon: <Icon as={FontAwesomeIcon} icon={IconName.TEMPLATE} />,
        //     getContent: () => <TemplatesContent />,
        // },
        avatars: {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            getContent: () => <AvatarsContent />,
        },
        script: {
            label: 'Script',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.SCRIPT} />,
            getContent: () => <ScriptContent />,
        },
        // text: {
        //     label: 'Text',
        //     icon: <Icon as={FontAwesomeIcon} icon={IconName.TEXT} />,
        //     getContent: () => <TextContent />,
        // },
        // assets: {
        //     label: 'Assets',
        //     icon: <Icon as={FontAwesomeIcon} icon={IconName.UPLOAD} />,
        //     getContent: () => <AssetsContent />,
        // },
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
