import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'name': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private constructor({
        id,
        email,
        name,
        passwordHash,
        passwordSalt,
    }: {
        id: number | null;
        email: string;
        name: string;
        passwordHash: string;
        passwordSalt: string;
    }) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }

    public static initialize({
        id,
        email,
        name,
        passwordHash,
        passwordSalt,
    }: {
        id: number;
        email: string;
        name: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            name,
            passwordHash,
            passwordSalt,
        });
    }

    public static initializeNew({
        email,
        name,
        passwordHash,
        passwordSalt,
    }: {
        email: string;
        name: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            name,
            passwordHash,
            passwordSalt,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        name: string;
    } {
        return {
            id: this.id as number,
            email: this.email,
            name: this.name,
        };
    }

    public toNewObject(): {
        email: string;
        name: string;
        passwordHash: string;
        passwordSalt: string;
    } {
        return {
            email: this.email,
            name: this.name,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
        };
    }
}

export { UserEntity };
