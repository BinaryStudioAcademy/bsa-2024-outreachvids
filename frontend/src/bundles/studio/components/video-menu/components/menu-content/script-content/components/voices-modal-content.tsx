import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';

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
                width="290px"
                padding="33px 44px 0px"
                variant="H3"
                color="typography.900"
                alignSelf="start"
            >
                AI Voice
            </Heading>
            <SimpleGrid
                columns={[2, null, 3]}
                spacing="20px"
                overflowY="auto"
                padding="20px"
                alignContent="space-between"
                w="full"
            >
                {mockCards.map((card) => (
                    <VoiceCard voiceName={card} key={card} />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export { VoicesModalContent };
