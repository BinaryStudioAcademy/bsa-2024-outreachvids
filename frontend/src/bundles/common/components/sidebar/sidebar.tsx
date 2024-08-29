import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    useCallback,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { UserCard, UserCircle } from '~/bundles/users/components/components.js';

import { SidebarItem } from './components/components.js';

type Properties = {
    children: React.ReactNode;
};

const Sidebar = ({ children }: Properties): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleToggle = useCallback(
        (): void => setIsCollapsed(!isCollapsed),
        [isCollapsed],
    );

    const activeButtonPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'background.600' : '';
    };

    const activeIconPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'white' : 'background.600';
    };

    const handleLogOut = useCallback(() => {
        //ToDo: log out user with token
        navigate(AppRoute.SIGN_IN);
    }, [navigate]);

    return (
        <Flex w="100%">
            <Flex
                w={isCollapsed ? '60px' : '270px'}
                bg="background.900"
                height="100vh"
                position="fixed"
                flexDirection="column"
                justifyContent="space-between"
                p="10px"
                pb="20px"
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
                    {/* ToDo: Add this username value dynamically */}
                    {isCollapsed ? <UserCircle username="FN" /> : <UserCard />}
                </Box>
                <Box>
                    <Link to={AppRoute.ROOT}>
                        <SidebarItem
                            bg={activeButtonPage(AppRoute.ROOT)}
                            icon={
                                <Icon
                                    as={FontAwesomeIcon}
                                    icon={IconName.HOME}
                                    boxSize={5}
                                    color={activeIconPage(AppRoute.ROOT)}
                                />
                            }
                            isCollapsed={isCollapsed}
                            label="Home"
                        />
                    </Link>
                </Box>
                <Spacer />
                <SidebarItem
                    color="brand.secondary.600"
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.LOG_OUT}
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