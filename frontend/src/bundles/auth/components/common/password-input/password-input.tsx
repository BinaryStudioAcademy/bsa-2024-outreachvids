import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    ViewIcon,
    ViewOffIcon,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

const PasswordInput: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordIconClick = useCallback((): void => {
        setShowPassword((previousShowPassword) => !previousShowPassword);
    }, []);

    return (
        <InputGroup>
            <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                name="password"
            />
            <InputRightElement top="unset" bottom={0}>
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
