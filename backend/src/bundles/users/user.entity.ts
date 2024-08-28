import { type Entity } from '~/common/types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'fullName': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private constructor({
        id,
        email,
        fullName,
        passwordHash,
        passwordSalt,
    }: {
        id: number | null;
        email: string;
        fullName: string;
        passwordHash: string;
        passwordSalt: string;
    }) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }

    public static initialize({
        id,
        email,
        fullName,
        passwordHash,
        passwordSalt,
    }: {
        id: number;
        email: string;
        fullName: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            fullName,
            passwordHash,
            passwordSalt,
        });
    }

    public static initializeNew({
        email,
        fullName,
        passwordHash,
        passwordSalt,
    }: {
        email: string;
        fullName: string;
        passwordHash: string;
        passwordSalt: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            fullName,
            passwordHash,
            passwordSalt,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        fullName: string;
    } {
        return {
            id: this.id as number,
            email: this.email,
            fullName: this.fullName,
        };
    }

    public toNewObject(): {
        email: string;
        fullName: string;
        passwordHash: string;
        passwordSalt: string;
    } {
        return {
            email: this.email,
            fullName: this.fullName,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
        };
    }
}

export { UserEntity };
