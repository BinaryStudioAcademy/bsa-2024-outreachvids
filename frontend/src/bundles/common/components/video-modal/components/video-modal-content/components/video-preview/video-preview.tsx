import { Button } from '@chakra-ui/react';

import {
    Flex,
    Icon,
    Link,
    Text,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { type VideoPreview as VideoPreviewT } from '~/bundles/common/types/types.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import {
    VideoPreview as VideoPreviewValues,
    VideoSizeLabel,
} from './libs/enums/enums.js';
import styles from './styles.module.css';

const VideoPreview: React.FC = () => {
    const dispatch = useAppDispatch();
    const [view, setView] = useState<VideoPreviewT>(
        VideoPreviewValues.PORTRAIT,
    );

    const handleSetPortraitView = useCallback((): void => {
        setView(VideoPreviewValues.PORTRAIT);
    }, []);

    const handleSetLandscapeView = useCallback((): void => {
        setView(VideoPreviewValues.LANDSCAPE);
    }, []);

    const handleClick = useCallback((): void => {
        dispatch(studioActions.setVideoSize(view));
    }, [dispatch, view]);

    return (
        <Flex className={styles['preview-container']}>
            <Flex
                width={view === VideoPreviewValues.PORTRAIT ? '250px' : '720px'}
                height="444px"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                mb={4}
            >
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    color="gray.400"
                >
                    <Icon as={IconName.PLAY} padding="5px" height="16px" />
                    <Text color="gray.400">
                        {view === VideoPreviewValues.PORTRAIT
                            ? VideoSizeLabel.PORTRAIT
                            : VideoSizeLabel.LANDSCAPE}
                    </Text>
                </Flex>
            </Flex>

            <Flex className={styles['preview-button-container']}>
                <Link to={AppRoute.STUDIO}>
                    <Button
                        backgroundColor="brand.secondary.300"
                        color="white"
                        onMouseEnter={handleSetLandscapeView}
                        onClick={handleClick}
                        _hover={{ bg: 'brand.secondary.600' }}
                    >
                        Use landscape
                    </Button>
                </Link>
                <Link to={AppRoute.STUDIO}>
                    <Button
                        backgroundColor="brand.secondary.300"
                        color="white"
                        onClick={handleClick}
                        _hover={{ bg: 'brand.secondary.600' }}
                        onMouseEnter={handleSetPortraitView}
                    >
                        Use portrait
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};

export { VideoPreview };
