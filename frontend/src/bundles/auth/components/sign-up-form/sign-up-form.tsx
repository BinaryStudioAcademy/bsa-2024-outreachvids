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
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { FormHeader, PasswordInput } from '../common/components.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const form = useAppForm<UserSignUpRequestDto>({
        initialValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
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
                    headerText="Create an account"
                    subheader={
                        <>
                            Already registered?{' '}
                            <Link to={AppRoute.SIGN_IN} variant="secondary">
                                Log In
                            </Link>
                        </>
                    }
                />
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="Name"
                            name="fullName"
                            isRequired
                        />
                        <Input
                            type="email"
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
                        <PasswordInput
                            label="Repeat password"
                            name="confirmPassword"
                            hasError={Boolean(errors.confirmPassword)}
                            required
                        />
                        <Button
                            type="submit"
                            label="Sign up"
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

export { SignUpForm };
