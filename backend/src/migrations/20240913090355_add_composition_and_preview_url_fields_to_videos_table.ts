import { type Knex } from 'knex';

const TABLE_NAME = 'videos';

const ColumnName = {
    PREVIEW_URL: 'preview_url',
    COMPOSITION: 'composition',
    URL: 'url',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.string(ColumnName.URL).nullable().alter();
        table.jsonb(ColumnName.COMPOSITION).notNullable().defaultTo({});
        table.string(ColumnName.PREVIEW_URL).notNullable().defaultTo('');
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.URL);
        table.dropColumn(ColumnName.COMPOSITION);
        table.dropColumn(ColumnName.PREVIEW_URL);
    });
}

export { down, up };
