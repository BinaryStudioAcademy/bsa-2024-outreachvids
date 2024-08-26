type Repository<T = unknown> = {
    find(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(id: string, payload: unknown): Promise<T>;
    delete(id: string): Promise<boolean>;
};

export { type Repository };
