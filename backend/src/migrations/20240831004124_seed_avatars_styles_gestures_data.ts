import { type Knex } from 'knex';

const TABLE_NAME = 'avatars_styles_gestures';

const avatars_styles = {
    harryBusiness: '31d92ae7-b778-4fa1-b21a-2669f2269c1d',
    harryCasual: '39636998-3fb0-405c-81a0-0f7e9cce4433',
    harryYouthful: 'e1c0832b-842f-4321-bd14-89a03b89e2fd',
    jeffBusiness: '105bb25d-5fa5-436d-b841-bc5e94ad12b2',
    jeffFormal: '5163e793-fb1d-4f87-8648-ea1a1563e6d0',
    lisaCasualSitting: '8e6cd9df-31cb-47aa-b167-361283732db8',
    lisaGracefulSitting: '8ad9c1a4-7845-4889-a3f8-79bb3abb9642',
    lisaGracefulStanding: 'a6e42c42-b098-490f-95b6-07c8402c636d',
    lisaTechnicalSitting: 'd8034a65-7fe8-48ef-9e76-237b462ef5bb',
    lisaTechnicalStanding: 'f05aee3d-c76e-4a3d-b4c4-ca9d777f8de6',
    loriCasual: '061418b3-9316-4e2e-ab62-78633be47f15',
    loriGraceful: '40bde735-8ce4-42a7-a0f8-a90a3d584de8',
    loriFormal: 'e310a316-e4ac-404f-bff2-76efaf247ec9',
    maxBusiness: 'f24c1d23-db5c-4da3-8a34-8492d9ceb313',
    maxCasual: '4953696e-cc3f-4d89-a2a0-7d01bf875779',
    maxFormal: '31515e5e-dddf-4b87-887d-45eedc8aab67',
    megFormal: '084e2e1b-099a-4c4c-aa99-ab507d698bad',
    megCasual: '93a4f900-4653-4782-95bf-e2a6d3804130',
    megBusiness: '3dd729eb-cfa5-46f4-a084-91b4d0b324cb',
};

