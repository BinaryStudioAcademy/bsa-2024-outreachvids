import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faCircleUser,
    faCloudArrowDown,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faForwardStep,
    faHeart,
    faHouse,
    faImage,
    faPause,
    faPen,
    faPlay,
    faRightFromBracket,
    faScroll,
    faStop,
    faT,
    faTableColumns,
    faVideoCamera,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

import { convertIcon } from './convert-icon.helper.js';

const CircleUser = convertIcon(faCircleUser);
const BackwardStep = convertIcon(faBackwardStep);
const FileLines = convertIcon(faFileLines);
const CloudArrowUp = convertIcon(faCloudArrowUp);
const EllipsisVertical = convertIcon(faEllipsisVertical);
const Font = convertIcon(faFont);
const House = convertIcon(faHouse);
const Pen = convertIcon(faPen);
const Play = convertIcon(faPlay);
const RightFromBracket = convertIcon(faRightFromBracket);
const Scroll = convertIcon(faScroll);
const T = convertIcon(faT);
const TableColumns = convertIcon(faTableColumns);
const ForwardStep = convertIcon(faForwardStep);
const Pause = convertIcon(faPause);
const CloudArrowDown = convertIcon(faCloudArrowDown);
const VolumeHigh = convertIcon(faVolumeHigh);
const VolumeOff = convertIcon(faVolumeOff);
const Stop = convertIcon(faStop);
const VideoCamera = convertIcon(faVideoCamera);
const Image = convertIcon(faImage);
const HeartFill = convertIcon(faHeart);
const HeartOutline = convertIcon(faHeartRegular);

export {
    BackwardStep,
    CircleUser,
    CloudArrowDown,
    CloudArrowUp,
    EllipsisVertical,
    FileLines,
    Font,
    ForwardStep,
    HeartFill,
    HeartOutline,
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
};
