import { type ValueOf } from '~/bundles/common/types/types.js';

import { type PlayIconNames } from '../enums/enums.js';
import { type Script } from './types.js';

type ScriptWithIcon = Script & { iconName: ValueOf<typeof PlayIconNames> };

export { type ScriptWithIcon };