const gestures = {
    g123: '258ead12-cdea-4766-b4fe-797d951646a5',
    g123Left: '5fcb1e9e-3f7f-4f44-b579-b1ac03a48934',
    aLittle: '9a18aded-a642-4186-8fea-3b82fcc0e350',
    aLittleBit: 'ffc7f886-e53d-4701-b251-f6f15c78d839',
    applaud: '68541e7b-70fd-4add-94b8-0013042d8ef2',
    beg: '0dc27fde-827a-4410-8fed-6a1c5aec1cb8',
    calmDown: '6a0e0bb8-e797-4606-b513-18ea4a2a4d4e',
    clickTheLink: '4b63454f-b78c-42d9-9759-250485731f94',
    comeOn: '5628b8a4-d6d0-434f-95bc-e631415842b0',
    comeOnLeft: '2d91986f-143a-4cc2-bbf7-c57684c9bfde',
    crossHand: 'ed345366-d1da-48f7-b0de-ca8ffe95fc00',
    displayNumber: '8faaa327-2f80-48ea-92f4-b8406bcc98ce',
    down: '16c45cf7-05ea-44c8-ab53-0bf3164eca5b',
    encourage1: '2126d189-af40-479a-85b1-d990d5c572a8',
    encourage2: '88448c74-415c-4030-96ac-534475b79bff',
    fiveStar: 'ca3aa7a3-442c-45f1-9d0d-2624b77c70ea',
    fiveStarPraise: '11f7d906-e8c5-4df6-ae14-83fdeed0997b',
    fiveStarReviews: '0b65ebb7-5485-4b79-a305-b692e2016c72',
    frontLeft: 'f9d00675-c6ec-4f07-88aa-1dc57ee54d4f',
    frontRight: '95925b6c-6f7e-4c4a-bc24-f8cf2d171e85',
    good: 'e2736ad4-80da-4b98-91a2-bf603f3e9051',
    good01: '4d4c8ebc-5a54-45a9-900e-6f9e5601ec69',
    good02: '33e22ddd-fd79-4273-a9d3-035fd165291c',
    good1: 'c68873ae-bbff-4960-9e1d-d725c4244beb',
    good2: '72788735-73b9-46b2-a0ce-cdf9adc8ab04',
    gongXiFaCai: '5dd708f7-6b3d-4dd6-98e1-6b0fb1de7558',
    handsForward: '8825e371-93ba-4e0a-9940-43d17a68f8db',
    handsTriangle: 'f9e7419a-065c-4ef6-a5dd-fc857fa90a6a',
    handsUp: '43cd1978-3260-4e5b-9e47-25048dcc227c',
    handclap: '34b1b6da-3048-4506-89b4-3b1e1dd0ad40',
    happyNewYear: 'c9e2cbd1-73bd-43d6-832e-6527791ce3a8',
    hello: 'fe513639-c6a8-44c8-9333-127e5fb009e8',
    here: '9cb2a135-a7d7-433c-94cb-57e981d21a93',
    hi: '6c0eb8ab-d210-467b-8fb9-061a6291ef35',
    hopeful: '6a964e9e-5e43-49ae-a933-c6cf6c77b152',
    introduce: 'aa3bd5dd-031a-42de-b8ad-d38ffe984882',
    introductionToProducts1: 'b2b1d661-3ced-4b8e-a1dd-75f60b84a6e4',
    introductionToProducts2: '3ee9daaa-dc6a-46a1-b084-8293a20ff664',
    introductionToProducts3: '4b6659e1-c034-4fc7-a28c-f5042cf29d53',
    introductionToProducts4: '75d3778f-6c28-410a-a14a-ff82e16e60f1',
    invite: 'c4b75991-8b93-49fb-9f73-3dd44f817436',
    left: 'ba134f68-00ac-4826-8c73-116011571c21',
    length: '5bdb9680-6bc1-4b9f-8930-014b6c011bcd',
    lift: '461bb39f-1f72-40f4-8fc8-90a4db644aa5',
    lowerLeft: '41108e5f-330c-416d-b354-0a51d7845ee6',
    lowerRight: '2adc455b-8cf9-4e48-91b5-1bd4334c1ce4',
    meddle: '23b96af3-fd08-4675-9a4a-eb43283ed38a',
    nod: 'ef60bcbb-842d-482e-a4ff-cc5cc9e9041b',
    nodding: 'f82c451e-1e66-4841-9f5c-ca182be0a9d3',
    numberOne: '7baff586-6a91-416e-9902-e1529737ce69',
    numeric1Left1: '25c3870e-7baf-477d-8092-24751df13092',
    numeric2Left1: 'e0446f0e-d300-4bbd-ab07-c681a044d377',
    numeric3Left1: 'dda0aa54-ef36-4177-9bb6-23832f3bc251',
    open: '2280d7f5-691c-49f6-bc38-177826340ff0',
    please: '0494b8f3-d42b-4a99-9e86-ecfb567ba262',
    please2: '5d7f2a10-f57c-43ef-8fb3-0f76baef9eeb',
    pointLeft1: '1af45fac-40bf-43a6-bef4-e9377adf98d4',
    pointLeft2: '2b09dd3b-bb48-46b9-8d37-2846117e5b80',
    pointLeft3: '41b771eb-099e-4b68-b579-e276736d5734',
    pointLeft4: '64b4e203-5790-4e76-8e88-f9c5b1bb8aef',
    pointLeft5: 'd8c4fad1-5614-4bb2-8829-855f36339d1a',
    pointLeft6: '405a2a66-197a-434a-ab77-8121c043863b',
    pointRight1: 'bf914857-3edb-4d48-b703-c0fea5f5c139',
    pointRight2: '202599ff-dc1a-4568-9316-ce6c41df0101',
    pointRight3: '2e7e8743-4535-474a-8592-528ebfa8d504',
    pointRight4: 'df1bbca2-8b1f-4d7a-9d5a-25a3d396dfa7',
    pointRight5: 'fcb43b2a-1b17-4e9f-ab37-af43915b045e',
    pointRight6: 'c6e2e981-45e6-46f8-8be0-a4dfd7b0e3f8',
    pressBothHandsDown: 'efd9bb85-1698-4c55-91c5-9958d62eb9e5',
    pressBothHandsDown1: '6ecf8a36-1620-43d7-bab4-bf63e5f6821c',
    pressBothHandsDown2: 'c884cc4b-cc87-4a83-9de6-f5c83a7be094',
    pushForward: 'aacd28bc-3c61-442a-8188-c67f0f86ec74',
    raiseOnesHand: '1bddc452-890e-48d2-af7e-d0528ffbd5d1',
    right: 'd6860b9b-9986-4746-976d-314ec6887ae0',
    rightFront: '7e785162-52c3-4c3c-8ad1-45f27dda4c27',
    sayHi: 'b3f1f60f-40d6-4346-a9cb-e4cd4a61c26d',
    show: '269aaaec-556a-419c-aa26-179fb4d51832',
    showFront1: '35c13cd2-5700-4994-8a15-779248c00a8e',
    showFront2: '74ce34dd-ae43-4db3-81d0-a4eb4d05aab4',
    showFront3: '3c96bfdb-ce6f-4cd8-9592-cfd9d8adbeb9',
    showFront4: 'e3cd4fc1-432b-4d86-8ffc-ae48620b1188',
    showFront5: 'd5bbbfae-bb05-4da9-a227-7709712c9eca',
    showFront6: 'aabcc3d3-8d8c-4670-880e-fb2ad4901956',
    showFront7: '7398ee92-ccd1-4919-a688-0f5a3273f78e',
    showFront8: '88b36ae1-6565-4f71-ad0c-e137f71e30c6',
    showFront9: 'da01dc71-3d3e-4623-9752-36525872cf2a',
    showLeft: '0e588cbf-9dbd-4818-ae2c-b9a2388cec9a',
    showLeft1: '1513e707-63d6-451c-88d1-73d2a008db8f',
    showLeft2: '05d64bee-a04f-4f1d-82b1-79d8e09b2ba3',
    showLeft3: 'e24c5233-c7a6-4fc9-994c-57b191b8ee8f',
    showLeft4: 'a7d1fea9-2236-42cf-bfef-9c7dbde1246c',
    showLeft5: 'bb455fc1-254c-4c2b-b203-270f25bf9afb',
    showRight: '667eeecc-4cb9-484f-a912-3b0dbc6f0747',
    showRight1: '0f71fa32-66ba-41a2-b4f8-65bfe6d13c3c',
    showRight2: '925b88db-8ecf-4134-a575-58d92385c0ce',
    showRight3: 'e78fdfb4-2244-46f7-8a6d-d7557bb900d0',
    showRight4: '269ae112-01d5-44c7-979f-1b904b942c21',
    showRight5: 'c89b53af-87cf-4da0-b151-9b3c7bdaf1f5',
    showRightUpDown: '8d87a747-16d9-4d8e-a3c0-2325b3722fa1',
    shrugOnesShoulders: '7bb30281-d6df-452d-a1e1-6bc0b0e0bab1',
    silence: '92018c0f-31db-49a7-8d66-e3502db57457',
    slideFromLeftToRight: '39a75416-92fe-4937-b068-35b783eff870',
    slideFromRightToLeft: 'b9158f84-c908-4226-bbb3-3b5a4138bbf5',
    slideToTheLeft: 'db592ee1-c1c9-4410-9a49-51027ffdcc86',
    spreadHands: '148078fe-6c20-42ff-b345-0f930997cbbe',
    thanks: '46cb9e03-0af3-4cc9-a505-08724725c58d',
    theFront: '705bee7b-a68f-4f20-ba70-60750ba9bef3',
    thinkTwice1: '6c775273-6439-46ad-9581-8b17fa3f0cc4',
    topMiddleAndBottomLeft: '719f2517-cfc9-45e5-b180-83e44da981c6',
    topMiddleAndBottomRight: 'cd59295a-5d59-44f9-9c07-3664f381898e',
    thumbsupLeft: '9709fad1-94cd-42f5-8b7c-eae7ec9d4359',
    thumbsupLeft1: '6ad24cd7-3de1-4578-8b16-4a5140fb1d25',
    upperLeft: '8127ece0-072e-4980-a3c9-c914faec10c2',
    upperRight: 'c4309d68-a634-4a66-abd1-2ec45b3a7c98',
    veryGood: 'c5bd1509-405d-49f9-8207-13e9fc7079dd',
    waveLeft1: '51bff464-5eba-4380-858f-f1ff5696dd92',
    waveLeft2: '65e04d84-9ed9-4456-a3d9-8b0abac3ce23',
    welcome: 'e6136c8a-fba6-403d-b477-cb9307018f63',
};

