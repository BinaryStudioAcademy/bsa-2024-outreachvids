import { type ChangeEvent } from 'react';

import {
    Button,
    Checkbox,
    Flex,
    Stack,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    handleRemoveVideo: () => void;
};

const CheckboxForm: React.FC<Properties> = ({ handleRemoveVideo }) => {
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });

    const allChecked = Object.values(checkboxes).every(Boolean);

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const { name, checked } = event.target;
            setCheckboxes({
                ...checkboxes,
                [name]: checked,
            });
        },
        [checkboxes],
    );

    return (
        <>
            {/* TODO : UPDATE TEXTS ON CHECKBOXES*/}
            <Text width="560px" color="gray">
                For an optimal, more realistic avatar, please confirm your video
                meet these requirements:
            </Text>
            <Stack
                spacing={5}
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                width="565px"
            >
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox1"
                    onChange={onChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox2"
                    onChange={onChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox3"
                    onChange={onChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox4"
                    onChange={onChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
            </Stack>

            <Flex
                width="490px"
                alignItems="center"
                justifyContent="space-between"
            >
                <Button
                    label="Upload again"
                    variant="outlined"
                    onClick={handleRemoveVideo}
                    sx={{
                        width: '222px',
                    }}
                ></Button>
                <Button
                    label="My footage look good"
                    isDisabled={!allChecked}
                    sx={{ width: '222px' }}
                ></Button>
            </Flex>
        </>
    );
};

export { CheckboxForm };
