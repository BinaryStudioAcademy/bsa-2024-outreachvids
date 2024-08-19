import {
    FormControl,
    FormErrorMessage,
} from '~/bundles/common/components/components.js';

type Properties = {
    hasError: boolean;
    errorMessage: string;
};

const FormError: React.FC<Properties> = ({ hasError, errorMessage }) => {
    return (
        <FormControl isInvalid={hasError}>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export { FormError };
