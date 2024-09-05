import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';

import {
    BackwardStepIcon,
    CircleUserIcon,
    CloudArrowUpIcon,
    EllipsisVerticalIcon,
    FileLinesIcon,
    FontIcon,
    ForwardStepIcon,
    HouseIcon,
    PauseIcon,
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
    PLAY_STEP_BACK: BackwardStepIcon,
    PLAY_STEP_NEXT: ForwardStepIcon,
    PAUSE: PauseIcon,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: CloudArrowUpIcon,
    TEMPLATE: TableColumnsIcon,
    SCRIPT: FontIcon,
    TEXT: TIcon,
    ADD: AddIcon,
    CLOSE: CloseIcon,
} as const;

export { IconName };
