import { type store } from '~/framework/store/store.js';

type RootState = ReturnType<typeof store.instance.getState>;

export { type RootState };
