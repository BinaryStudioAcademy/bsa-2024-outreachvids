import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Box,
    Flex,
    Icon,
    IconButton,
    IconMap,
    Spacer,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Size } from '../icon/icon.js';
import {
    CollapseButton,
    CollapseButtonLink,
} from './libs/components/components.js';

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
                    isCollapsed ? (
                        <Icon as={IconMap.ARROW_RIGHT} />
                    ) : (
                        <Icon as={IconMap.ARROW_LEFT} />
                    )
                }
                onClick={handleToggle}
                justifyContent={isCollapsed ? 'center' : 'flex-end'}
                variant="icon"
            />

            <Box>
                <CollapseButtonLink
                    icon={
                        <Icon
                            as={FontAwesomeIcon}
                            icon={IconMap.HOME}
                            boxSize={Size.LG}
                            color={activeIconPage('/')}
                        />
                    }
                    label="Home"
                    to="/"
                    isCollapsed={isCollapsed}
                />
            </Box>

            <Spacer />

            <CollapseButton
                color="brand.secondary.600"
                icon={
                    <Icon
                        as={FontAwesomeIcon}
                        icon={IconMap.LOG_OUT}
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
