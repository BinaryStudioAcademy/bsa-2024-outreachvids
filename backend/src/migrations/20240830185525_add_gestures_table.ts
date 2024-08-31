import { type Knex } from 'knex';

const TABLE_NAME = 'gestures';

const ColumnName = {
    ID: 'id',
    GESTURE: 'gesture',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string(ColumnName.GESTURE).unique().notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
