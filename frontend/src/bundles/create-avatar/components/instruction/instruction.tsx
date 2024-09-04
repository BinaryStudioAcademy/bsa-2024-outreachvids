import {
    Box,
    Button,
    Flex,
    Icon,
    ListItem,
    Text,
    UnorderedList,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';

const Instruction: React.FC = () => {
    return (
        <Flex
            sx={{
                flexDirection: 'column',
                bg: 'white',
                p: '30px',
                borderRadius: '10px',
                alignItems: 'center',
                gap: '50px',
                paddingBottom: '80px',
            }}
        >
            <Flex
                sx={{
                    color: 'typography.600',
                    fontSize: '14px',
                    justifyContent: 'center',
                    gap: '40px',
                }}
            >
                <Box>
                    <Flex gap="5px" marginBottom="30px">
                        <Icon
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                color: 'brand.secondary.50',
                            }}
                            boxSize={5}
                            as={IconName.CHECK_CIRCLE}
                        />
                        <Text
                            as="span"
                            color="brand.secondary.50"
                            variant="bodySmall"
                        >
                            Screenshots
                        </Text>
                    </Flex>
                    <UnorderedList
                        sx={{
                            maxWidth: '300px',
                        }}
                    >
                        <ListItem>At least 5 minutes of footage</ListItem>
                        <ListItem>High resolution camera</ListItem>
                        <ListItem>Well-lit quiet environment</ListItem>
                        <ListItem>
                            Keep your head centered in the frame
                        </ListItem>
                        <ListItem>
                            Ensure face visibility; do not cover your mouth
                        </ListItem>
                        <ListItem>
                            Use a tripod or stabilize your phone to avoid
                            shaking
                        </ListItem>
                    </UnorderedList>
                </Box>
                <Box>
                    <Flex gap="5px" marginBottom="30px">
                        <Icon
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                color: 'brand.secondary.900',
                            }}
                            boxSize={5}
                            as={IconName.CHECK_CIRCLE}
                        />
                        <Text
                            as="span"
                            color="brand.secondary.900"
                            variant="bodySmall"
                        >
                            Things to avoid
                        </Text>
                    </Flex>
                    <UnorderedList
                        sx={{
                            maxWidth: '300px',
                        }}
                    >
                        <ListItem>Stitches or cuts of your footage</ListItem>
                        <ListItem>Talking without pauses</ListItem>
                        <ListItem>Fast head movements</ListItem>
                        <ListItem>Loud background noise like music</ListItem>
                        <ListItem>
                            Shadows or overexposure on your face
                        </ListItem>
                        <ListItem>
                            Diverting your gaze or looking around
                        </ListItem>
                        <ListItem>
                            Hand gestures above the chest or pointing gestures
                        </ListItem>
                    </UnorderedList>
                </Box>
            </Flex>
            <Button
                label="Next step"
                sx={{
                    maxWidth: '220px',
                }}
            />
        </Flex>
    );
};

export { Instruction };
