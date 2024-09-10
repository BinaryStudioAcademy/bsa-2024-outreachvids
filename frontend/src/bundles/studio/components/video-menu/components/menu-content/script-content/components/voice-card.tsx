import {
    Card,
    CardBody,
    HStack,
    Text,
} from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/player-controls/components/control/control.js';

type Properties = {
    voiceName: string;
};

const VoiceCard: React.FC<Properties> = ({ voiceName }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = useCallback((): void => {
        setIsPlaying((previous) => !previous);
    }, []);
    return (
        <Card>
            <CardBody>
                <HStack>
                    <Control
                        label={isPlaying ? 'Pause' : 'Play voice'}
                        size={IconSize.SMALL}
                        icon={isPlaying ? IconName.PAUSE : IconName.PLAY}
                        onClick={handleClick}
                    />
                    <Text variant="body1" color={'text.default'}>
                        {voiceName}
                    </Text>
                </HStack>
            </CardBody>
        </Card>
    );
};

export { VoiceCard };
