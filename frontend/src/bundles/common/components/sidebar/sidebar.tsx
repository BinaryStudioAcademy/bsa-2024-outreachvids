import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Link,
    Spacer,
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

const Sidebar = ({ children }: Properties): JSX.Element => {
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
                className={styles['sidebarContainer']}
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
                    label={'log out'}
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
