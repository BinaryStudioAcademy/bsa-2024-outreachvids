import { type Knex } from 'knex';

const TABLE_NAME = 'notifications';

const ColumnName = {
    ID: 'id',
    TYPE: 'type',
    IS_READ: 'is_read',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table
            .enu(ColumnName.TYPE, ['render'], {
                useNative: true,
                enumName: 'notification_type',
            })
            .notNullable();
        table.boolean(ColumnName.IS_READ).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
