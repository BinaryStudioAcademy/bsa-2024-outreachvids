import {
    type SystemStyleObject,
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
    sx?: SystemStyleObject;
    value?: string | number | undefined;
};

const Input = <T extends FormValues>({
    label,
    name,
    type = 'text',
    required = false,
    placeholder = '',
    icon = 'none',
    sx = {},
    value = undefined,
}: Properties<T>): JSX.Element => {
    const [field, meta] = useFormField({ name });

    const { error, touched } = meta;
    const hasError = Boolean(error) && touched;

    return (
        <FormControl isInvalid={hasError} isRequired={required}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Field
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                error={error}
                value={value}
                style={{ paddingRight: icon === 'right' ? '40px' : 0 }}
                as={LibraryInput}
                sx={sx}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Input };
