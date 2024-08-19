import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    ViewIcon,
    ViewOffIcon,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    hasError: boolean;
};

const PasswordInput: React.FC<Properties> = ({ hasError }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordIconClick = useCallback((): void => {
        setShowPassword((previousShowPassword) => !previousShowPassword);
    }, []);

    return (
        <InputGroup size="md">
            <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                name="password"
                icon="right"
            />
            <InputRightElement top="unset" bottom={hasError ? '1.5rem' : 0}>
                <IconButton
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    onClick={handlePasswordIconClick}
                    variant="ghostIcon"
                />
            </InputRightElement>
        </InputGroup>
    );
};

export { PasswordInput };
