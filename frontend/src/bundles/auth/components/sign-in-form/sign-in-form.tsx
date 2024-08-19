import {
    FormError,
    FormHeader,
    PasswordInput,
} from '~/bundles/auth/components/common/components.js';
import {
    Box,
    Button,
    FormProvider,
    Input,
    Link,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    AppRoute,
    DataStatus,
    UserValidationMessage,
} from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useAppSelector,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { dataStatus, errorMessage } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
        errorMessage: auth.errorMessage,
    }));
    const form = useAppForm<UserSignInRequestDto>({
        initialValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
        onSubmit,
    });

    const { handleSubmit, errors, values } = form;

    const isEmpty = useMemo(
        () => Object.values(values).some((value) => value.trim().length === 0),
        [values],
    );

    return (
        <FormProvider value={form}>
            <Box w="55%" color="white">
                <FormHeader
                    headerText="Sign In"
                    subheader={
                        <>
                            Don’t have an account?{' '}
                            <Link to={AppRoute.SIGN_UP} variant="secondary">
                                Go to registration
                            </Link>
                        </>
                    }
                />
                <form onSubmit={handleSubmit}>
                    <VStack spacing="1.2rem" align="flex-start">
                        <Input
                            type="text"
                            label="Email"
                            placeholder="user@gmail.com"
                            name="email"
                        />
                        <PasswordInput hasError={Boolean(errors.password)} />
                        <FormError
                            isVisible={dataStatus === DataStatus.REJECTED}
                            message={
                                errorMessage ||
                                UserValidationMessage.INVALID_DATA
                            }
                        />
                        <Button
                            type="submit"
                            label="Sign in"
                            size="lg"
                            sx={{ mt: '1rem' }}
                            isDisabled={isEmpty}
                        />
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignInForm };
