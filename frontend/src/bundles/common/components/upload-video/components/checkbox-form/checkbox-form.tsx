import { type ChangeEvent } from 'react';

import {
    Button,
    Checkbox,
    Flex,
    Stack,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import styles from '../../upload-video.module.css';

type Properties = {
    onVideoRemove: () => void;
};

const CheckboxForm: React.FC<Properties> = ({ onVideoRemove }) => {
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });

    const allChecked = Object.values(checkboxes).every(Boolean);

    const handleChange = useCallback(
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
                    onChange={handleChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox2"
                    onChange={handleChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox3"
                    onChange={handleChange}
                >
                    <Text color="gray">Checkbox</Text>
                </Checkbox>
                <Checkbox
                    size="sm"
                    color="background.600"
                    name="checkbox4"
                    onChange={handleChange}
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
                    onClick={onVideoRemove}
                    className={styles['Button']}
                />
                <Button
                    label="My footage look good"
                    isDisabled={!allChecked}
                    className={styles['Button']}
                />
            </Flex>
        </>
    );
};

export { CheckboxForm };
