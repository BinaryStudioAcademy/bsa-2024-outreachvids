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
import { type MenuItems, RowNames } from '~/bundles/studio/enums/enums.js';
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
    const { activeItem, videoScripts, avatars, scenes } = useAppSelector(
        ({ studio, chat }) => ({
            avatars: studio.avatars,
            scenes: studio.scenes,
            activeItem: studio.ui.menuActiveItem,
            videoScripts: chat.videoScripts,
        }),
    );

    const dispatch = useAppDispatch();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isScriptGenerated, setIsScriptGenerated] = useState(false);
    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

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

    useEffect(() => {
        if (videoScripts.length > 0) {
            const addScriptPromises = videoScripts.map((videoScript) =>
                dispatch(studioActions.addScript(videoScript.description)),
            );
            Promise.all(addScriptPromises)
                .then(() => {
                    return dispatch(studioActions.generateAllScriptsSpeech());
                })
                .then(() => {
                    setIsScriptGenerated(true);
                })
                .catch(() => {});
        }
    }, [dispatch, setIsScriptGenerated, videoScripts]);

    useEffect(() => {
        const avatarsLength = avatars.length;
        if (avatarsLength > 0) {
            setIsAvatarLoaded(true);
            return;
        }

        if (avatarsLength === 0) {
            dispatch(studioActions.loadAvatars())
                .then(() => {
                    setIsAvatarLoaded(true);
                })
                .catch(() => {});
        }
    }, [dispatch, setIsAvatarLoaded, avatars]);

    useEffect(() => {
        if (isScriptGenerated && isAvatarLoaded) {
            const avatar = avatars[0];
            const avatarStyle = avatar?.styles[0];
            const scene = scenes[0];

            if (!avatar || !avatarStyle) {
                return;
            }

            scene
                ? dispatch(
                      studioActions.selectItem({
                          id: scene.id,
                          type: RowNames.SCENE,
                      }),
                  )
                : dispatch(studioActions.addScene());

            dispatch(
                studioActions.addAvatarToScene({
                    id: avatar.id,
                    name: avatar.name,
                    style: avatarStyle.style,
                    url: avatarStyle.imgUrl,
                }),
            );
        }
    }, [dispatch, scenes, avatars, isScriptGenerated, isAvatarLoaded]);

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
