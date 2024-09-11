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
import styles from './styles.module.css';

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
            <Heading className={styles['scriptViewHeading']} variant="H3">
                Use Open AI to draft your video script
            </Heading>
            <Tabs variant="unstyled" size="sm">
                <TabList className={styles['scriptViewTabList']}>
                    <Tab
                        className={styles['scriptViewTab']}
                        _selected={{
                            color: 'brand.secondary.600',
                            bg: 'white',
                            boxShadow: 'md',
                        }}
                    >
                        Topic Input
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className={styles['scriptViewTabPanel']}>
                        <HStack className={styles['scriptViewHStack']}>
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
