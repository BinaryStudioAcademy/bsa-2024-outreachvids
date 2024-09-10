import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css';
import { VoiceCard } from './voice-card.js';

const VoicesModalContent: React.FC = () => {
    const mockCards = Array.from({ length: 10 }, (_, index) => ({
        id: uuidv4(),
        name: `Voice ${index + 1}`,
    }));
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
                    <VoiceCard voice={card} key={card.id} />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export { VoicesModalContent };
