import {
    Heading,
    SimpleGrid,
    VStack,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Voice } from '~/bundles/studio/types/types.js';

import styles from './styles.module.css';
import { VoiceCard } from './voice-card.js';

type Properties = {
    scriptId: string;
    onModalClose: () => void;
};
const VoicesModalContent: React.FC<Properties> = ({
    scriptId,
    onModalClose,
}) => {
    const dispatch = useAppDispatch();
    const script = useAppSelector(({ studio }) =>
        studio.scripts.find((s) => s.id === scriptId),
    );
    const voices = useAppSelector(({ studio }) => studio.voices.items);
    const handleCardClick = useCallback(
        (voice: Voice): void => {
            dispatch(studioActions.editScript({ id: scriptId, voice }));
            onModalClose();
        },
        [dispatch, scriptId, onModalClose],
    );
    return (
        <VStack>
            <Heading
                className={styles['modal-header']}
                variant="H3"
                color="typography.900"
            >
                AI Voice
            </Heading>
            <SimpleGrid
                className={styles['modal-content']}
                w="full"
                columns={[2, null, 3]}
            >
                {voices.map((card) => (
                    <VoiceCard
                        voice={card}
                        key={card.shortName}
                        isChecked={script?.voice?.shortName === card.shortName}
                        onClick={handleCardClick}
                    />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export { VoicesModalContent };