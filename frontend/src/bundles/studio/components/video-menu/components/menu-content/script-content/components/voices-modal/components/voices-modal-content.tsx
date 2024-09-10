import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';

import styles from './styles.module.css';
import { VoiceCard } from './voice-card.js';

const VoicesModalContent: React.FC = () => {
    const mockCards = [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5',
        'test6',
        'test7',
        'test8',
        'test9',
        'test10',
    ];
    return (
        <VStack>
            <Heading
                className={styles['modal-header']}
                variant="H3"
                color="typography.900"
            >
                AI Voice
            </Heading>
            <SimpleGrid
                className={styles['modal-content']}
                w="full"
                columns={[2, null, 3]}
            >
                {mockCards.map((card) => (
                    <VoiceCard voiceName={card} key={card} />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export { VoicesModalContent };
