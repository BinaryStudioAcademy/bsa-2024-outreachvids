const videoOrientation = {
    LANDSCAPE: 'landscape',
    PORTRAIT: 'portrait',
};

const templatesSeed = [
    {
        name: 'Landscape with Max',
        user_id: null,
        preview_url:
            'https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352836443.jpg',
        composition: {
            scenes: [
                {
                    id: 'cc343716-c871-4f84-a136-73e66d2b0c18',
                    avatar: {
                        id: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5',
                        name: 'Max',
                        style: 'business',
                        url: 'https://speech.microsoft.com/assets/avatar/max/max-business-thumbnail.png',
                    },
                    background: {
                        url: 'https://d2tm5q3cg1nlwf.cloudfront.net/wall.jpg',
                    },
                    duration: 15,
                },
            ],
            scripts: [
                {
                    id: 'ca14d294-5cf0-47e0-9587-66b8ca80dfb0',
                    text: 'Hello, this is our template that uses the avatar Max. Enjoy your video editing!',
                    voiceName: 'en-US-BrianMultilingualNeural',
                    duration: 10,
                },
            ],
            videoOrientation: videoOrientation.LANDSCAPE,
        },
    },
    {
        name: 'Portrait with Lori',
        user_id: null,
        preview_url:
            'https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352905018.jpg',
        composition: {
            scenes: [
                {
                    id: '3e3053c3-2d22-4558-9799-3356a7936c97',
                    avatar: {
                        id: '94b9d9ca-f573-47b0-92e9-133aaa5026a6',
                        name: 'lori',
                        style: 'casual',
                        url: 'https://speech.microsoft.com/assets/avatar/lori/lori-casual-thumbnail.png',
                    },
                    background: {
                        color: '#FFE9D0',
                    },
                    duration: 15,
                },
            ],
            scripts: [
                {
                    id: '48607983-b9f1-4116-955c-097cd7f89354',
                    text: 'Hello, my name is Lori. I will help you create the best video you want!',
                    voiceName: 'en-CA-ClaraNeural',
                    duration: 10,
                },
            ],
            videoOrientation: videoOrientation.PORTRAIT,
        },
    },
    {
        name: 'Landscape with Harry and Max',
        user_id: null,
        preview_url:
            'https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727352956648.jpg',
        composition: {
            scenes: [
                {
                    id: '9ac8341a-987a-43ab-8784-2909e0a30653',
                    avatar: {
                        id: 'b58f9707-e4a4-49fc-8270-5984e70deb70',
                        name: 'harry',
                        style: 'casual',
                        url: 'https://speech.microsoft.com/assets/avatar/harry/harry-casual-thumbnail.png',
                    },
                    background: {
                        url: 'https://d2tm5q3cg1nlwf.cloudfront.net/city.webp',
                    },
                    duration: 27,
                },
                {
                    id: '6da6a0e4-61d6-4501-aab2-efab2cb19adf',
                    avatar: {
                        id: 'f65c41d0-dd51-4623-a4a6-8ec7e10a2ed5',
                        name: 'max',
                        style: 'formal',
                        url: 'https://speech.microsoft.com/assets/avatar/max/max-formal-thumbnail.png',
                    },
                    background: {
                        url: 'https://d2tm5q3cg1nlwf.cloudfront.net/city.webp',
                    },
                    duration: 22,
                },
            ],
            scripts: [
                {
                    id: '44f0a107-ed62-4b7b-ab20-d6fc6d991af9',
                    text: 'Nestled between rolling hills, the city gleams under the golden sunlight. Its cobblestone streets wind gracefully through vibrant squares and open plazas, where the sound of laughter and conversation fills the air. Elegant buildings, with their terracotta roofs and sun-warmed stone facades, line the streets. Flower boxes overflowing with bright blooms adorn the windows, and vines creep gently up the walls, adding touches of green to the warm tones of the city.',
                    voiceName: 'en-AU-DuncanNeural',
                    duration: 27.3875,
                },
                {
                    id: 'c3357306-b77d-4e6b-9348-e59a76ddb6f7',
                    text: 'Surrounding the city is a breathtaking landscape of lush, green meadows and gentle hills. The countryside is dotted with fields of wildflowers, their colors painting the horizon in hues of violet, yellow, and red. The air is fresh, carrying the sweet fragrance of blooming lavender and the earthy scent of pine from the distant woods.',
                    voiceName: 'en-US-BrianMultilingualNeural',
                    duration: 21.375,
                },
            ],
            videoOrientation: videoOrientation.LANDSCAPE,
        },
    },
    {
        name: 'Portrait with Lisa',
        user_id: null,
        preview_url:
            'https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727353044738.jpg',
        composition: {
            scenes: [
                {
                    id: '097791b0-081e-40b5-95c5-e89d090111e3',
                    avatar: {
                        id: '4038faa8-172e-4616-a16d-79dc004103ff',
                        name: 'lisa',
                        style: 'casual-sitting',
                        url: 'https://speech.microsoft.com/assets/avatar/lisa/lisa-casual-sitting-thumbnail.png',
                    },
                    background: {
                        url: 'https://d2tm5q3cg1nlwf.cloudfront.net/library.jfif',
                    },
                    duration: 12,
                },
            ],
            scripts: [
                {
                    id: 'ad8bf2b5-f969-4ea6-b57e-901459c4e10e',
                    text: 'The library is a quiet haven, filled with towering shelves that hold books of every kind. Sunlight pours through large windows, casting a soft glow over the cozy reading corners. The scent of aged paper and polished wood fills the air, inviting visitors to explore the endless knowledge and stories within. It is a peaceful place where time slows, and curiosity thrives.',
                    voiceName: 'en-AU-AnnetteNeural',
                    duration: 23.2,
                },
            ],
            videoOrientation: videoOrientation.PORTRAIT,
        },
    },
    {
        name: 'Landscape with Jeff',
        user_id: null,
        preview_url:
            'https://d2tm5q3cg1nlwf.cloudfront.net/preview_1727353097406.jpg',
        composition: {
            scenes: [
                {
                    id: '64b668ca-2d81-49c1-bba4-29896227b366',
                    avatar: {
                        id: 'e531c2c9-e06b-40f8-9fda-7b4168f79640',
                        name: 'jeff',
                        style: 'formal',
                        url: 'https://speech.microsoft.com/assets/avatar/jeff/jeff-formal-thumbnail-bg.png',
                    },
                    background: {
                        color: '#91DDCF',
                    },
                    duration: 15,
                },
            ],
            scripts: [
                {
                    id: '2203984b-c461-4e3f-9569-d55f7a1d97ce',
                    text: 'Hello, my name is Jeff. With my help, you can create enjoyable videos.',
                    voiceName: 'en-GB-RyanNeural',
                    duration: 6.35,
                },
            ],
            videoOrientation: videoOrientation.LANDSCAPE,
        },
    },
];

export { templatesSeed };
