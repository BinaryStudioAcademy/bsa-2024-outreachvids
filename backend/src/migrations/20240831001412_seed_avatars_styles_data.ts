import { type Knex } from 'knex';

const TABLE_NAME = 'avatars_styles';

const avatars = {
    harry: 'b58f9707-e4a4-49fc-8270-5984e70deb70',
    jeff: 'e531c2c9-e06b-40f8-9fda-7b4168f79640',
    lisa: '4038faa8-172e-4616-a16d-79dc004103ff',
    lori: '94b9d9ca-f573-47b0-92e9-133aaa5026a6',
    max: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5',
    meg: 'bbfb571d-b4d7-4fed-a867-c9c3d9a282e8',
};

const styles = {
    business: 'b58f9707-e4a4-49fc-8270-5984e70deb70',
    casual: 'e531c2c9-e06b-40f8-9fda-7b4168f79640',
    youthful: '4038faa8-172e-4616-a16d-79dc004103ff',
    formal: '94b9d9ca-f573-47b0-92e9-133aaa5026a6',
    casualSitting: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5',
    gracefulSitting: 'bbfb571d-b4d7-4fed-a867-c9c3d9a282e8',
    gracefulStanding: '6af1591c-941d-4d89-86c7-2ac354e20620',
    technicalSitting: '856235f0-e3a3-46da-8814-dc0716b04724',
    technicalStanding: '254aa1e9-7651-46cd-8a5e-71588020804e',
    graceful: '9e0adc24-dd61-4397-a620-5e8cba00e0b3',
    aLittleBit: 'd63a7981-a1d3-4ee5-af3a-5f7f3b664e3e',
};

async function up(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).insert([
        {
            id: '31d92ae7-b778-4fa1-b21a-2669f2269c1d',
            avatar_id: avatars.harry,
            style_id: styles.business,
            img_url: 'https://speech.microsoft.com/assets/avatar/harry/harry-business-thumbnail.png',
        },
        {
            id: '39636998-3fb0-405c-81a0-0f7e9cce4433',
            avatar_id: avatars.harry,
            style_id: styles.casual,
            img_url: 'https://speech.microsoft.com/assets/avatar/harry/harry-casual-thumbnail.png',
        },
        {
            id: 'e1c0832b-842f-4321-bd14-89a03b89e2fd',
            avatar_id: avatars.harry,
            style_id: styles.youthful,
            img_url: 'https://speech.microsoft.com/assets/avatar/harry/harry-youthful-thumbnail.png',
        },
        {
            id: '105bb25d-5fa5-436d-b841-bc5e94ad12b2',
            avatar_id: avatars.jeff,
            style_id: styles.business,
            img_url: 'https://speech.microsoft.com/assets/avatar/jeff/jeff-business-thumbnail-bg.png',
        },
        {
            id: '5163e793-fb1d-4f87-8648-ea1a1563e6d0',
            avatar_id: avatars.jeff,
            style_id: styles.formal,
            img_url: 'https://speech.microsoft.com/assets/avatar/jeff/jeff-formal-thumbnail-bg.png',
        },
        {
            id: '8e6cd9df-31cb-47aa-b167-361283732db8',
            avatar_id: avatars.lisa,
            style_id: styles.casualSitting,
            img_url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-casual-sitting-thumbnail.png',
        },
        {
            id: '8ad9c1a4-7845-4889-a3f8-79bb3abb9642',
            avatar_id: avatars.lisa,
            style_id: styles.gracefulSitting,
            img_url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-graceful-sitting-thumbnail.png',
        },
        {
            id: 'a6e42c42-b098-490f-95b6-07c8402c636d',
            avatar_id: avatars.lisa,
            style_id: styles.gracefulStanding,
            img_url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-graceful-standing-thumbnail.png',
        },
        {
            id: 'd8034a65-7fe8-48ef-9e76-237b462ef5bb',
            avatar_id: avatars.lisa,
            style_id: styles.technicalSitting,
            img_url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-technical-sitting-thumbnail.png',
        },
        {
            id: 'f05aee3d-c76e-4a3d-b4c4-ca9d777f8de6',
            avatar_id: avatars.lisa,
            style_id: styles.technicalStanding,
            img_url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-technical-standing-thumbnail.png',
        },
        {
            id: '061418b3-9316-4e2e-ab62-78633be47f15',
            avatar_id: avatars.lori,
            style_id: styles.casual,
            img_url: 'https://speech.microsoft.com/assets/avatar/lori/lori-casual-thumbnail.png',
        },
        {
            id: '40bde735-8ce4-42a7-a0f8-a90a3d584de8',
            avatar_id: avatars.lori,
            style_id: styles.graceful,
            img_url: 'https://speech.microsoft.com/assets/avatar/lori/lori-graceful-thumbnail.png',
        },
        {
            id: 'e310a316-e4ac-404f-bff2-76efaf247ec9',
            avatar_id: avatars.lori,
            style_id: styles.formal,
            img_url: 'https://speech.microsoft.com/assets/avatar/lori/lori-formal-thumbnail.png',
        },
        {
            id: 'f24c1d23-db5c-4da3-8a34-8492d9ceb313',
            avatar_id: avatars.max,
            style_id: styles.business,
            img_url: 'https://speech.microsoft.com/assets/avatar/max/max-business-thumbnail.png',
        },
        {
            id: '4953696e-cc3f-4d89-a2a0-7d01bf875779',
            avatar_id: avatars.max,
            style_id: styles.casual,
            img_url: 'https://speech.microsoft.com/assets/avatar/max/max-casual-thumbnail.png',
        },
        {
            id: '31515e5e-dddf-4b87-887d-45eedc8aab67',
            avatar_id: avatars.max,
            style_id: styles.formal,
            img_url: 'https://speech.microsoft.com/assets/avatar/max/max-formal-thumbnail.png',
        },
        {
            id: '084e2e1b-099a-4c4c-aa99-ab507d698bad',
            avatar_id: avatars.meg,
            style_id: styles.formal,
            img_url: 'https://speech.microsoft.com/assets/avatar/meg/meg-formal-thumbnail.png',
        },
        {
            id: '93a4f900-4653-4782-95bf-e2a6d3804130',
            avatar_id: avatars.meg,
            style_id: styles.casual,
            img_url: 'https://speech.microsoft.com/assets/avatar/meg/meg-casual-thumbnail.png',
        },
        {
            id: '3dd729eb-cfa5-46f4-a084-91b4d0b324cb',
            avatar_id: avatars.meg,
            style_id: styles.business,
            img_url: 'https://speech.microsoft.com/assets/avatar/meg/meg-business-thumbnail.png',
        },
    ]);
}

async function down(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
}

export { down, up };
