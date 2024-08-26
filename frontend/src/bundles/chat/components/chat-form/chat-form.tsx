import {
    Button,
    Flex,
    FormProvider,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

import {
    type ChatFormRequestDto,
    chatFormValidationSchema,
} from '../../chat.js';
import { DEFAULT_CHAT_FORM_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: ChatFormRequestDto) => void;
};

const ChatForm: React.FC<Properties> = ({ onSubmit }) => {
    const form = useAppForm<ChatFormRequestDto>({
        initialValues: DEFAULT_CHAT_FORM_PAYLOAD,
        validationSchema: chatFormValidationSchema,
        onSubmit,
    });
    const { handleSubmit } = form;

    const isEmpty = false;
    return (
        <FormProvider value={form}>
            <form onSubmit={handleSubmit}>
                <Flex alignItems={'center'}>
                    <Input
                        type="text"
                        label=""
                        placeholder="Send a message"
                        name="message"
                    />
                    <Button
                        type="submit"
                        label="Send"
                        size="md"
                        sx={{ mt: '16px' }}
                        isDisabled={isEmpty}
                    />
                </Flex>
            </form>
        </FormProvider>
    );
};

export { ChatForm };
