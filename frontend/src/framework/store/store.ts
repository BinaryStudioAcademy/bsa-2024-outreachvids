import { config } from '~/framework/config/config.js';

import { Store } from './store.package.js';

const store = new Store(config);

export { store };
