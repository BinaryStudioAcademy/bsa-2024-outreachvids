import { type GenerateTextRequestDto } from '~/bundles/chat/chat.js';
import { MessageSender } from '~/bundles/chat/enums/message-sender.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    Heading,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { type VideoScript } from '~/bundles/common/types/video-script.type.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

import {
    getVideoScriptMessageFromPayload,
    sanitizeJsonString,
} from '../../helpers/helpers.js';
import { GenerateScriptForm } from '../generate-script-form/generate-script-form.js';
import { GenerateScriptPlaceholder } from '../generate-script-placeholder/generate-script-placeholder.js';

const GenerateScriptView: React.FC = () => {
    const dispatch = useAppDispatch();
    const { messages } = useAppSelector(({ chat }) => ({
        messages: chat.messages.filter(
            (message) => message.sender === MessageSender.AI,
        ),
    }));

    const handleGenerateVideoScriptSubmit = useCallback(
        (payload: GenerateVideoScriptRequestDto): void => {
            const sendMessageRequest: GenerateTextRequestDto = {
                message: getVideoScriptMessageFromPayload(payload, messages),
            };
            void dispatch(chatActions.sendMessage(sendMessageRequest));
        },
        [messages, dispatch],
    );

    const lastGeneratedScript: VideoScript[] = useMemo(() => {
        if (!messages || messages.length === 0) {
            return [];
        }

        const lastMessage = messages.at(-1);
        if (!lastMessage) {
            return [];
        }

        try {
            const sanitizedJson = sanitizeJsonString(lastMessage.text);
            const videoScripts: VideoScript[] = JSON.parse(sanitizedJson);
            return videoScripts;
        } catch {
            return [
                {
                    title: 'Scene',
                    description: lastMessage.text,
                },
            ];
        }
    }, [messages]);

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
                        <HStack justify="space-between" alignItems="flex-start">
                            <GenerateScriptForm
                                onSubmit={handleGenerateVideoScriptSubmit}
                            />
                            <GenerateScriptPlaceholder
                                videoScripts={lastGeneratedScript}
                            />
                        </HStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { GenerateScriptView };
