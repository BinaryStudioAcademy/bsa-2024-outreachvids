import { LibraryInput } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { DEFAULT_VIDEO_NAME } from '~/bundles/studio/constants/constants.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import styles from './styles.module.css';

const VideoNameInput: React.FC = () => {
    const { videoName, isDraftSaved } = useAppSelector(({ studio }) => studio);
    const [inputValue, setInputValue] = useState(
        isDraftSaved ? videoName : `${videoName}*`,
    );

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
        setInputValue(isDraftSaved ? videoName : `${videoName}*`);
    }, [isDraftSaved, videoName]);

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
