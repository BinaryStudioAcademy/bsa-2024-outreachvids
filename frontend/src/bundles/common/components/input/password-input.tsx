import { Button } from '@chakra-ui/react';

import {
    Input,
    InputGroup,
    InputRightElement,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    name: string;
    label: string;
    placeHolder: string;
};

const PasswordInput: React.FC<Properties> = ({ name, placeHolder, label }) => {
    const [show, setShow] = useState<boolean>(false);

    const handlePasswordIconClick = useCallback((): void => {
        setShow((previousShow) => !previousShow);
    }, []);

    return (
        <InputGroup size="md">
            <Input
                type={show ? 'text' : 'password'}
                name={name}
                label={label}
                placeholder={placeHolder}
            />
            <InputRightElement top="unset" bottom={0}>
                <Button onClick={handlePasswordIconClick} >
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export { PasswordInput };
