import {
    Fragment,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { AvatarCard } from './components/components.js';

const AvatarsContent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { avatars } = useAppSelector(({ studio }) => ({
        avatars: studio.avatars.items,
    }));

    useEffect(() => {
        void dispatch(studioActions.loadAvatars());
    }, [dispatch]);

    return (
        <>
            <Text variant="body1" mb="12px">
                Public avatar
            </Text>
            <SimpleGrid columns={3} spacingX="13px" spacingY="10px">
                {avatars.map(({ id, styles }) => (
                    <Fragment key={id}>
                        {styles.map(({ style, imgUrl }) => (
                            <AvatarCard
                                key={`${id}-${style}`}
                                preview={imgUrl}
                            />
                        ))}
                    </Fragment>
                ))}
            </SimpleGrid>
        </>
    );
};

export { AvatarsContent };
