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
import { getVideoScriptMessageFromPayload } from '~/bundles/common/components/video-modal/components/video-modal-content/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

import { GenerateScriptForm } from '../generate-script-form/generate-script-form.js';
import { GenerateScriptPlaceholder } from '../generate-script-placeholder/generate-script-placeholder.js';
import styles from './styles.module.css';

type Properties = {
    onClose: () => void;
};
const GenerateScriptView: React.FC<Properties> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const { messages, videoScripts } = useAppSelector(({ chat }) => ({
        messages: chat.messages.filter(
            (message) => message.sender === MessageSender.AI,
        ),
        videoScripts: chat.videoScripts,
    }));

    const handleGenerateVideoScriptSubmit = useCallback(
        (payload: GenerateVideoScriptRequestDto): void => {
            const sendMessageRequest: GenerateTextRequestDto = {
                message: getVideoScriptMessageFromPayload(payload, messages),
            };
            void dispatch(chatActions.sendMessage(sendMessageRequest)).then(
                () => {
                    dispatch(chatActions.generateVideoScript());
                },
            );
        },
        [messages, dispatch],
    );

    return (
        <>
            <Heading className={styles['script-view-heading']} variant="H3">
                Use Open AI to draft your video script
            </Heading>
            <Tabs variant="unstyled" size="sm">
                <TabList className={styles['script-view-tab-list']}>
                    <Tab
                        className={styles['script-view-tab']}
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
                    <TabPanel className={styles['script-view-tab-panel']}>
                        <HStack className={styles['script-view-hstack']}>
                            <GenerateScriptForm
                                onSubmit={handleGenerateVideoScriptSubmit}
                            />
                            <GenerateScriptPlaceholder
                                videoScripts={videoScripts}
                                onClose={onClose}
                            />
                        </HStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { GenerateScriptView };
