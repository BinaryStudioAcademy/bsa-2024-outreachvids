import { EMPTY_LENGTH } from '~/bundles/ai-avatars/constants/constants.js';
import { avatarsMapper } from '~/bundles/ai-avatars/helpers/helpers.js';
import { useFilterAvatarStyle } from '~/bundles/ai-avatars/hooks/use-filter-avatar-style.hook.js';
import {
    Box,
    Heading,
    Loader,
    Overlay,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { AvatarsSection } from '../components.js';

const Avatars: React.FC = () => {
    const dispatch = useAppDispatch();
    const { avatars, dataStatus } = useAppSelector(({ studio }) => studio);

    const form = useAppForm<{ style: string }>({
        initialValues: { style: '' },
    });
    const {
        values: { style },
    } = form;

    const styledAvatars = useFilterAvatarStyle(style);
    const mappedAvatars = useMemo(() => avatarsMapper(avatars), [avatars]);
    const favoriteAvatars = useMemo(
        () => mappedAvatars.filter(({ isLiked }) => isLiked),
        [mappedAvatars],
    );

    useEffect(() => {
        if (avatars.length === EMPTY_LENGTH) {
            void dispatch(studioActions.loadAvatars());
        }
    }, [dispatch, avatars.length]);

    return (
        <Box bg="background.900" pr="25px">
            <Box
                bg="background.50"
                borderTopRadius="xl"
                p="25px"
                minH="calc(100vh - 75px)"
            >
                <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                    <Loader />
                </Overlay>
                <Heading color="typography.900" variant="H3">
                    AI Avatars
                </Heading>
                <AvatarsSection
                    avatars={favoriteAvatars}
                    subtitle="My Avatars"
                />
                <AvatarsSection
                    avatars={styledAvatars}
                    subtitle="OutreachVids Library"
                    form={form}
                />
            </Box>
        </Box>
    );
};

export { Avatars };
