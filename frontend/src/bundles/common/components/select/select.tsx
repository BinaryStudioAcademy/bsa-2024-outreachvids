import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select as LibrarySelect,
} from '@chakra-ui/react';
import {
    type FieldInputProps,
    type FormikValues as FormValues,
    Field,
} from 'formik';

import { useFormField } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FormValues> = {
    label?: string;
    name: FieldInputProps<T>['name'];
    children: React.ReactNode;
    isRequired?: boolean;
    placeholder?: string;
};

const Select: React.FC<Properties<FormValues>> = ({
    label,
    name,
    children,
    isRequired = false,
    placeholder = '',
}) => {
    const { field, error, isValid } = useFormField({ name });

    return (
        <FormControl isInvalid={!isValid} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Field
                {...field}
                id={name}
                placeholder={placeholder}
                error={error}
                as={LibrarySelect}
            >
                {children}
            </Field>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export { Select };
