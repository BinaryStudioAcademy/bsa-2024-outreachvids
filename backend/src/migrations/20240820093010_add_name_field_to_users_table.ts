import { type Knex } from 'knex';

const TABLE_NAME = 'users';

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.string('name').notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };