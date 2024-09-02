import {
    type SystemStyleObject,
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
    sx?: SystemStyleObject;
};

const Textarea = <T extends FormValues>({
    label,
    name,
    required = false,
    placeholder = '',
    sx,
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
                sx={sx}
                as={LibraryTextarea}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Textarea };
