import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const HouseIcon = iconConverter(faHouse);
const RightFromBracketIcon = iconConverter(faRightFromBracket);

export { HouseIcon, RightFromBracketIcon };
