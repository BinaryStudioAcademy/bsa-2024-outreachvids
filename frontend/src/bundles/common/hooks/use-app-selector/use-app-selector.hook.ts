import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { type RootState } from '~/bundles/common/types/types.js';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
