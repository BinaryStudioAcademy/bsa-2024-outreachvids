import {
    Box,
    Button,
    FormProvider,
    Heading,
    Input,
    Link,
    PasswordInput,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

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

    const { handleSubmit } = form;

    return (
        <FormProvider value={form}>
            <Box bg="brand.200" w={64} p={6} rounded="md">
                <Heading as="h1">Create an account</Heading>
                <Text fontSize='sm'>Already registerd?
                    <Link to={AppRoute.SIGN_IN}>Log In</Link>
                </Text>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="Enter your full name"
                            name="name"
                        />
                        <Input
                            type="text"
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                        />
                        <PasswordInput
                            label="Password"
                            placeHolder="Enter your password"
                            name="password"
                        />
                        <PasswordInput
                            label="Repeat password"
                            placeHolder="Repeat your password"
                            name="confirmPassword"
                        />
                        <Button type="submit" label="Sign up" />
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignUpForm };
