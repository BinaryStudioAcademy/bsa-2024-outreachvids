class UserEntity {
    'id';
    'email';
    'fullName';
    'passwordHash';
    'passwordSalt';
    constructor({ id, email, fullName, passwordHash, passwordSalt, }) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }
    static initialize({ id, email, fullName, passwordHash, passwordSalt, }) {
        return new UserEntity({
            id,
            email,
            fullName,
            passwordHash,
            passwordSalt,
        });
    }
    static initializeNew({ email, fullName, passwordHash, passwordSalt, }) {
        return new UserEntity({
            id: null,
            email,
            fullName,
            passwordHash,
            passwordSalt,
        });
    }
    toObject() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.fullName,
        };
    }
    toNewObject() {
        return {
            email: this.email,
            fullName: this.fullName,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
        };
    }
}
export { UserEntity };
