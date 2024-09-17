import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as LibraryTextarea,
} from '@chakra-ui/react';
import {
    type FieldInputProps,
    type FormikValues as FormValues,
    Field,
} from 'formik';

import { useFormField } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FormValues> = {
    label: string;
    name: FieldInputProps<T>['name'];
    required?: boolean;
    placeholder?: string;
    className?: string | undefined;
};

const Textarea = <T extends FormValues>({
    label,
    name,
    required = false,
    placeholder = '',
    className,
}: Properties<T>): JSX.Element => {
    const { field, error, isValid } = useFormField({ name });

    return (
        <FormControl isInvalid={!isValid} isRequired={required}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Field
                {...field}
                id={name}
                placeholder={placeholder}
                error={error}
                resize="none"
                className={className}
                as={LibraryTextarea}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Textarea };
