import { type ValueOf } from '../../../types/types.js';
import { type HttpCode } from '../../http/http.js';
import { ApplicationError } from '../application-error/application-error.exception.js';

type Constructor = {
    message: string;
    status: ValueOf<typeof HttpCode>;
    cause?: unknown;
};

class HttpError extends ApplicationError {
    public status: ValueOf<typeof HttpCode>;

    public constructor({ message, cause, status }: Constructor) {
        super({
            message,
            cause,
        });

        this.status = status;
    }
}

export { HttpError };
