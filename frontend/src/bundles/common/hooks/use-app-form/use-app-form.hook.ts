import {
    type FormikConfig as FormConfig,
    type FormikValues as FormValues,
} from 'formik';
import { useFormik as useForm } from 'formik';
import { toFormikValidationSchema as validationSchemaResolver } from 'zod-formik-adapter';

import {
    type ValidationSchema,
    type ValueOf,
} from '~/bundles/common/types/types.js';

const ValidationMode = {
    ON_BLUR: 'onBlur',
    ON_CHANGE: 'onChange',
    ON_SUBMIT: 'onSubmit',
    ALL: 'all',
} as const;

type Parameters<T extends FormValues = FormValues> = {
    initialValues: T;
    mode?: ValueOf<typeof ValidationMode>;
    validationSchema?: ValidationSchema;
    onSubmit: FormConfig<T>['onSubmit'];
};

type ReturnValue<T extends FormValues = FormValues> = ReturnType<
    typeof useForm<T>
>;

const useAppForm = <T extends FormValues = FormValues>({
    initialValues,
    mode = 'onSubmit',
    validationSchema,
    onSubmit,
}: Parameters<T>): ReturnValue<T> => {
    const validateOnBlur =
        mode === ValidationMode.ALL ? true : mode === ValidationMode.ON_BLUR;
    const validateOnChange =
        mode === ValidationMode.ALL ? true : mode === ValidationMode.ON_CHANGE;

    let config: FormConfig<T> = {
        initialValues,
        validateOnBlur,
        validateOnChange,
        onSubmit,
    };

    if (validationSchema) {
        config = {
            ...config,
            validationSchema: validationSchemaResolver(validationSchema),
        };
    }

    return useForm<T>(config);
};

export { useAppForm };
