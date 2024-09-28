import {
    Badge,
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { type Voice } from '~/bundles/home/types/types.js';
import { VoiceCard } from '~/bundles/voices/components/components.js';
import { VoicesSections } from '~/bundles/voices/enums/voices-sections.js';

import styles from './styles.module.css';

type Properties = {
    voices: Voice[];
    title: string;
};

const VoiceSection: React.FC<Properties> = ({ voices, title }) => {
    return (
        <Box padding="17px 28px">
            <Flex alignItems="center" marginBottom="9px">
                <Heading color="typography.900" variant="H3" marginRight="11px">
                    {title}
                </Heading>
                <Badge
                    color="background.600"
                    bg="#D1D4DB"
                    fontWeight="400"
                    padding="2px 10px"
                >
                    {voices.length}
                </Badge>
            </Flex>

            {voices.length > EMPTY_VALUE ? (
                title === VoicesSections.MY_VOICES ? (
                    <Box className={styles['horizontal']}>
                        {voices.map((voice) => (
                            <Box
                                key={voice.shortName}
                                flex="0 0 auto"
                                marginRight="20px"
                                width="250px"
                            >
                                <VoiceCard voice={voice} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <SimpleGrid className={styles['grid']} spacing="20px">
                        {voices.map((voice) => (
                            <VoiceCard voice={voice} key={voice.shortName} />
                        ))}
                    </SimpleGrid>
                )
            ) : (
                <Text color="typography.600" variant="body1">
                    You have no voices right now.
                </Text>
            )}
        </Box>
    );
};

export { VoiceSection };
