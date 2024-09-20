import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icon-name.js';

type Properties = {
    onCancel: () => void;
    onSubmit: () => void;
};

const WarningContent: React.FC<Properties> = ({ onCancel, onSubmit }) => {
    return (
        <>
            <Heading
                variant="H3"
                color="typography.900"
                textAlign="left"
                mb="20px"
            >
                Notice before you submit
            </Heading>

            <Text as="p" color="typography.600" mb="20px">
                These issues may affect the final outcome of the generated
                video. It is recommended to update your video before submission.
            </Text>

            <Box bg="background.50" p="20px 40px" borderRadius="md" mb="20px">
                <Text variant="H4" color="brand.secondary.300">
                    <Flex align="center" gap="5px" mb="10px">
                        <Icon as={IconName.WARNING} /> Overall scene duration
                        exceeds overall script duration.
                    </Flex>
                </Text>
                <Text as="p" color="typography.600">
                    The scene duration exceeding the TTS (text to speech) audio
                    of script will not be included in the final video.
                </Text>
            </Box>

            <Flex gap="10px" justify="end">
                <Button label="Cancel" w="auto" onClick={onCancel} />
                <Button
                    label="Submit Anyway"
                    w="auto"
                    variant="secondaryOutlined"
                    onClick={onSubmit}
                />
            </Flex>
        </>
    );
};

export { WarningContent };
