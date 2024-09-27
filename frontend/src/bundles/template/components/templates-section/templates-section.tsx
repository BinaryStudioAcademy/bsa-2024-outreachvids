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
    Select,
    SimpleGrid,
} from '~/bundles/common/components/components.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { type Template } from '../../types/template.type.js';
import { TemplateCard } from '../template-card/template-card.js';
import { DEFAULT_TEMPLATE_PAYLOAD } from './constants.js';

//TODO Change with the backend information
const templates: Template[] = [
    {
        id: '1',
        name: 'My first avatar video',
        url: 'https://d19jw8gcwb6nqj.cloudfront.net/renders/2ymzogrn5a/out.mp4',
        previewUrl:
            'https://s3-alpha-sig.figma.com/img/f5bc/ae04/08301b8c7727dcf6209bc655b0dd7133?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n5c0QxXVFRbXTmwIakB5EoU6FRSafJV4WqXFLHI6hp3XlikD8TfwCzovoEAxxj4WYBrm2k371A-NaX1PWZdVQbEYKzVT0ZtcXR8eRO39vQ0ZBFQL8J4Vdqps-XJc3Dau4im97u3wb-mrweKhwlDHiI9xN-~3-7Gk7nM6EYjfaVQU9T5j9-zP5RSqE3PBDTjZlpnIgCDhkTVFmWb6n2O3XZ3X85uKVl-6R0dLYkhv2qux~r1gespYmw3KQJesUpix5P3hsxpzk~WkiANM6dudib9Yapk2wG6u6ULIE1rtgjPNm6myG1bWV0dX0jEAsabMNn95WmelSEK6Pq3Q4fGrRg__',
    },
];

const TemplatesSection: React.FC = () => {
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
                {templates.map(({ id, ...template }) => (
                    <TemplateCard key={id} {...template} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export { TemplatesSection };
