import { type Knex } from 'knex';

const TABLE_NAME = 'users';

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.string('full_name').notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn('full_name');
    });
}

export { down, up };
