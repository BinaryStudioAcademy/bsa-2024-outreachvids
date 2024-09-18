import { MessageSender } from '~/bundles/chat/enums/enums.js';
import {
    Button,
    FormProvider,
    Input,
    Select,
    Textarea,
    VStack,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import {
    type GenerateVideoScriptRequestDto,
    generateVideoScriptValidationSchema,
} from '~/bundles/video-scripts/video-scripts.js';

import { DEFAULT_GENERATE_SCRIPT_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.css';

type Properties = {
    onSubmit: (payload: GenerateVideoScriptRequestDto) => void;
};

const GenerateScriptForm: React.FC<Properties> = ({ onSubmit }) => {
    const { messages, dataStatus } = useAppSelector(({ chat }) => ({
        messages: chat.messages.filter(
            (message) => message.sender === MessageSender.AI,
        ),
        dataStatus: chat.dataStatus,
    }));
    const form = useAppForm<GenerateVideoScriptRequestDto>({
        initialValues: DEFAULT_GENERATE_SCRIPT_PAYLOAD,
        validationSchema: generateVideoScriptValidationSchema,
        onSubmit,
    });

    const { handleSubmit, values } = form;

    const getButtonLabel = useCallback(() => {
        if (dataStatus === DataStatus.PENDING) {
            return 'Stop';
        }

        return messages?.length > 0 ? 'Re-Generate' : 'Generate script';
    }, [dataStatus, messages]);

    const isSubmitButtonDisabled = useCallback(() => {
        return (
            dataStatus === DataStatus.PENDING ||
            values.topic.trim().length === 0
        );
    }, [dataStatus, values]);

    return (
        <FormProvider value={form}>
            <form onSubmit={handleSubmit}>
                <VStack
                    className={styles['script-form-container']}
                    spacing="20px"
                >
                    <Textarea
                        label="Topic"
                        name="topic"
                        placeholder="Introduce your platform"
                        className={styles['script-form-textarea-topic']}
                        required
                    />
                    <Select label="Target language" name="language" required>
                        <option value="english" defaultChecked>
                            English
                        </option>
                    </Select>
                    <Input
                        type="text"
                        label="Tone"
                        name="tone"
                        placeholder="Professional"
                    />
                    <Textarea
                        label="Additional info"
                        name="additionalInfo"
                        placeholder="An online video tool with built-in talking AI-avatars"
                        className={styles['script-form-textarea-additional-info']}
                    />
                    <Button
                        type="submit"
                        label={getButtonLabel()}
                        margin-top="50px"
                        isDisabled={isSubmitButtonDisabled()}
                    />
                </VStack>
            </form>
        </FormProvider>
    );
};

export { GenerateScriptForm };
