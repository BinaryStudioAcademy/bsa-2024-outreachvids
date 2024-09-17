import {
    Icon,
    IconButton,
    Loader,
    Text,
    VStack,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { NEW_SCRIPT_TEXT } from '~/bundles/studio/constants/constants.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Script, VoicesModal } from './components/components.js';

const ScriptContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { scripts, voices, dataStatus } = useAppSelector(
        ({ studio }) => studio,
    );

    useEffect(() => {
        if (voices.length === 0) {
            void dispatch(studioActions.loadVoices());
        }
    }, [dispatch, voices.length]);
    const [changeVoiceScriptId, setChangeVoiceScriptId] = useState<
        string | null
    >(null);

    const handleAddScript = useCallback((): void => {
        void dispatch(studioActions.addScript(NEW_SCRIPT_TEXT));
    }, [dispatch]);

    const handleChangeVoiceClick = useCallback((scriptId: string): void => {
        setChangeVoiceScriptId(scriptId);
    }, []);

    const handleCloseVoicesModal = useCallback((): void => {
        setChangeVoiceScriptId(null);
    }, []);

    return (
        <>
            <VStack w="full" spacing="20px" p="20px 0">
                {dataStatus === DataStatus.PENDING ? (
                    <Loader />
                ) : (
                    <>
                        {scripts.length === 0 ? (
                            <Text
                                variant="body1"
                                width="60%"
                                textAlign="center"
                            >
                                To add a script press a button below.
                            </Text>
                        ) : (
                            scripts.map(({ id, ...script }) => (
                                <Script
                                    key={id}
                                    id={id}
                                    {...script}
                                    handleChangeVoice={handleChangeVoiceClick}
                                />
                            ))
                        )}
                        <IconButton
                            icon={<Icon as={IconName.ADD} />}
                            aria-label="Add script"
                            borderRadius="100%"
                            onClick={handleAddScript}
                        />
                    </>
                )}
            </VStack>
            <VoicesModal
                isOpen={Boolean(changeVoiceScriptId)}
                onClose={handleCloseVoicesModal}
                scriptId={changeVoiceScriptId}
            />
        </>
    );
};

export { ScriptContent };
