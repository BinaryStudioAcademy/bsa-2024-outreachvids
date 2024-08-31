import { type Knex } from 'knex';

const TABLE_NAME = 'avatars_styles';

const ColumnName = {
    ID: 'id',
    AVATAR_ID: 'avatar_id',
    STYLE_ID: 'style_id',
    IMG_URL: 'img_url',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .notNullable()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid(ColumnName.AVATAR_ID).notNullable();
        table.uuid(ColumnName.STYLE_ID).notNullable();
        table.string(ColumnName.IMG_URL).notNullable();
        table
            .foreign(ColumnName.AVATAR_ID)
            .references('avatars.id')
            .onDelete('CASCADE');
        table
            .foreign(ColumnName.STYLE_ID)
            .references('styles.id')
            .onDelete('CASCADE');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
