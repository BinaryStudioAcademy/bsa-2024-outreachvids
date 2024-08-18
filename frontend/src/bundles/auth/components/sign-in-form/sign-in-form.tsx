import { PasswordInput } from '~/bundles/auth/components/common/components.js';
import {
    Box,
    Button,
    FormProvider,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';
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

    const { handleSubmit, errors } = form;

    return (
        <FormProvider value={form}>
            <Box w="55%" color="white">
                <Heading as="h1" color="white" mb="0.4rem">
                    Sign In
                </Heading>
                <Text mb="1.5rem">
                    Don’t have an account?{' '}
                    <Link to={AppRoute.SIGN_UP} variant="secondary">
                        Go to registration
                    </Link>
                </Text>
                <form onSubmit={handleSubmit}>
                    <VStack spacing="1.2rem" align="flex-start">
                        <Input
                            type="text"
                            label="Email"
                            placeholder="user@gmail.com"
                            name="email"
                        />
                        <PasswordInput hasError={Boolean(errors.password)} />
                        <Button type="submit" label="Sign in" size="lg" />
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignInForm };
