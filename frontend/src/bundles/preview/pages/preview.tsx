import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Header,
    Loader,
    VideoPlayer,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { getUrl } from '../store/actions.js';
import styles from './styles.module.css';

type Properties = {
    jwt: string;
};

const Preview: React.FC<Properties> = ({ jwt }) => {
    const dispatch = useAppDispatch();
    const [url, setUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUrl = async (): Promise<void> => {
            try {
                const result = await dispatch(getUrl(jwt)).unwrap();

                setUrl(result);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrl().catch((error) => {
            throw new Error(error);
        });
    }, [dispatch, jwt]);

    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    if (isLoading) {
        return (
            <Box className={styles['loader-box']}>
                <Loader />
            </Box>
        );
    }

    return (
        <Box>
            <Header
                right={
                    <Button
                        label="Create a video"
                        w={'20vh'}
                        onClick={handleClick}
                    />
                }
            />
            <Box className={styles['back-box']}>
                <VideoPlayer
                    videoSource={url}
                    className={styles['video-player'] ?? ''}
                    playerWidth="100%"
                    playerHeight="100%"
                />
            </Box>
        </Box>
    );
};

export { Preview };
