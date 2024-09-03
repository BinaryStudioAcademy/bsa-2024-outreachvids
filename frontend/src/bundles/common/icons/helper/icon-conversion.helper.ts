import {
    faCircleUser,
    faCloudArrowDown,
    faFileLines,
    faHouse,
    faPause,
    faPlay,
    faRightFromBracket,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const HouseIcon = iconConverter(faHouse);
const RightFromBracketIcon = iconConverter(faRightFromBracket);
const CircleUserIcon = iconConverter(faCircleUser);
const CloudArrowDown = iconConverter(faCloudArrowDown);
const Pause = iconConverter(faPause);
const Play = iconConverter(faPlay);
const VolumeHigh = iconConverter(faVolumeHigh);
const VolumeOff = iconConverter(faVolumeOff);
const FileLines = iconConverter(faFileLines);

export {
    CircleUserIcon,
    CloudArrowDown,
    FileLines,
    HouseIcon,
    Pause,
    Play,
    RightFromBracketIcon,
    VolumeHigh,
    VolumeOff,
};
