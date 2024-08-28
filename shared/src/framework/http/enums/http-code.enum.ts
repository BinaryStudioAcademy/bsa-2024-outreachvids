const HttpCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNPROCESSED_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export { HttpCode };
