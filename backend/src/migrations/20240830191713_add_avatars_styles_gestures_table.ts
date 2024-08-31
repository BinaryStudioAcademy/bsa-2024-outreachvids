import { type Knex } from 'knex';

const TABLE_NAME = 'avatars_styles_gestures';

const ColumnName = {
    AVATAR_STYLE_ID: 'avatar_style_id',
    GESTURE_ID: 'gesture_id',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TABLE_NAME, (table) => {
        table.uuid(ColumnName.AVATAR_STYLE_ID).notNullable();
        table.uuid(ColumnName.GESTURE_ID).notNullable();
        table.primary([ColumnName.AVATAR_STYLE_ID, ColumnName.GESTURE_ID]);
        table
            .foreign(ColumnName.AVATAR_STYLE_ID)
            .references('avatars_styles.id')
            .onDelete('CASCADE');
        table
            .foreign(ColumnName.GESTURE_ID)
            .references('gestures.id')
            .onDelete('CASCADE');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
