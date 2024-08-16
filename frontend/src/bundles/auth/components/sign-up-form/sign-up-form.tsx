import {
    Box,
    Button,
    FormProvider,
    Heading,
    Input,
    VStack,
} from '~/bundles/common/components/components.js';
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
                <Heading as="h1">Sign Up</Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <Input
                            type="text"
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                        />
                        <Button type="submit" label="Sign up" />
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignUpForm };
