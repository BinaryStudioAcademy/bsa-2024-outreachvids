import { DownloadIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    faCircleUser,
    faCloudArrowUp,
    faFont,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: faCircleUser,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
} as const;

export { IconName };
