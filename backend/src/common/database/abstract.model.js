import { Model } from 'objection';
class Abstract extends Model {
    'id';
    'createdAt';
    'updatedAt';
    $beforeInsert() {
        const insertDate = new Date().toISOString();
        this.createdAt = insertDate;
        this.updatedAt = insertDate;
    }
    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }
}
export { Abstract };
