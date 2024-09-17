import {
    type ChakraProps as ChakraProperties,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as LibraryInput,
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
    type?: 'text' | 'email' | 'number' | 'password';
    required?: boolean;
    placeholder?: string;
    icon?: 'right' | 'none';
    value?: string | number | undefined;
} & ChakraProperties;

const Input = <T extends FormValues>({
    label,
    name,
    type = 'text',
    required = false,
    placeholder = '',
    icon = 'none',
    value = undefined,
    ...ChakraProperties
}: Properties<T>): JSX.Element => {
    const { field, error, isValid } = useFormField({ name });

    return (
        <FormControl isInvalid={!isValid} isRequired={required}>
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
                {...ChakraProperties}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Input };
