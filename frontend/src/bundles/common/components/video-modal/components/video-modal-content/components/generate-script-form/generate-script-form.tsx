import {
    Button,
    FormProvider,
    Input,
    Select,
    Textarea,
    VStack,
} from '~/bundles/common/components/components.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';
import {
    type GenerateVideoScriptRequestDto,
    generateVideoScriptValidationSchema,
} from '~/bundles/video-scripts/video-scripts.js';

import { DEFAULT_GENERATE_SCRIPT_PAYLOAD } from './constants/constants.js';
import styles from './generate-script-form.module.css';

type Properties = {
    onSubmit: (payload: GenerateVideoScriptRequestDto) => void;
};

const GenerateScriptForm: React.FC<Properties> = ({ onSubmit }) => {
    const form = useAppForm<GenerateVideoScriptRequestDto>({
        initialValues: DEFAULT_GENERATE_SCRIPT_PAYLOAD,
        validationSchema: generateVideoScriptValidationSchema,
        onSubmit,
    });

    const { handleSubmit, values } = form;

    return (
        <FormProvider value={form}>
            <form onSubmit={handleSubmit}>
                <VStack className={styles['container']} spacing="20px">
                    <Textarea
                        label="Topic"
                        name="topic"
                        placeholder="Introduce your platform"
                        className={styles['textareaTopic']}
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
                        className={styles['textareaAdditionalInfo']}
                    />
                    <Button
                        type="submit"
                        label="Generate script"
                        className={styles['submitButton']}
                        isDisabled={values.topic.trim().length === 0}
                    />
                </VStack>
            </form>
        </FormProvider>
    );
};

export { GenerateScriptForm };