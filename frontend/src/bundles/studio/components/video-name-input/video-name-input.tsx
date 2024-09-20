import { LibraryInput } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { DEFAULT_VIDEO_NAME } from '~/bundles/studio/constants/constants.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import styles from './styles.module.css';

const VideoNameInput: React.FC = () => {
    const { videoName, isDraftSaved } = useAppSelector(({ studio }) => studio);

    const videoNameWithStatus = useMemo((): string => {
        return isDraftSaved ? videoName : `${videoName}*`;
    }, [videoName, isDraftSaved]);

    const [inputValue, setInputValue] = useState(videoNameWithStatus);

    const dispatch = useAppDispatch();

    const handleEditVideoName = useCallback(
        (event: React.FocusEvent<HTMLInputElement>): void => {
            const newVideoName = event.target.value;
            if (!newVideoName) {
                void dispatch(studioActions.setVideoName(DEFAULT_VIDEO_NAME));
                return;
            }

            setInputValue(isDraftSaved ? newVideoName : `${newVideoName}*`);

            if (newVideoName === videoName) {
                return;
            }

            void dispatch(studioActions.setVideoName(newVideoName));
        },
        [dispatch, isDraftSaved, videoName],
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setInputValue(event.target.value);
        },
        [],
    );

    useEffect(() => {
        setInputValue(videoNameWithStatus);
    }, [videoNameWithStatus]);

    const handleInputFocus = useCallback((): void => {
        setInputValue(videoName);
    }, [videoName]);

    return (
        <LibraryInput
            value={inputValue}
            className={styles['video-name']}
            variant="unstyled"
            placeholder={DEFAULT_VIDEO_NAME}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            onBlur={handleEditVideoName}
        />
    );
};

export { VideoNameInput };
