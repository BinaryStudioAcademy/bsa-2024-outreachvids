import { type ValueOf } from '../../../types/types.js';
import { type HTTPCode } from '../../http/http.js';
import { ApplicationError } from '../application-error/application-error.exception.js';

type Constructor = {
    message: string;
    status: ValueOf<typeof HTTPCode>;
    cause?: unknown;
};

class HttpError extends ApplicationError {
    public status: ValueOf<typeof HTTPCode>;

    public constructor({ message, cause, status }: Constructor) {
        super({
            message,
            cause,
        });

        this.status = status;
    }
}

export { HttpError };
