import { createStandaloneToast } from '@chakra-ui/react';

import { theme } from '~/framework/theme/theme.js';

import { ToastService } from './toast.service.js';

const { toast } = createStandaloneToast({ theme: theme });

const toastService = new ToastService({ toast });

export { ToastService } from './toast.service.js';
export { toastService };
