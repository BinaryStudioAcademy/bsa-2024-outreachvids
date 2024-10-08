import {
    Box,
    Fragment,
    Loader,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { AvatarCard } from './components/components.js';

const AvatarsContent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { avatars, dataStatus } = useAppSelector(({ studio }) => ({
        avatars: studio.avatars,
        dataStatus: studio.dataStatus,
    }));

    useEffect(() => {
        if (avatars.length === EMPTY_VALUE) {
            void dispatch(studioActions.loadAvatars());
        }
    }, [dispatch, avatars]);

    return (
        <>
            <Text variant="body1" mb="12px">
                Public avatar
            </Text>
            {dataStatus === DataStatus.PENDING ? (
                <Box mt="100px">
                    <Loader />
                </Box>
            ) : (
                <SimpleGrid columns={3} spacingX="13px" spacingY="10px">
                    {avatars.map(({ id, name, styles }) => (
                        <Fragment key={id}>
                            {styles.map(({ style, imgUrl }) => (
                                <AvatarCard
                                    key={`${id}-${style}`}
                                    id={id}
                                    name={name}
                                    style={style}
                                    preview={imgUrl}
                                />
                            ))}
                        </Fragment>
                    ))}
                </SimpleGrid>
            )}
        </>
    );
};

export { AvatarsContent };
