import {
    Badge,
    Box,
    Icon,
    IconButton,
    Image,
    Text,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName } from '~/bundles/common/icons/icons.js';
import { DeleteWarning } from '~/bundles/home/components/video-card/components/delete-warning.js';

import styles from './styles.module.css';

type Properties = {
    id: string;
    name: string;
    previewUrl: string;
};

const TemplateCard: React.FC<Properties> = ({ id, name, previewUrl }) => {
    const navigate = useNavigate();
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    const handleIconClick = useCallback((): void => {
        navigate(AppRoute.STUDIO, {
            state: {
                templateId: id,
            },
        });
    }, [id, navigate]);

    const handleWarningModalClose = useCallback(() => {
        setIsWarningModalOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        handleWarningModalClose();
    }, [handleWarningModalClose]);

    return (
        <Box borderRadius="8px" bg="white" padding="7px">
            <Box
                position="relative"
                role="group"
                height="115px"
                overflow="hidden"
            >
                <Image
                    src={previewUrl}
                    alt="Video preview"
                    className={styles['preview-image']}
                />

                <IconButton
                    size="xs"
                    aria-label={'Edit template'}
                    _groupHover={{ opacity: 1 }}
                    onClick={handleIconClick}
                    className={styles['play-button']}
                    icon={<Icon as={IconName.PEN} color="background.600" />}
                />
            </Box>

            <Box padding="7px 10px 5px 5px">
                <Text variant="button" color="typography.900">
                    {name}
                </Text>
            </Box>

            <Badge
                color="typography.900"
                textTransform="none"
                bg="background.300"
                fontWeight="400"
                padding="0 8px"
                borderRadius="24px"
            >
                Advertisement
            </Badge>

            <DeleteWarning
                isOpen={isWarningModalOpen}
                onClose={handleWarningModalClose}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export { TemplateCard };
