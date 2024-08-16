import { Button, Heading } from '~/bundles/common/components/components.js';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
    <>
        <Heading as="h1">Sign In</Heading>

        <form>
            <Button label="Sign in" />
        </form>
    </>
);

export { SignInForm };
