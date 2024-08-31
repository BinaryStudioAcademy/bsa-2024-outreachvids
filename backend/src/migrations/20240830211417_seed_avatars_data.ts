import { type Knex } from 'knex';

const TABLE_NAME = 'avatars';

async function up(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).insert([
        {
            id: 'b58f9707-e4a4-49fc-8270-5984e70deb70',
            name: 'harry',
            voice: 'en-US-AndrewNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-US-Andrew-General-Audio.wav',
        },
        {
            id: 'e531c2c9-e06b-40f8-9fda-7b4168f79640',
            name: 'jeff',
            voice: 'en-US-BrandonNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-US-Brandon-General-Audio.wav',
        },
        {
            id: '4038faa8-172e-4616-a16d-79dc004103ff',
            name: 'lisa',
            voice: 'en-AU-TinaNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-AU-Tina-General-Audio.wav',
        },
        {
            id: '94b9d9ca-f573-47b0-92e9-133aaa5026a6',
            name: 'lori',
            voice: 'en-AU-KimNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-AU-Kim-General-Audio.wav',
        },
        {
            id: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5',
            name: 'max',
            voice: 'en-US-JasonNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/En-US-Jason-General-Audio.wav',
        },
        {
            id: 'bbfb571d-b4d7-4fed-a867-c9c3d9a282e8',
            name: 'meg',
            voice: 'en-US-JennyMultilingualNeural',
            voice_url: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-US-JennyMultilingual-General-Audio.wav',
        },
    ]);
}

async function down(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
}

export { down, up };
