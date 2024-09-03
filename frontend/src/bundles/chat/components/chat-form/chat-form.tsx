import {
    Button,
    Flex,
    FormProvider,
    Input,
} from '~/bundles/common/components/components.js';
import { useAppForm, useMemo } from '~/bundles/common/hooks/hooks.js';

import {
    type GenerateTextRequestDto,
    textGenerationValidationSchema,
} from '../../chat.js';
import { DEFAULT_CHAT_FORM_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: GenerateTextRequestDto) => void;
};

const ChatForm: React.FC<Properties> = ({ onSubmit }) => {
    const form = useAppForm<GenerateTextRequestDto>({
        initialValues: DEFAULT_CHAT_FORM_PAYLOAD,
        validationSchema: textGenerationValidationSchema,
        onSubmit: (data: GenerateTextRequestDto, { resetForm }) => {
            onSubmit(data);
            resetForm();
        },
    });
    const { handleSubmit, values } = form;

    const isEmpty = useMemo(
        () => Object.values(values).some((value) => value.trim().length === 0),
        [values],
    );

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
                        sx={{ w: '100%' }}
                    />
                    <Button
                        type="submit"
                        label="Send"
                        size="md"
                        isDisabled={isEmpty}
                        sx={{ w: '100px' }}
                    />
                </Flex>
            </form>
        </FormProvider>
    );
};

export { ChatForm };
