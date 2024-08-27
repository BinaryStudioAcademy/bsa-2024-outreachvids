import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Box,
    Flex,
    Icon,
    IconButton,
    Spacer,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, Size } from '~/bundles/common/icons/icons.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { UserCard, UserCircle } from '~/bundles/users/components/components.js';

import { CollapseButton, CollapseButtonLink } from './components/components.js';

const SideBar = (): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleToggle = useCallback(
        (): void => setIsCollapsed(!isCollapsed),
        [isCollapsed],
    );

    const activeIconPage = (page: ValueOf<typeof AppRoute>): string => {
        return pathname === page ? 'white' : 'background.600';
    };

    const handleLogOut = useCallback(() => {
        //ToDo: log out user with token
        navigate(AppRoute.SIGN_IN);
    }, [navigate]);

    return (
        <Flex
            w={isCollapsed ? '60px' : '260px'}
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
                <CollapseButtonLink
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconName.HOME}
                            boxSize={Size.LG}
                            color={activeIconPage(AppRoute.ROOT)}
                        />
                    }
                    label="Home"
                    to={AppRoute.ROOT}
                    isCollapsed={isCollapsed}
                />
            </Box>

            <Spacer />

            <CollapseButton
                color="brand.secondary.600"
                icon={
                    <Icon
                        as={FontAwesomeIcon}
                        icon={IconName.LOG_OUT}
                        boxSize={Size.LG}
                        color="brand.secondary.600"
                    />
                }
                isCollapsed={isCollapsed}
                label={'log out'}
                handleClick={handleLogOut}
            />
        </Flex>
    );
};

export { SideBar };
