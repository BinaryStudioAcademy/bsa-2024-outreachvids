import { type ValueOf } from '~/bundles/common/types/types.js';

import { type PlayIconNames } from '../enums/play-icon-names.enum.js';
import { type Voice } from './types.js';

type Script = {
    id: string;
    duration: number;
    text: string;
    voiceName: string;
    iconName: ValueOf<typeof PlayIconNames>;
    url?: string;
    voice?: Voice | undefined;
};

export { type Script };
