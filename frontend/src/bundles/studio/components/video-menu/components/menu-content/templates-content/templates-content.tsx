import {
    Box,
    Loader,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
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

import { TemplateCard } from './components/components.js';

const TemplatesContent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { templates, dataStatus } = useAppSelector(({ studio }) => studio);

    useEffect(() => {
        if (templates.public.length === EMPTY_VALUE) {
            void dispatch(studioActions.loadPublicTemplates());
        }
    }, [dispatch, templates]);

    return (
        <Tabs>
            <TabList>
                <Tab>Templates</Tab>
                <Tab>My templates</Tab>
            </TabList>

            {dataStatus === DataStatus.PENDING ? (
                <Box mt="100px">
                    <Loader />
                </Box>
            ) : (
                <TabPanels>
                    <TabPanel>
                        <SimpleGrid columns={2} spacingX="13px" spacingY="10px">
                            {templates.public.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    imageSource={template.previewUrl}
                                />
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <Text color="typography.600" variant="body1">
                            You have no templates yet.
                        </Text>
                    </TabPanel>
                </TabPanels>
            )}
        </Tabs>
    );
};

export { TemplatesContent };
