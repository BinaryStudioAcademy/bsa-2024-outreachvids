type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    session?: unknown;
    user?: unknown;
    headers?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    session: T['session'];
    user: T['user'];
    headers: T['headers'];
};

export { type ApiHandlerOptions };
