import { type DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Script = {
    id: string;
    duration: number;
    text: string;
    voiceName: string;
    status: ValueOf<typeof DataStatus>;
    url?: string;
};

export { type Script };
