import {
    Card,
    CardBody,
    HStack,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/player-controls/components/control/control.js';
import { type Voice } from '~/bundles/studio/types/types.js';

type Properties = {
    voice: Voice;
    isChecked: boolean;
    onClick: (voice: Voice) => void;
};

const VoiceCard: React.FC<Properties> = ({ voice, isChecked, onClick }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = useCallback((event: React.MouseEvent): void => {
        setIsPlaying((previous) => !previous);
        event.stopPropagation();
    }, []);
    const handleCardClick = useCallback((): void => {
        onClick(voice);
    }, [onClick, voice]);
    return (
        <Card
            variant={isChecked ? 'outline' : 'elevated'}
            cursor="pointer"
            onClick={handleCardClick}
        >
            <CardBody>
                <HStack>
                    <Control
                        label={isPlaying ? 'Pause' : 'Play voice'}
                        size={IconSize.SMALL}
                        icon={isPlaying ? IconName.PAUSE : IconName.PLAY}
                        onClick={handlePlayClick}
                    />
                    <Text variant="body1" color={'text.default'}>
                        {voice.name}
                    </Text>
                </HStack>
            </CardBody>
        </Card>
    );
};

export { VoiceCard };
