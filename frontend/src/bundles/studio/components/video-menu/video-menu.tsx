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
    const activeIndex = useAppSelector(
        ({ studio }) => studio.ui.menuActiveIndex,
    );
    const dispatch = useAppDispatch();

    const setActiveIndex = useCallback(
        (index: number | null): void => {
            dispatch(studioActions.setMenuActiveIndex(index));
        },
        [dispatch],
    );

    const handleMenuClose = useCallback((): void => {
        setActiveIndex(null);
    }, [setActiveIndex]);

    const menuItems: MenuItem[] = [
        {
            label: 'Templates',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEMPLATE} />,
            getContent: () => <TemplatesContent />,
        },
        {
            label: 'Avatars',
            icon: <Icon as={IconName.AVATAR} />,
            getContent: () => <AvatarsContent />,
        },
        {
            label: 'Script',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.SCRIPT} />,
            getContent: () => <ScriptContent />,
        },
        {
            label: 'Text',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.TEXT} />,
            getContent: () => <TextContent />,
        },
        {
            label: 'Assets',
            icon: <Icon as={FontAwesomeIcon} icon={IconName.UPLOAD} />,
            getContent: () => <AssetsContent />,
        },
    ];

    const activeItem = activeIndex ? menuItems[activeIndex] : null;

    return (
        <>
            <Menu
                items={menuItems}
                activeIndex={activeIndex}
                onActiveIndexSet={setActiveIndex}
            />
            {activeItem && (
                <MenuBody title={activeItem.label} onClose={handleMenuClose}>
                    {activeItem.getContent()}
                </MenuBody>
            )}
        </>
    );
};

export { VideoMenu };
