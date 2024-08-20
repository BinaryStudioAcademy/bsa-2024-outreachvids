import { createStandaloneToast } from '@chakra-ui/react';
import {
    type Middleware,
    isRejected,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { type ServerValidationErrorResponse } from 'shared';

import { theme } from '~/framework/theme/theme.js';

import { stringToReactNode } from '../helpers/helpers.js';

const { toast } = createStandaloneToast({ theme: theme });
const toastId = 'redux-store-error';

const errorMiddleware: Middleware = () => {
    return (next) => (action) => {
        let message: string = '';
        if (isRejectedWithValue(action)) {
            message += JSON.stringify(action.payload);
        } else if (isRejected(action)) {
            const error = action.error as ServerValidationErrorResponse;
            message += `${error.message}\n`;
            if (error.details) {
                for (const errorDetail of error.details) {
                    message += `\t- ${errorDetail.message}\n`;
                }
            }
        }

        if (message !== '' && !toast.isActive(toastId)) {
            toast({
                id: toastId,
                title: 'An error occurred.',
                description: stringToReactNode(message),
                status: 'error',
                duration: 7000,
                isClosable: true,
                position: 'top-right',
            });
        }

        return next(action);
    };
};

export { errorMiddleware };
