type Service<T = unknown> = {
    find(): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    findByEmail(email: string): Promise<T>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
