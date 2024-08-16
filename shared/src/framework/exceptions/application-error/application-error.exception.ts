type Constructor = {
    message: string;
    cause?: unknown;
};

class ApplicationError extends Error {
    public constructor({ message, cause }: Constructor) {
        super(message, {
            cause,
        });
    }
}

export { ApplicationError };
