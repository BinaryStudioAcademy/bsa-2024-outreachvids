class VideoEntity {
    'id';
    'userId';
    'name';
    'url';
    constructor({ id, userId, name, url, }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.url = url;
    }
    static initialize({ id, userId, name, url, }) {
        return new VideoEntity({
            id,
            userId,
            name,
            url,
        });
    }
    static initializeNew({ userId, name, url, }) {
        return new VideoEntity({
            id: null,
            userId,
            name,
            url,
        });
    }
    toObject() {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            url: this.url,
        };
    }
    toNewObject() {
        return {
            userId: this.userId,
            name: this.name,
            url: this.url,
        };
    }
}
export { VideoEntity };
