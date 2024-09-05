import {
    Heading,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';

import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

import { GenerateScriptForm } from '../generate-script-form/generate-script-form.js';
import { GenerateScriptPlaceholder } from '../generate-script-placeholder/generate-script-placeholder.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVideoScriptMessageFromPayload = (
    payload: GenerateVideoScriptRequestDto,
): string => {
    const { language, topic, tone, additionalInfo } = payload;
    const additionalInfoMessage =
        additionalInfo.length > 0
            ? `, to make a better script use this additional information: '${additionalInfo}'`
            : '';

    return `Create the script narration for a video,
        divided in scene, generate script on topic '${topic}'
        in '${language}' using a '${tone}' tone ${additionalInfoMessage}.
    `;
};

const GenerateScriptView: React.FC = () => {
    const handleGenerateVideoScriptSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (payload: GenerateVideoScriptRequestDto): void => {
            // TODO dispatch video script generation action
        },
        [],
    );

    return (
        <>
            <Heading
                color="typography.900"
                variant="H3"
                padding="33px 0px 20px"
            >
                Use Open AI to draft your video script
            </Heading>
            <Tabs variant="unstyled" size="sm">
                <TabList
                    w="max-content"
                    bgColor="gray.100"
                    borderWidth="1px"
                    borderRadius="md"
                    p={1}
                    gap="10px"
                >
                    <Tab
                        borderRadius="md"
                        _selected={{
                            color: 'brand.secondary.600',
                            bg: 'white',
                            boxShadow: 'md',
                        }}
                        px={4}
                        py={1}
                    >
                        Topic Input
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <HStack justify="space-between">
                            <GenerateScriptForm
                                onSubmit={handleGenerateVideoScriptSubmit}
                            />
                            <GenerateScriptPlaceholder generatedText="Test" />
                        </HStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { GenerateScriptView };
