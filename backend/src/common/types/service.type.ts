type Service<T = unknown> = {
    find(): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    findById(userId: number): Promise<T | null>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };
