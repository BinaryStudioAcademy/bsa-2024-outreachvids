import { Button } from '@chakra-ui/react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <Flex className={styles['previewContainer']}>
            <Flex
                className={styles['previewBox']}
                style={{
                    width:
                        view === VideoPreviewValues.PORTRAIT
                            ? '250px'
                            : '720px',
                }}
            >
                <Flex className={styles['previewInnerBox']}>
                    <Icon
                        as={FontAwesomeIcon}
                        icon={faPlay}
                        className={styles['previewIcon']}
                    />
                    <Text className={styles['previewText']}>
                        {view === VideoPreviewValues.PORTRAIT
                            ? VideoSizeLabel.PORTRAIT
                            : VideoSizeLabel.LANDSCAPE}
                    </Text>
                </Flex>
            </Flex>

            <Flex className={styles['previewButtonContainer']}>
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
