import {
    Button,
    Flex,
    Heading,
    Text,
} from '~/bundles/common/components/components.js';

type Properties = {
    onCancel: () => void;
    onSubmit: () => void;
};

const UnsavedWarningContent: React.FC<Properties> = ({
    onCancel,
    onSubmit,
}) => {
    return (
        <>
            <Heading variant="H3" color="typography.900" mb="20px">
                Notice before you leave the page
            </Heading>

            <Text as="p" color="typography.600" mb="20px">
                If you leave now all your unsaved changes will be lost. Please
                save draft or submit to render before leaving.
            </Text>

            <Flex gap="10px" justify="end">
                <Button label="Cancel" w="auto" onClick={onCancel} />
                <Button
                    label="Leave Anyway"
                    w="auto"
                    variant="secondaryOutlined"
                    onClick={onSubmit}
                />
            </Flex>
        </>
    );
};

export { UnsavedWarningContent };
