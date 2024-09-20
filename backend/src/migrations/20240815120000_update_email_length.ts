import { type Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'email';
const MAX_EMAIL_LENGTH = 320;

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(COLUMN_NAME, MAX_EMAIL_LENGTH).alter();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(COLUMN_NAME).alter();
    });
}

export { down, up };
