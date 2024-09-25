import { Box, Header, Loader, VideoPlayer } from '~/bundles/common/components/components.js';
import { useAppDispatch, useEffect, useState } from '~/bundles/common/hooks/hooks.js';

import { getUrl } from '../store/actions.js';
import styles from './styles.module.css';

type Properties = {
    jwt: string;
};

const Preview: React.FC<Properties> = ({ jwt }) => {
    const dispatch = useAppDispatch();
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUrl = async (): Promise<void> => {
            try {
                const result = await dispatch(getUrl(jwt)).unwrap();

                setUrl(result);
            } finally {
                setLoading(false);
            }
        };

        fetchUrl().catch(error => {throw new Error(error); });
    }, [dispatch, jwt]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Box>
            <Header />
            <VideoPlayer
                videoSource={url}
                className={styles['video-player'] ?? ''}
                playerWidth="100%"
                playerHeight="100%"
            />
        </Box>
    );
};

export { Preview };