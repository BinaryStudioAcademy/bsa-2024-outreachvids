import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';

import {
    CircleUserIcon,
    CloudArrowUpIcon,
    EllipsisVerticalIcon,
    FileLinesIcon,
    FontIcon,
    HouseIcon,
    PenIcon,
    PlayIcon,
    RightFromBracketIcon,
    ScrollIcon,
    TableColumnsIcon,
    TIcon,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: PenIcon,
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    FILE_LINES: FileLinesIcon,
    PLAY: PlayIcon,
    SCROLL: ScrollIcon,
    OPTIONS_VERTICAL: EllipsisVerticalIcon,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: CloudArrowUpIcon,
    TEMPLATE: TableColumnsIcon,
    SCRIPT: FontIcon,
    TEXT: TIcon,
} as const;

export { IconName };
