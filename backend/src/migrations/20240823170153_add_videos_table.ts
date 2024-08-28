import { type Knex } from 'knex';

const TABLE_NAME = 'videos';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    NAME: 'name',
    URL: 'url',
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
        table.uuid(ColumnName.USER_ID).notNullable();
        table.string(ColumnName.NAME).notNullable();
        table.string(ColumnName.URL).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .foreign(ColumnName.USER_ID)
            .references('users.id')
            .onDelete('CASCADE');
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