async function up(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).insert([
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.calmDown,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.fiveStarReviews,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.good,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.hello,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.introduce,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.invite,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.harryBusiness,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.fiveStarReviews,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.gongXiFaCai,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.good,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.happyNewYear,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.hello,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.please,
        },
        {
            avatar_style_id: avatars_styles.harryCasual,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.down,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.fiveStar,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.good,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.hello,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.invite,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.showRightUpDown,
        },
        {
            avatar_style_id: avatars_styles.harryYouthful,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.fiveStarReviews,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.handsUp,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.here,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.meddle,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.please2,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.show,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.silence,
        },
        {
            avatar_style_id: avatars_styles.jeffBusiness,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.fiveStarReviews,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.lift,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.please,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.silence,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.jeffFormal,
            gesture_id: gestures.veryGood,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.numeric1Left1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.numeric2Left1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.numeric3Left1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.thumbsupLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront2,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront3,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront4,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront5,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.thinkTwice1,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront6,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront7,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront8,
        },
        {
            avatar_style_id: avatars_styles.lisaCasualSitting,
            gesture_id: gestures.showFront9,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.waveLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.waveLeft2,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.thumbsupLeft,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showLeft2,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showLeft3,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showLeft4,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showLeft5,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showRight1,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showRight2,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showRight3,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showRight4,
        },
        {
            avatar_style_id: avatars_styles.lisaGracefulSitting,
            gesture_id: gestures.showRight5,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.waveLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.waveLeft2,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.showLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.showLeft2,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft1,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft2,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft3,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft4,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft5,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointLeft6,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.showRight1,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.showRight2,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.showRight3,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight1,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight2,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight3,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight4,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight5,
        },
        {
            avatar_style_id: avatars_styles.lisaTechnicalSitting,
            gesture_id: gestures.pointRight6,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.g123Left,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.aLittle,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.beg,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.calmDown,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.fiveStarReviews,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.good,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.hello,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.open,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.please,
        },
        {
            avatar_style_id: avatars_styles.loriCasual,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.g123Left,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.applaud,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.introduce,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.nod,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.please,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.showLeft,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.showRight,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.loriGraceful,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.g123,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.comeOn,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.comeOnLeft,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.down,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.fiveStar,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.good,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.handsTriangle,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.handsUp,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.hi,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.hopeful,
        },
        {
            avatar_style_id: avatars_styles.loriFormal,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.clickTheLink,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.displayNumber,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.frontRight,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.good01,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.good02,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.lowerLeft,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.numberOne,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.pressBothHandsDown1,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.pressBothHandsDown2,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.pushForward,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.raiseOnesHand,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.sayHi,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.slideFromLeftToRight,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.slideToTheLeft,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.topMiddleAndBottomLeft,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.topMiddleAndBottomRight,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.upperLeft,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.upperRight,
        },
        {
            avatar_style_id: avatars_styles.maxBusiness,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.applaud,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.clickTheLink,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.displayNumber,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.frontLeft,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.good1,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.good2,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.hello,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.introductionToProducts4,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.length,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.nodding,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.numberOne,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.pressBothHandsDown,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.raiseOnesHand,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.rightFront,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.slideFromLeftToRight,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.slideToTheLeft,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.upperLeft,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.upperRight,
        },
        {
            avatar_style_id: avatars_styles.maxCasual,
            gesture_id: gestures.welcome,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.clickTheLink,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.displayNumber,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.frontLeft,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.frontRight,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.good1,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.good2,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.lowerLeft,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.lowerRight,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.pressBothHandsDown,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.pushForward,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.sayHi,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.slideFromLeftToRight,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.slideToTheLeft,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.topMiddleAndBottomRight,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.upperLeft,
        },
        {
            avatar_style_id: avatars_styles.maxFormal,
            gesture_id: gestures.upperRight,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.clickTheLink,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.displayNumber,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.frontLeft,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.frontRight,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.good1,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.good2,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.handsForward,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.numberOne,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.pressBothHandsDown1,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.pressBothHandsDown2,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.sayHi,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.slideFromLeftToRight,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.upperLeft,
        },
        {
            avatar_style_id: avatars_styles.megFormal,
            gesture_id: gestures.upperRight,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.clickTheLink,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.crossHand,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.displayNumber,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.frontLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.frontRight,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.good1,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.good2,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.handclap,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.length,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.lowerLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.lowerRight,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.numberOne,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.pressBothHandsDown,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.sayHi,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.slideFromRightToLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.slideToTheLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.spreadHands,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.topMiddleAndBottomLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.topMiddleAndBottomRight,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.upperLeft,
        },
        {
            avatar_style_id: avatars_styles.megCasual,
            gesture_id: gestures.upperRight,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.aLittleBit,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.encourage1,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.encourage2,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.fiveStarPraise,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.frontLeft,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.frontRight,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.good1,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.good2,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.introductionToProducts1,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.introductionToProducts2,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.introductionToProducts3,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.left,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.length,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.numberOne,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.pressBothHandsDown1,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.pressBothHandsDown2,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.raiseOnesHand,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.right,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.sayHi,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.shrugOnesShoulders,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.slideFromLeftToRight,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.slideToTheLeft,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.spreadHands,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.thanks,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.theFront,
        },
        {
            avatar_style_id: avatars_styles.megBusiness,
            gesture_id: gestures.upperLeft,
        },
    ]);
}

async function down(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();
}

export { down, up };
