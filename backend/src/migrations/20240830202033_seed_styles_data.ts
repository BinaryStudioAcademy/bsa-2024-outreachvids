import { type Knex } from 'knex';

const TABLE_NAME = 'styles';

async function up(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).insert([
        { id: 'b58f9707-e4a4-49fc-8270-5984e70deb70', style: 'business' },
        { id: 'e531c2c9-e06b-40f8-9fda-7b4168f79640', style: 'casual' },
        { id: '4038faa8-172e-4616-a16d-79dc004103ff', style: 'youthful' },
        { id: '94b9d9ca-f573-47b0-92e9-133aaa5026a6', style: 'formal' },
        { id: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5', style: 'casual-sitting' },
        {
            id: 'bbfb571d-b4d7-4fed-a867-c9c3d9a282e8',
            style: 'graceful-sitting',
        },
        {
            id: '6af1591c-941d-4d89-86c7-2ac354e20620',
            style: 'graceful-standing',
        },
        {
            id: '856235f0-e3a3-46da-8814-dc0716b04724',
            style: 'technical-sitting',
        },
        {
            id: '254aa1e9-7651-46cd-8a5e-71588020804e',
            style: 'technical-standing',
        },
        { id: '9e0adc24-dd61-4397-a620-5e8cba00e0b3', style: 'graceful' },
        { id: 'd63a7981-a1d3-4ee5-af3a-5f7f3b664e3e', style: 'a-little-bit' },
    ]);
}

async function down(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
}

export { down, up };
