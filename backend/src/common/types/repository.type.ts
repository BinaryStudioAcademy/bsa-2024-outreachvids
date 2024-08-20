type Repository<T = unknown> = {
    find(): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
    findById(userId: number): Promise<T | null>;
};

export { type Repository };
