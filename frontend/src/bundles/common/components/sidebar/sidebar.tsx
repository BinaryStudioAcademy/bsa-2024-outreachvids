import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Link,
    Spacer,
    Text,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { UserAvatar, UserCard } from '~/bundles/users/components/components.js';

import { SidebarItem } from './components/components.js';
import { useCollapse } from './hooks/use-collapse.hook.js';
import styles from './styles.module.css';

type Properties = {
    children: React.ReactNode;
};

const Sidebar: React.FC<Properties> = ({ children }) => {
    const user = useAppSelector(({ auth }) => auth.user);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { isCollapsed, setToggle } = useCollapse();

    const activeButtonPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'background.600' : '';
    };

    const activeIconPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'white' : 'background.600';
    };

    const handleToggle = useCallback((): void => {
        setToggle();
    }, [setToggle]);

    const handleLogOut = useCallback(() => {
        void dispatch(authActions.logout());
    }, [dispatch]);

    return (
        <Flex w="100%">
            <Flex
                w={isCollapsed ? '60px' : '270px'}
                className={styles['sidebar-container']}
            >
                <IconButton
                    aria-label={isCollapsed ? 'expand' : 'collapse'}
                    icon={
                        <Icon
                            as={
                                isCollapsed
                                    ? IconName.ARROW_RIGHT
                                    : IconName.ARROW_LEFT
                            }
                        />
                    }
                    onClick={handleToggle}
                    justifyContent={isCollapsed ? 'center' : 'flex-end'}
                    variant="icon"
                />
                <Box mb="30px">
                    {isCollapsed ? (
                        <UserAvatar username={user?.fullName} />
                    ) : (
                        <UserCard />
                    )}
                </Box>
                <Box>
                    <Link to={AppRoute.ROOT}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.ROOT)}
                            icon={
                                <Icon
                                    as={IconName.HOME}
                                    boxSize={5}
                                    color={activeIconPage(AppRoute.ROOT)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="Home"
                        />
                    </Link>
                    <Link to={AppRoute.MY_AVATAR}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.MY_AVATAR)}
                            icon={
                                <Icon
                                    as={IconName.AVATAR}
                                    boxSize={5}
                                    color={activeIconPage(AppRoute.MY_AVATAR)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="My Avatar"
                        />
                    </Link>
                    <Link to={AppRoute.TEMPLATES}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.TEMPLATES)}
                            icon={
                                <Icon
                                    as={IconName.TEMPLATE}
                                    boxSize={5}
                                    color={activeIconPage(AppRoute.TEMPLATES)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="Templates"
                        />
                    </Link>
                    {isCollapsed ? (
                        <Text color="background.600" variant="caption">
                            Assets
                        </Text>
                    ) : (
                        <Text color="background.600" variant="bodySmall">
                            Assets
                        </Text>
                    )}
                    <Link to={AppRoute.VOICES}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.VOICES)}
                            icon={
                                <Icon
                                    as={IconName.VOICE}
                                    boxSize={5}
                                    color={activeIconPage(AppRoute.VOICES)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="AI Voices"
                        />
                    </Link>
                </Box>

                <Box>
                    <Link to={AppRoute.AI_AVATARS}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.AI_AVATARS)}
                            icon={
                                <Icon
                                    as={IconName.AI_AVATARS}
                                    boxSize={4}
                                    color={activeIconPage(AppRoute.AI_AVATARS)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="AI Avatars"
                        />
                    </Link>
                </Box>

                <Spacer />
                <SidebarItem
                    color="brand.secondary.600"
                    icon={
                        <Icon
                            as={IconName.LOG_OUT}
                            boxSize={5}
                            color="brand.secondary.600"
                        />
                    }
                    isCollapsed={isCollapsed}
                    label={'Log out'}
                    onClick={handleLogOut}
                />
            </Flex>
            <Box flex="1" ml={isCollapsed ? '60px' : '270px'}>
                {children}
            </Box>
        </Flex>
    );
};

export { Sidebar };
