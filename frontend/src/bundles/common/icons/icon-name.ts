import { ArrowBackIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const IconName = {
    ARROW_BACK: ArrowBackIcon,
    CHECK_CIRCLE: CheckCircleIcon,
    CIRCLE: faCircle,
} as const;

export { IconName };
