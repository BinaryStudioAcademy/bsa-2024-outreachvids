import {
    type Middleware,
    isRejected,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { type ServerValidationErrorResponse } from 'shared';

import { notificationService } from '../services/services.js';

const notificationId = 'redux-store-error';

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

        if (message && !notificationService.isActive(notificationId)) {
            notificationService.error({
                message,
                id: notificationId,
                title: 'An error occurred.',
            });
        }

        return next(action);
    };
};

export { errorMiddleware };
