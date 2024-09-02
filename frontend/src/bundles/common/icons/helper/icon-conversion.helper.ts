import {
    faCircleUser,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faHouse,
    faPen,
    faPlay,
    faRightFromBracket,
    faScroll,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const CircleUserIcon = iconConverter(faCircleUser);
const CloudArrowUpIcon = iconConverter(faCloudArrowUp);
const EllipsisVerticalIcon = iconConverter(faEllipsisVertical);
const FileLinesIcon = iconConverter(faFileLines);
const FontIcon = iconConverter(faFont);
const HouseIcon = iconConverter(faHouse);
const PenIcon = iconConverter(faPen);
const PlayIcon = iconConverter(faPlay);
const RightFromBracketIcon = iconConverter(faRightFromBracket);
const ScrollIcon = iconConverter(faScroll);
const TIcon = iconConverter(faT);
const TableColumnsIcon = iconConverter(faTableColumns);

export {
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
};
