import {
    faBackwardStep,
    faCircleUser,
    faFileLines,
    faForwardStep,
    faHouse,
    faPause,
    faPlay,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const HouseIcon = iconConverter(faHouse);
const RightFromBracketIcon = iconConverter(faRightFromBracket);
const CircleUserIcon = iconConverter(faCircleUser);
const backwardStepIcon = iconConverter(faBackwardStep);
const forwardStepIcon = iconConverter(faForwardStep);
const pauseIcon = iconConverter(faPause);
const playIcon = iconConverter(faPlay);
const fileLinesIcon = iconConverter(faFileLines);

export {
    backwardStepIcon,
    CircleUserIcon,
    fileLinesIcon,
    forwardStepIcon,
    HouseIcon,
    pauseIcon,
    playIcon,
    RightFromBracketIcon,
};
