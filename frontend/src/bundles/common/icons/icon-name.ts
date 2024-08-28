import { ArrowBackIcon, CheckCircleIcon } from '@chakra-ui/icons';
import {
    faCircle,
    faEllipsisVertical,
    faPen,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    OPTIONS_VERTICAL: faEllipsisVertical,
    PEN: faPen,
    ARROW_BACK: ArrowBackIcon,
    CHECK_CIRCLE: CheckCircleIcon,
    CIRCLE: faCircle,
} as const;

export { IconName };
