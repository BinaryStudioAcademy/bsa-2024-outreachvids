import { UserValidationMessage } from 'shared/src/bundles/users/users.js';

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
import { FormError } from '~/bundles/common/components/form-error/form-error.js';
import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppForm, useAppSelector } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const form = useAppForm<UserSignUpRequestDto>({
        initialValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
        onSubmit,
        mode: 'onChange',
    });

    const { handleSubmit, isValid } = form;

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
                            placeholder="Name"
                            name="name"
                        />
                        <Input
                            type="email"
                            label="Email"
                            placeholder="user@gmail.com"
                            name="email"
                        />
                        <PasswordInput
                            label="Password"
                            placeHolder="••••••••"
                            name="password"
                        />
                        <PasswordInput
                            label="Repeat password"
                            placeHolder="••••••••"
                            name="confirmPassword"
                        />
                        <FormError
                            hasError={dataStatus === DataStatus.REJECTED}
                            errorMessage={ UserValidationMessage.USER_IS_NOT_AVAILABLE }
                        />
                        <Button type="submit" label="Sign up" isDisabled={!isValid}/>
                    </VStack>
                </form>
            </Box>
        </FormProvider>
    );
};

export { SignUpForm };
