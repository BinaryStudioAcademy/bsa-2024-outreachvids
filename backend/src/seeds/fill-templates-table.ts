import { type Knex } from 'knex';

import { templatesSeed } from '../seed-data/templates-seed.js';

const TableName = {
    TEMPLATES: 'templates',
} as const;

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx(TableName.TEMPLATES).del();

        const templatesMappedSeed = templatesSeed.map((template) => ({
            ...template,
        }));

        await trx(TableName.TEMPLATES).insert(templatesMappedSeed);
    });
}

export { seed };
