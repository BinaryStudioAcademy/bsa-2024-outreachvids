import {
    AddIcon,
    ArrowBackIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    CloseIcon,
    DeleteIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
    WarningIcon,
} from '@chakra-ui/icons';

import { Logo, LogoText, OpenAi } from './custom-icons/custom-icons.js';
import {
    BackwardStep,
    Circle,
    CircleUser,
    CloudArrowDown,
    CloudArrowUp,
    EllipsisVertical,
    FileLines,
    Font,
    ForwardStep,
    House,
    Pause,
    Pen,
    Play,
    RightFromBracket,
    Scroll,
    Stop,
    T,
    TableColumns,
    VolumeHigh,
    VolumeOff,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: Pen,
    HOME: House,
    LOG_OUT: RightFromBracket,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    PLAY: Play,
    PLAY_STEP_BACK: BackwardStep,
    PLAY_STEP_NEXT: ForwardStep,
    PAUSE: Pause,
    FILE_LINES: FileLines,
    SCROLL: Scroll,
    OPTIONS_VERTICAL: EllipsisVertical,
    VOLUME: VolumeHigh,
    VOLUME_OFF: VolumeOff,
    CLOUD_ARROW_DOWN: CloudArrowDown,
    STOP: Stop,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUser,
    UPLOAD: CloudArrowUp,
    TEMPLATE: TableColumns,
    SCRIPT: Font,
    TEXT: T,
    ADD: AddIcon,
    CLOSE: CloseIcon,
    CHECK_CIRCLE: CheckCircleIcon,
    OPEN_AI: OpenAi,
    LOGO: Logo,
    LOGO_TEXT: LogoText,
    DELETE: DeleteIcon,
    WARNING: WarningIcon,
    CIRCLE: Circle,
    ARROW_BACK: ArrowBackIcon,
} as const;

export { IconName };
