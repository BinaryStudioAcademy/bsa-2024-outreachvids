import {
    Box,
    Button,
    Flex,
    Heading,
} from '~/bundles/common/components/components.js';
import { Circles, Dots } from '~/bundles/my-avatar/components/components.js';
import { type Template } from '~/bundles/template/types/types.js';

import { TemplateCard } from '../template-card/template-card.js';
import styles from './styles.module.css';

type Properties = {
    onClick: () => void;
    templates: Template[];
};

const CreationsSection: React.FC<Properties> = ({ onClick, templates }) => {
    return (
        <Box padding="17px 0">
            <Flex alignItems="center" marginBottom="9px">
                <Heading color="typography.900" variant="H3" marginRight="11px">
                    Recent Creations
                </Heading>
            </Flex>

            {templates.length > 0 ? (
                <Box className={styles['horizontal']}>
                    {templates.map(({ id, ...template }) => (
                        <Box
                            key={id}
                            flex="0 0 auto"
                            marginRight="20px"
                            width="250px"
                        >
                            <TemplateCard {...template} id={id} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Flex
                    bg="white"
                    h="140px"
                    borderRadius="lg"
                    justify="center"
                    align="center"
                    overflow="hidden"
                    maxWidth="340px"
                >
                    <Box w={{ base: '222px', sm: '222px' }} position="relative">
                        <Circles />
                        <Dots />
                        <Button
                            label="Create Your First Template"
                            variant="outlined"
                            onClick={onClick}
                        />
                    </Box>
                </Flex>
            )}
        </Box>
    );
};

export { CreationsSection };
