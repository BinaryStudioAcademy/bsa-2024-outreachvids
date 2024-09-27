import {
    Box,
    Button,
    Flex,
    Header,
    Icon,
    Sidebar,
    Text,
} from '~/bundles/common/components/components.js';
import { useCollapse } from '~/bundles/common/components/sidebar/hooks/use-collapse.hook.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import {
    CreationsSection,
    TemplatesSection,
} from '~/bundles/template/components/components.js';

import styles from './styles.module.css';

const Templates: React.FC = () => {
    const { isCollapsed } = useCollapse();

    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(AppRoute.STUDIO);
    }, [navigate]);

    return (
        <Box bg="background.900" minHeight="100vh">
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

                        <CreationsSection onClick={handleClick} />
                        <TemplatesSection />
                    </Flex>
                </Box>
            </Sidebar>
        </Box>
    );
};

export { Templates };
