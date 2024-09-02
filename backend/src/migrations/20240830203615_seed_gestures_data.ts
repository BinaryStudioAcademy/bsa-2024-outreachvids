import { type Knex } from 'knex';

const TABLE_NAME = 'gestures';

async function up(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).insert([
        { id: '258ead12-cdea-4766-b4fe-797d951646a5', gesture: '123' },
        { id: '5fcb1e9e-3f7f-4f44-b579-b1ac03a48934', gesture: '123-left' },
        { id: '9a18aded-a642-4186-8fea-3b82fcc0e350', gesture: 'a-little' },
        { id: 'ffc7f886-e53d-4701-b251-f6f15c78d839', gesture: 'a-little-bit' },
        { id: '68541e7b-70fd-4add-94b8-0013042d8ef2', gesture: 'applaud' },
        { id: '0dc27fde-827a-4410-8fed-6a1c5aec1cb8', gesture: 'beg' },
        { id: '6a0e0bb8-e797-4606-b513-18ea4a2a4d4e', gesture: 'calm-down' },
        {
            id: '4b63454f-b78c-42d9-9759-250485731f94',
            gesture: 'click-the-link',
        },
        { id: '5628b8a4-d6d0-434f-95bc-e631415842b0', gesture: 'come-on' },
        { id: '2d91986f-143a-4cc2-bbf7-c57684c9bfde', gesture: 'come-on-left' },
        { id: 'ed345366-d1da-48f7-b0de-ca8ffe95fc00', gesture: 'cross-hand' },
        {
            id: '8faaa327-2f80-48ea-92f4-b8406bcc98ce',
            gesture: 'display-number',
        },
        { id: '16c45cf7-05ea-44c8-ab53-0bf3164eca5b', gesture: 'down' },
        { id: '2126d189-af40-479a-85b1-d990d5c572a8', gesture: 'encourage-1' },
        { id: '88448c74-415c-4030-96ac-534475b79bff', gesture: 'encourage-2' },
        { id: 'ca3aa7a3-442c-45f1-9d0d-2624b77c70ea', gesture: 'five-star' },
        {
            id: '11f7d906-e8c5-4df6-ae14-83fdeed0997b',
            gesture: 'five-star-praise',
        },
        {
            id: '0b65ebb7-5485-4b79-a305-b692e2016c72',
            gesture: 'five-star-reviews',
        },
        { id: 'f9d00675-c6ec-4f07-88aa-1dc57ee54d4f', gesture: 'front-left' },
        { id: '95925b6c-6f7e-4c4a-bc24-f8cf2d171e85', gesture: 'front-right' },
        { id: 'e2736ad4-80da-4b98-91a2-bf603f3e9051', gesture: 'good' },
        { id: '4d4c8ebc-5a54-45a9-900e-6f9e5601ec69', gesture: 'good-01' },
        { id: '33e22ddd-fd79-4273-a9d3-035fd165291c', gesture: 'good-02' },
        { id: 'c68873ae-bbff-4960-9e1d-d725c4244beb', gesture: 'good-1' },
        { id: '72788735-73b9-46b2-a0ce-cdf9adc8ab04', gesture: 'good-2' },
        {
            id: '5dd708f7-6b3d-4dd6-98e1-6b0fb1de7558',
            gesture: 'gong-xi-fa-cai',
        },
        {
            id: '8825e371-93ba-4e0a-9940-43d17a68f8db',
            gesture: 'hands-forward',
        },
        {
            id: 'f9e7419a-065c-4ef6-a5dd-fc857fa90a6a',
            gesture: 'hands-triangle',
        },
        { id: '43cd1978-3260-4e5b-9e47-25048dcc227c', gesture: 'hands-up' },
        { id: '34b1b6da-3048-4506-89b4-3b1e1dd0ad40', gesture: 'handclap' },
        {
            id: 'c9e2cbd1-73bd-43d6-832e-6527791ce3a8',
            gesture: 'happy-new-year',
        },
        { id: 'fe513639-c6a8-44c8-9333-127e5fb009e8', gesture: 'hello' },
        { id: '9cb2a135-a7d7-433c-94cb-57e981d21a93', gesture: 'here' },
        { id: '6c0eb8ab-d210-467b-8fb9-061a6291ef35', gesture: 'hi' },
        { id: '6a964e9e-5e43-49ae-a933-c6cf6c77b152', gesture: 'hopeful' },
        { id: 'aa3bd5dd-031a-42de-b8ad-d38ffe984882', gesture: 'introduce' },
        {
            id: 'b2b1d661-3ced-4b8e-a1dd-75f60b84a6e4',
            gesture: 'introduction-to-products-1',
        },
        {
            id: '3ee9daaa-dc6a-46a1-b084-8293a20ff664',
            gesture: 'introduction-to-products-2',
        },
        {
            id: '4b6659e1-c034-4fc7-a28c-f5042cf29d53',
            gesture: 'introduction-to-products-3',
        },
        {
            id: '75d3778f-6c28-410a-a14a-ff82e16e60f1',
            gesture: 'introduction-to-products-4',
        },
        { id: 'c4b75991-8b93-49fb-9f73-3dd44f817436', gesture: 'invite' },
        { id: 'ba134f68-00ac-4826-8c73-116011571c21', gesture: 'left' },
        { id: '5bdb9680-6bc1-4b9f-8930-014b6c011bcd', gesture: 'length' },
        { id: '461bb39f-1f72-40f4-8fc8-90a4db644aa5', gesture: 'lift' },
        { id: '41108e5f-330c-416d-b354-0a51d7845ee6', gesture: 'lower-left' },
        { id: '2adc455b-8cf9-4e48-91b5-1bd4334c1ce4', gesture: 'lower-right' },
        { id: '23b96af3-fd08-4675-9a4a-eb43283ed38a', gesture: 'meddle' },
        { id: 'ef60bcbb-842d-482e-a4ff-cc5cc9e9041b', gesture: 'nod' },
        { id: 'f82c451e-1e66-4841-9f5c-ca182be0a9d3', gesture: 'nodding' },
        { id: '7baff586-6a91-416e-9902-e1529737ce69', gesture: 'number-one' },
        {
            id: '25c3870e-7baf-477d-8092-24751df13092',
            gesture: 'numeric1-left-1',
        },
        {
            id: 'e0446f0e-d300-4bbd-ab07-c681a044d377',
            gesture: 'numeric2-left-1',
        },
        {
            id: 'dda0aa54-ef36-4177-9bb6-23832f3bc251',
            gesture: 'numeric3-left-1',
        },
        { id: '2280d7f5-691c-49f6-bc38-177826340ff0', gesture: 'open' },
        { id: '0494b8f3-d42b-4a99-9e86-ecfb567ba262', gesture: 'please' },
        { id: '5d7f2a10-f57c-43ef-8fb3-0f76baef9eeb', gesture: 'please2' },
        { id: '1af45fac-40bf-43a6-bef4-e9377adf98d4', gesture: 'point-left-1' },
        { id: '2b09dd3b-bb48-46b9-8d37-2846117e5b80', gesture: 'point-left-2' },
        { id: '41b771eb-099e-4b68-b579-e276736d5734', gesture: 'point-left-3' },
        { id: '64b4e203-5790-4e76-8e88-f9c5b1bb8aef', gesture: 'point-left-4' },
        { id: 'd8c4fad1-5614-4bb2-8829-855f36339d1a', gesture: 'point-left-5' },
        { id: '405a2a66-197a-434a-ab77-8121c043863b', gesture: 'point-left-6' },
        {
            id: 'bf914857-3edb-4d48-b703-c0fea5f5c139',
            gesture: 'point-right-1',
        },
        {
            id: '202599ff-dc1a-4568-9316-ce6c41df0101',
            gesture: 'point-right-2',
        },
        {
            id: '2e7e8743-4535-474a-8592-528ebfa8d504',
            gesture: 'point-right-3',
        },
        {
            id: 'df1bbca2-8b1f-4d7a-9d5a-25a3d396dfa7',
            gesture: 'point-right-4',
        },
        {
            id: 'fcb43b2a-1b17-4e9f-ab37-af43915b045e',
            gesture: 'point-right-5',
        },
        {
            id: 'c6e2e981-45e6-46f8-8be0-a4dfd7b0e3f8',
            gesture: 'point-right-6',
        },
        {
            id: 'efd9bb85-1698-4c55-91c5-9958d62eb9e5',
            gesture: 'press-both-hands-down',
        },
        {
            id: '6ecf8a36-1620-43d7-bab4-bf63e5f6821c',
            gesture: 'press-both-hands-down-1',
        },
        {
            id: 'c884cc4b-cc87-4a83-9de6-f5c83a7be094',
            gesture: 'press-both-hands-down-2',
        },
        { id: 'aacd28bc-3c61-442a-8188-c67f0f86ec74', gesture: 'push-forward' },
        {
            id: '1bddc452-890e-48d2-af7e-d0528ffbd5d1',
            gesture: 'raise-ones-hand',
        },
        { id: 'd6860b9b-9986-4746-976d-314ec6887ae0', gesture: 'right' },
        { id: '7e785162-52c3-4c3c-8ad1-45f27dda4c27', gesture: 'right-front' },
        { id: 'b3f1f60f-40d6-4346-a9cb-e4cd4a61c26d', gesture: 'say-hi' },
        { id: '269aaaec-556a-419c-aa26-179fb4d51832', gesture: 'show' },
        { id: '35c13cd2-5700-4994-8a15-779248c00a8e', gesture: 'show-front-1' },
        { id: '74ce34dd-ae43-4db3-81d0-a4eb4d05aab4', gesture: 'show-front-2' },
        { id: '3c96bfdb-ce6f-4cd8-9592-cfd9d8adbeb9', gesture: 'show-front-3' },
        { id: 'e3cd4fc1-432b-4d86-8ffc-ae48620b1188', gesture: 'show-front-4' },
        { id: 'd5bbbfae-bb05-4da9-a227-7709712c9eca', gesture: 'show-front-5' },
        { id: 'aabcc3d3-8d8c-4670-880e-fb2ad4901956', gesture: 'show-front-6' },
        { id: '7398ee92-ccd1-4919-a688-0f5a3273f78e', gesture: 'show-front-7' },
        { id: '88b36ae1-6565-4f71-ad0c-e137f71e30c6', gesture: 'show-front-8' },
        { id: 'da01dc71-3d3e-4623-9752-36525872cf2a', gesture: 'show-front-9' },
        { id: '0e588cbf-9dbd-4818-ae2c-b9a2388cec9a', gesture: 'show-left' },
        { id: '1513e707-63d6-451c-88d1-73d2a008db8f', gesture: 'show-left-1' },
        { id: '05d64bee-a04f-4f1d-82b1-79d8e09b2ba3', gesture: 'show-left-2' },
        { id: 'e24c5233-c7a6-4fc9-994c-57b191b8ee8f', gesture: 'show-left-3' },
        { id: 'a7d1fea9-2236-42cf-bfef-9c7dbde1246c', gesture: 'show-left-4' },
        { id: 'bb455fc1-254c-4c2b-b203-270f25bf9afb', gesture: 'show-left-5' },
        { id: '667eeecc-4cb9-484f-a912-3b0dbc6f0747', gesture: 'show-right' },
        { id: '0f71fa32-66ba-41a2-b4f8-65bfe6d13c3c', gesture: 'show-right-1' },
        { id: '925b88db-8ecf-4134-a575-58d92385c0ce', gesture: 'show-right-2' },
        { id: 'e78fdfb4-2244-46f7-8a6d-d7557bb900d0', gesture: 'show-right-3' },
        { id: '269ae112-01d5-44c7-979f-1b904b942c21', gesture: 'show-right-4' },
        { id: 'c89b53af-87cf-4da0-b151-9b3c7bdaf1f5', gesture: 'show-right-5' },
        {
            id: '8d87a747-16d9-4d8e-a3c0-2325b3722fa1',
            gesture: 'show-right-up-down',
        },
        {
            id: '7bb30281-d6df-452d-a1e1-6bc0b0e0bab1',
            gesture: 'shrug-ones-shoulders',
        },
        { id: '92018c0f-31db-49a7-8d66-e3502db57457', gesture: 'silence' },
        {
            id: '39a75416-92fe-4937-b068-35b783eff870',
            gesture: 'slide-from-left-to-right',
        },
        {
            id: 'b9158f84-c908-4226-bbb3-3b5a4138bbf5',
            gesture: 'slide-from-right-to-left',
        },
        {
            id: 'db592ee1-c1c9-4410-9a49-51027ffdcc86',
            gesture: 'slide-to-the-left',
        },
        { id: '148078fe-6c20-42ff-b345-0f930997cbbe', gesture: 'spread-hands' },
        { id: '46cb9e03-0af3-4cc9-a505-08724725c58d', gesture: 'thanks' },
        { id: '705bee7b-a68f-4f20-ba70-60750ba9bef3', gesture: 'the-front' },
        {
            id: '6c775273-6439-46ad-9581-8b17fa3f0cc4',
            gesture: 'think-twice-1',
        },
        {
            id: '719f2517-cfc9-45e5-b180-83e44da981c6',
            gesture: 'top-middle-and-bottom-left',
        },
        {
            id: 'cd59295a-5d59-44f9-9c07-3664f381898e',
            gesture: 'top-middle-and-bottom-right',
        },
        {
            id: '9709fad1-94cd-42f5-8b7c-eae7ec9d4359',
            gesture: 'thumbsup-left',
        },
        {
            id: '6ad24cd7-3de1-4578-8b16-4a5140fb1d25',
            gesture: 'thumbsup-left-1',
        },
        { id: '8127ece0-072e-4980-a3c9-c914faec10c2', gesture: 'upper-left' },
        { id: 'c4309d68-a634-4a66-abd1-2ec45b3a7c98', gesture: 'upper-right' },
        { id: 'c5bd1509-405d-49f9-8207-13e9fc7079dd', gesture: 'very-good' },
        { id: '51bff464-5eba-4380-858f-f1ff5696dd92', gesture: 'wave-left-1' },
        { id: '65e04d84-9ed9-4456-a3d9-8b0abac3ce23', gesture: 'wave-left-2' },
        { id: 'e6136c8a-fba6-403d-b477-cb9307018f63', gesture: 'welcome' },
    ]);
}

async function down(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
}

export { down, up };
