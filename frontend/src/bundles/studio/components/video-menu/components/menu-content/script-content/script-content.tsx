import {
    Icon,
    IconButton,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Script } from './components/script.js';
import { NEW_SCRIPT_TEXT } from './constants/constants.js';

const ScriptContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const scripts = useAppSelector(({ studio }) => studio.scripts);

    const handleAddScript = useCallback((): void => {
        void dispatch(studioActions.addScript(NEW_SCRIPT_TEXT));
    }, [dispatch]);

    return (
        <VStack w="full" spacing="20px" p="20px 0">
            {scripts.length === 0 ? (
                <Text variant="body1" width="60%" textAlign="center">
                    To add a script press a button below.
                </Text>
            ) : (
                scripts.map(({ text, id }) => (
                    <Script key={id} id={id} text={text} />
                ))
            )}
            <IconButton
                icon={<Icon as={IconName.ADD} />}
                aria-label="Add script"
                borderRadius="100%"
                onClick={handleAddScript}
            />
        </VStack>
    );
};

export { ScriptContent };
