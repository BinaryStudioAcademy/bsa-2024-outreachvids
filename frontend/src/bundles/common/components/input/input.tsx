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
    label: string;
    name: FieldInputProps<T>['name'];
    type?: 'text' | 'email' | 'number' | 'password';
    required?: boolean;
    placeholder?: string;
    icon?: 'right' | 'none';
};

const Input = <T extends FormValues>({
    label,
    name,
    type = 'text',
    required = false,
    placeholder = '',
    icon = 'none',
}: Properties<T>): JSX.Element => {
    const [field, meta] = useFormField({ name });

    const { error, touched } = meta;
    const hasError = Boolean(error) && touched;

    return (
        <FormControl isInvalid={hasError} isRequired={required}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Field
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                error={error}
                style={{ paddingRight: icon === 'right' ? '40px' : 0 }}
                as={LibraryInput}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Input };
