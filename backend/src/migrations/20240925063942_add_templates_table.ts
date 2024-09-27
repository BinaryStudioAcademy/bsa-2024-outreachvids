import { type Knex } from 'knex';

const TABLE_NAME = 'templates';

const ColumnName = {
    ID: 'id',
    NAME: 'name',
    USER_ID: 'user_id',
    COMPOSITION: 'composition',
    PREVIEW_URL: 'preview_url',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid('id')
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string(ColumnName.NAME).notNullable();
        table.uuid(ColumnName.USER_ID).nullable().defaultTo(null);
        table.jsonb(ColumnName.COMPOSITION).notNullable();
        table.string(ColumnName.PREVIEW_URL).notNullable();
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
