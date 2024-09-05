import { type ValueOf } from '~/bundles/common/types/types.js';

import { type RowNames } from '../enums/enums.js';

type RowType = ValueOf<typeof RowNames>;

export { type RowType };
