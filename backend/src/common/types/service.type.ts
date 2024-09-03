type Service<T = unknown> = {
    findById(id: string): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: string, payload: unknown): Promise<T>;
    delete(id: string): Promise<boolean>;
};

export { type Service };
