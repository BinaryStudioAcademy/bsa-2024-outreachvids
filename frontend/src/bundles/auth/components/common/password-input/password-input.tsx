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
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handlePasswordIconClick = useCallback((): void => {
        setIsPasswordVisible(
            (previousIsPasswordVisible) => !previousIsPasswordVisible,
        );
    }, []);

    return (
        <InputGroup size="md">
            <Input
                type={isPasswordVisible ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                name="password"
                icon="right"
            />
            <InputRightElement top="unset" bottom={hasError ? '24px' : 0}>
                <IconButton
                    aria-label={
                        isPasswordVisible ? 'Hide password' : 'Show password'
                    }
                    icon={isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
                    onClick={handlePasswordIconClick}
                    variant="ghostIcon"
                />
            </InputRightElement>
        </InputGroup>
    );
};

export { PasswordInput };
