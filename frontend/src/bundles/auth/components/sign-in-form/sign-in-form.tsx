import {
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
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppForm, useMemo } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const form = useAppForm<UserSignInRequestDto>({
        initialValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
        onSubmit,
    });

    const { handleSubmit, errors, values } = form;

    const isEmpty = useMemo(
        () =>
            Object.values(values).some(
                (value) => value.trim().length === EMPTY_VALUE,
            ),
        [values],
    );

    return (
        <FormProvider value={form}>
            <Box width="55%" color="white">
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
                    <VStack spacing="20px" align="flex-start">
                        <Input
                            type="text"
                            label="Email"
                            placeholder="user@gmail.com"
                            name="email"
                            isRequired
                        />
                        <PasswordInput
                            label="Password"
                            name="password"
                            hasError={Boolean(errors.password)}
                            required
                        />
                        <Button
                            type="submit"
                            label="Sign in"
                            size="lg"
                            margin-top="16px"
                            isDisabled={isEmpty}
                        />
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignInForm };
