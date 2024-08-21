import {
    FormControl,
    FormErrorMessage,
} from '~/bundles/common/components/components.js';

type Properties = {
    isVisible: boolean;
    message: string;
};

const FormError: React.FC<Properties> = ({ isVisible, message }) => {
    return (
        <FormControl isInvalid={isVisible}>
            <FormErrorMessage>{message}</FormErrorMessage>
        </FormControl>
    );
};

export { FormError };
