import { type ServerErrorType } from '../enums/enums.js';
import { type ServerErrorDetail } from './server-error-detail.type.js';

type ServerValidationErrorResponse = {
    errorType: typeof ServerErrorType.VALIDATION;
    message: string;
    details: ServerErrorDetail[];
};

type ServerCommonErrorResponse = {
    errorType: typeof ServerErrorType.COMMON;
    message: string;
};

type ServerErrorResponse =
    | ServerValidationErrorResponse
    | ServerCommonErrorResponse;

export {
    type ServerCommonErrorResponse,
    type ServerErrorResponse,
    type ServerValidationErrorResponse,
};
