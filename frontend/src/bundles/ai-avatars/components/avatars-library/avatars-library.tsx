import {
    Box,
    Flex,
    FormProvider,
    Loader,
    Select,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { useFilterAvatarStyle } from '../../hooks/use-filter-avatar-style.hook.js';
import { AvatarCard } from '../components.js';

const AvatarsLibrary: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ studio }) => studio);
    const form = useAppForm<{ style: string }>({
        initialValues: { style: '' },
    });

    const {
        values: { style },
    } = form;

    const avatars = useFilterAvatarStyle(style);

    useEffect(() => {
        if (avatars.length === 0) {
            void dispatch(studioActions.loadAvatars());
        }
    }, [dispatch, avatars.length]);

    return (
        <>
            <Flex justify="space-between" align="center" mb="10px">
                <Text color="typography.900">OutreachVids Library</Text>
                <FormProvider value={form}>
                    <Box>
                        <Select name="style" placeholder="All styles">
                            <option value="business">Business</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                            <option value="youthful">Youthful</option>
                            <option value="graceful">Graceful</option>
                            <option value="technical">Technical</option>
                        </Select>
                    </Box>
                </FormProvider>
            </Flex>
            {dataStatus === DataStatus.PENDING ? (
                <Box>
                    <Loader />
                </Box>
            ) : (
                <SimpleGrid
                    minChildWidth="300px"
                    justifyItems="center"
                    spacing="40px"
                >
                    {avatars.map(({ id, imgUrl, name, style }) => (
                        <AvatarCard
                            key={`${id}-${style}`}
                            name={name}
                            tag={style}
                            image={imgUrl}
                        />
                    ))}
                </SimpleGrid>
            )}
        </>
    );
};

export { AvatarsLibrary };
