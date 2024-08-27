import {
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconMap } from '~/bundles/common/icons/icons.js';

type Properties = {
    label: string;
    name: string;
    hasError: boolean;
};

const PasswordInput: React.FC<Properties> = ({ label, name, hasError }) => {
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
                label={label}
                placeholder="••••••••"
                name={name}
                icon="right"
            />
            <InputRightElement top="unset" bottom={hasError ? '25px' : 0}>
                <IconButton
                    aria-label={
                        isPasswordVisible ? 'Hide password' : 'Show password'
                    }
                    as={Icon}
                    icon={
                        isPasswordVisible ? (
                            <Icon as={IconMap.VIEW} />
                        ) : (
                            <Icon as={IconMap.VIEW_OFF} />
                        )
                    }
                    onClick={handlePasswordIconClick}
                    variant="ghostIcon"
                />
            </InputRightElement>
        </InputGroup>
    );
};

export { PasswordInput };
