import {
    Box,
    Button,
    Flex,
    Header,
    Icon,
    Loader,
    Overlay,
    Sidebar,
    Text,
} from '~/bundles/common/components/components.js';
import { useCollapse } from '~/bundles/common/components/sidebar/hooks/use-collapse.hook.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import {
    CreationsSection,
    TemplatesSection,
} from '~/bundles/template/components/components.js';

import styles from './styles.module.css';

const Templates: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { templates, dataStatus } = useAppSelector(({ studio }) => studio);

    useEffect(() => {
        if (templates.public.length === EMPTY_VALUE) {
            void dispatch(studioActions.loadPublicTemplates());
        }
        if (!templates.isUserLoaded) {
            void dispatch(studioActions.loadUserTemplates());
        }
    }, [dispatch, templates]);

    const { isCollapsed } = useCollapse();

    const handleClick = useCallback(() => {
        navigate(AppRoute.STUDIO);
    }, [navigate]);

    return (
        <Box bg="background.900" minHeight="100vh">
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <Header />
            <Sidebar>
                <Box
                    bg="background.900"
                    pr="25px"
                    w={
                        isCollapsed
                            ? 'calc(100vw - 60px)'
                            : 'calc(100vw - 270px)'
                    }
                >
                    <Flex
                        bg="background.50"
                        borderTopRadius="xl"
                        className={styles['container']}
                    >
                        <Flex justifyContent="space-between">
                            <Text variant="title">Templates</Text>
                            <Button
                                leftIcon={<Icon as={IconName.ADD} />}
                                label="Create Template"
                                variant="outlined"
                                width="auto"
                                onClick={handleClick}
                            ></Button>
                        </Flex>

                        <CreationsSection
                            templates={templates.user}
                            onClick={handleClick}
                        />
                        <TemplatesSection templates={templates.public} />
                    </Flex>
                </Box>
            </Sidebar>
        </Box>
    );
};

export { Templates };
