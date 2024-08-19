import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD_HASH: 'password_hash',
    PASSWORD_SALT: 'password_salt',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    NAME: 'name',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid('id')
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table
            .string(ColumnName.NAME)
            .notNullable();
        table.string(ColumnName.EMAIL).unique().notNullable();
        table.text(ColumnName.PASSWORD_HASH).notNullable();
        table.text(ColumnName.PASSWORD_SALT).notNullable();
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

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
