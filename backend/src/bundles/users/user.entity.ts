import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private constructor({
        id,
        email,
        passwordHash,
        passwordSalt,
    }: {
        id: number | null;
        email: string;
        passwordHash: string;
        passwordSalt: string;
    }) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }

    public static initialize({
        id,
        email,
        passwordHash,
        passwordSalt,
    }: {
        id: number;
        email: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            passwordHash,
            passwordSalt,
        });
    }

    public static initializeNew({
        email,
        passwordHash,
        passwordSalt,
    }: {
        email: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            passwordHash,
            passwordSalt,
        });
    }

    public toObject(): {
        id: number;
        email: string;
    } {
        return {
            id: this.id as number,
            email: this.email,
        };
    }

    public toNewObject(): {
        email: string;
        passwordHash: string;
        passwordSalt: string;
    } {
        return {
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
        };
    }
}

export { UserEntity };
