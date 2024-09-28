import { type FormikProps } from 'formik';

import { EMPTY_LENGTH } from '~/bundles/ai-avatars/constants/constants.js';
import { type AvatarMapped } from '~/bundles/ai-avatars/types/types.js';
import {
    Badge,
    Box,
    Flex,
    FormProvider,
    Heading,
    Select,
    SimpleGrid,
    Text,
} from '~/bundles/common/components/components.js';

import { AvatarCard } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    subtitle: string;
    avatars: AvatarMapped[];
    form?: FormikProps<{ style: string }>;
};

const AvatarsSection: React.FC<Properties> = ({ subtitle, avatars, form }) => {
    return (
        <Box p="10px 0">
            <Flex justify="space-between" align="center" mb="10px">
                <Flex>
                    <Heading
                        color="typography.900"
                        variant="H4"
                        marginRight="11px"
                    >
                        {subtitle}
                    </Heading>
                    <Badge
                        color="background.600"
                        bg="#D1D4DB"
                        fontWeight="400"
                        padding="2px 10px"
                    >
                        {avatars.length}
                    </Badge>
                </Flex>
                {form && (
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
                )}
            </Flex>
            {avatars.length === EMPTY_LENGTH && !form ? (
                <Text color="typography.600" variant="body1">
                    Pick your favorites avatars to show them here!
                </Text>
            ) : (
                <SimpleGrid className={styles['grid']} spacing="40px">
                    {avatars.map(({ id, imgUrl, name, style, isLiked }) => (
                        <AvatarCard
                            key={`${id}-${style}`}
                            id={id}
                            name={name}
                            tag={style}
                            image={imgUrl}
                            isLiked={isLiked}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export { AvatarsSection };
