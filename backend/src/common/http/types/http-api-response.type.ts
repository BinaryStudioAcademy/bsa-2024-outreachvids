type HttpApiResponse = Response & {
    json<T = unknown>(): Promise<T> | never;
};

export { type HttpApiResponse };
