import { type FieldInputProps, useField } from 'formik';

type Parameters = {
    name: string;
};

type ReturnValue<T> = {
    field: FieldInputProps<T>;
    error: string | undefined;
    isValid: boolean;
};

const useFormField = <T>({ name }: Parameters): ReturnValue<T> => {
    const [field, meta] = useField(name);

    const { error, touched } = meta;
    const isValid = !(Boolean(error) && touched);

    return { field, error, isValid };
};

export { useFormField };
