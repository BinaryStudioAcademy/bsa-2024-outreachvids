import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as LibraryInput,
} from '@chakra-ui/react';
import { type FieldInputProps, type FormikValues as FormValues } from 'formik';
import { Field } from 'formik';

import { useFormField } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FormValues> = {
    type?: 'text' | 'email' | 'number' | 'password';
    label: string;
    name: FieldInputProps<T>['name'];
    placeholder?: string;
};

const Input = <T extends FormValues>({
    type = 'text',
    label,
    name,
    placeholder = '',
}: Properties<T>): JSX.Element => {
    const [field, meta] = useFormField({ name });

    const { error, touched } = meta;
    const hasError = Boolean(error) && touched;

    return (
        <FormControl isInvalid={hasError}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Field
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                error={error}
                as={LibraryInput}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Input };
