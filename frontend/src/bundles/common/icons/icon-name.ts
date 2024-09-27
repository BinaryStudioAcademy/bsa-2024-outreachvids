import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    CloseIcon,
    DeleteIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
    WarningIcon,
} from '@chakra-ui/icons';

import { Logo, LogoText, OpenAi } from './custom-icons/custom-icons.js';
import {
    AIAvatars,
    BackwardStep,
    CircleUser,
    CloudArrowDown,
    CloudArrowUp,
    EllipsisVertical,
    FileLines,
    Font,
    ForwardStep,
    Heart,
    House,
    Image,
    Pause,
    Pen,
    Play,
    RightFromBracket,
    Scroll,
    Stop,
    T,
    TableColumns,
    VideoCamera,
    VolumeHigh,
    VolumeOff,
} from './helper/icon-conversion.helper.js';

const IconName = {
    AI_AVATARS: AIAvatars,
    CHEVRON_DOWN: ChevronDownIcon,
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
    VIDEO_CAMERA: VideoCamera,
    IMAGE: Image,
    HEART: Heart,
} as const;

export { IconName };
