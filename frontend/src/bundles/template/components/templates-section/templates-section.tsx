import {
    Box,
    Button,
    Flex,
    FormProvider,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Loader,
    Overlay,
    Select,
    SimpleGrid,
} from '~/bundles/common/components/components.js';
import { EMPTY_VALUE } from '~/bundles/common/constants/constants.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { TemplateCard } from '../template-card/template-card.js';
import { DEFAULT_TEMPLATE_PAYLOAD } from './constants.js';

const TemplatesSection: React.FC = () => {
    const dispatch = useAppDispatch();

    const { templates, dataStatus } = useAppSelector(({ studio }) => studio);

    useEffect(() => {
        if (templates.public.length === EMPTY_VALUE) {
            void dispatch(studioActions.loadPublicTemplates());
        }
        if (!templates.isUserLoaded) {
            void dispatch(studioActions.loadUserTemplates());
        }
    }, [dispatch, templates]);

    const [selectedFormat, setSelectedFormat] = useState<
        'landscape' | 'portrait' | null
    >(null);

    const handleLandscapeClick = useCallback((): void => {
        setSelectedFormat('landscape');
    }, []);

    const handlePortraitClick = useCallback((): void => {
        setSelectedFormat('portrait');
    }, []);

    const form = useAppForm({
        initialValues: DEFAULT_TEMPLATE_PAYLOAD,
    });

    return (
        <Box padding="17px 0">
            <Overlay isOpen={dataStatus === DataStatus.PENDING}>
                <Loader />
            </Overlay>

            <Flex
                alignItems="center"
                marginBottom="9px"
                justifyContent="space-between"
            >
                <Heading color="typography.900" variant="H3" marginRight="11px">
                    OutreachVids Template
                </Heading>
                <Flex flexDirection="row" gap="3" alignItems="center">
                    <FormProvider value={form}>
                        <Select placeholder="Categories" name="language">
                            <option value="option1">All Categories</option>
                        </Select>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon
                                    as={IconName.MAGNIFYING}
                                    color="background.600"
                                />
                            </InputLeftElement>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Search templates"
                                paddingLeft="30px"
                            />
                        </InputGroup>
                        <Flex
                            flexDirection="row"
                            backgroundColor="#F6F5FA"
                            borderRadius="20px"
                        >
                            <Button
                                label="Landscape"
                                w="100%"
                                borderRadius="20px"
                                bg={
                                    selectedFormat === 'landscape'
                                        ? 'white'
                                        : '#F6F5FA'
                                }
                                color={
                                    selectedFormat === 'landscape'
                                        ? 'background.600'
                                        : 'typography.600'
                                }
                                onClick={handleLandscapeClick}
                            />
                            <Button
                                label="Portrait"
                                w="100%"
                                borderRadius="20px"
                                bg={
                                    selectedFormat === 'portrait'
                                        ? 'white'
                                        : '#F6F5FA'
                                }
                                color={
                                    selectedFormat === 'portrait'
                                        ? 'background.600'
                                        : 'typography.600'
                                }
                                onClick={handlePortraitClick}
                            ></Button>
                        </Flex>
                    </FormProvider>
                </Flex>
            </Flex>
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="20px">
                {templates.public.map(({ id, ...template }) => (
                    <TemplateCard key={id} {...template} />
                ))}
                {templates.user.map(({ id, ...template }) => (
                    <TemplateCard key={id} {...template} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export { TemplatesSection };
