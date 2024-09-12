import {
    type GenerateTextRequestDto,
    textGenerationValidationSchema,
} from '~/bundles/chat/chat.js';
import {
    Button,
    Flex,
    FormProvider,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_CHAT_FORM_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSendMessage: (payload: GenerateTextRequestDto) => void;
};

const ChatFooter: React.FC<Properties> = ({ onSendMessage }) => {
    const form = useAppForm<GenerateTextRequestDto>({
        initialValues: DEFAULT_CHAT_FORM_PAYLOAD,
        validationSchema: textGenerationValidationSchema,
        onSubmit: (data: GenerateTextRequestDto, { resetForm }) => {
            onSendMessage(data);
            resetForm();
        },
    });

    const { handleSubmit, values } = form;

    return (
        <FormProvider value={form}>
            <form onSubmit={handleSubmit}>
                <Flex alignItems={'flex-start'} w={'100%'} gap={5}>
                    <Input
                        type="text"
                        label=""
                        placeholder="Send a message"
                        name="message"
                        value={values.message}
                        width="100%"
                    />
                    <Button
                        type="submit"
                        label="Send"
                        size="md"
                        isDisabled={values.message.trim().length === 0}
                        width="100px"
                    />
                </Flex>
            </form>
        </FormProvider>
    );
};

export { ChatFooter };
