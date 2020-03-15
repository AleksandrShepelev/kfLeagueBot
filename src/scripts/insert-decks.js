const config = require('../config');
const logger = require('../config/logger');
const MongoConnector = require('../db/mongo');
const Deck = require('../db/deck');

const main = async () => {
    await new MongoConnector(config, logger).connectToMongo();

    await Deck.deleteMany({});

    await Deck.insertMany([
        {
            username: "a_s_shepelev",
            name: "The Hierophant that Shatters Epic Poems",
            url: "https://decksofkeyforge.com/decks/638f0ce4-c388-45cd-84b7-8e7b519f31d6",
        },
        {
            username: "a_s_shepelev",
            name: "Boris \"Orphan Sunshine\" Lima",
            url: "https://decksofkeyforge.com/decks/6f92a206-9a14-48cf-82ad-c48847db643c",
        },
        {
            username: "a_s_shepelev",
            name: "Argonielia Murphey-Bird, Baker",
            url: "https://decksofkeyforge.com/decks/7ec07aff-8a0d-40fc-96f1-7b8025c8f59b",
        },
        {
            username: "a_s_shepelev",
            name: "The Naysayer that Cracks Evil",
            url: "https://decksofkeyforge.com/decks/7442ea15-d0ad-49f0-8cc4-8697c8fe910b",
        },
        {
            username: "a_s_shepelev",
            name: "Master “Spitfire” Viola",
            url: "https://decksofkeyforge.com/decks/e31f5d3f-0ced-4757-b621-8d4e9dca37ad",
        },
        {
            username: "a_s_shepelev",
            name: "Lima of Freehaven",
            url: "https://decksofkeyforge.com/decks/0f832e03-d239-4ce2-8aeb-663d62407b75",
        },
        {
            username: "a_s_shepelev",
            name: "Flashgrin, the “Earth Keeper” of Forgery",
            url: "https://decksofkeyforge.com/decks/5616c267-a251-4e17-aaab-ceb6fbd6ab81",
        },
        {
            username: "a_s_shepelev",
            name: "Obligrate, the “Padre” of Invention",
            url: "https://decksofkeyforge.com/decks/9cdd44a3-3a85-45a6-99f3-ba7bb33b5b20",
        },
        {
            username: "AzamatValeev",
            name: "Aurora, Wintermanse Adventurer",
            url: "https://decksofkeyforge.com/decks/17e2f5a2-836a-452c-b688-800b4c4fa23c",
        },
        {
            username: "AzamatValeev",
            name: "The Intently Aristocratic Luddite of Lintopia",
            url: "https://decksofkeyforge.com/decks/8fad799d-f132-4b2f-b657-9fa628ccf4ef",
        },
        {
            username: "AzamatValeev",
            name: "Wanderleer of the Researcher's Citadel",
            url: "https://decksofkeyforge.com/decks/989f6b86-ab0e-41db-ac8d-460c505f315c",
        },
        {
            username: "AzamatValeev",
            name: "Менестрель Гоголь",
            url: "https://decksofkeyforge.com/decks/21b4240d-2047-43f0-baf1-c3a578fffe38",
        },
        {
            username: "AzamatValeev",
            name: "Disinticanic, the Infiltrator Rogue",
            url: "https://decksofkeyforge.com/decks/334bdfd6-7018-4cc0-b3ed-76b138580df1",
        },

        {
            username: "AzamatValeev",
            name: "Mx. Troptoblade, the Feckless Alchemist",
            url: "https://decksofkeyforge.com/decks/358e3949-c0c8-4b30-aabb-05f5af6f62b9",
        },
        {
            username: "Elademri",
            name: "Griffey, Hipporoute Praefectus",
            url: "https://decksofkeyforge.com/decks/5a7ebdd8-1f87-4abd-9a6d-88a13ea758e5",
        },
        {
            username: "Elademri",
            name: "Imbrish the Simply Amethyst",
            url: "https://decksofkeyforge.com/decks/f43d54a9-e18c-4b9f-8a04-2f733daa1453",
        },
        {
            username: "Elademri",
            name: "Gravemistress, the “Dragon” of Business",
            url: "https://decksofkeyforge.com/decks/3c0b3b17-7aaa-4cd6-95aa-e2e9a6d9f45a",
        },
        {
            username: "Elademri",
            name: "The Ghost who Nearly Concocts Civilization",
            url: "https://decksofkeyforge.com/decks/776141ab-0d6e-41a5-a9f7-a18ca0d83c68",
        },
        {
            username: "Elademri",
            name: "Omega, Berserk Homestead Cavalier",
            url: "https://decksofkeyforge.com/decks/9e303cad-fb57-409c-8a0b-1b114b67b5ea",
        },
        {
            username: "Elademri",
            name: "Derigible the Hungrily Hostile",
            url: "https://decksofkeyforge.com/decks/90834eb2-4210-4d55-83ae-de4316bc4d6b",
        },
        {
            username: "SlimSlamSnaga",
            name: "Уильям М. по прозвищу Бес",
            url: "https://decksofkeyforge.com/decks/04dc294d-3b2d-4cbe-9c41-9cea07693c69",
        },
        {
            username: "SlimSlamSnaga",
            name: "Umberto, Conniving Tower Viceroy",
            url: "https://decksofkeyforge.com/decks/f9c5ec78-9ba2-4f9b-84d1-c9cdb55afaf8",
        },
        {
            username: "SlimSlamSnaga",
            name: "Nightmare Spritehammer Salkhi",
            url: "https://decksofkeyforge.com/decks/4438121c-81ff-4c74-8878-f2b23d56800f",
        },
        {
            username: "SlimSlamSnaga",
            name: "Губернатор Лодброк",
            url: "https://decksofkeyforge.com/decks/5b7a2c73-cec3-4eaa-9453-361c95d9a1c0",
        },
        {
            username: "SlimSlamSnaga",
            name: "Mother Bertram",
            url: "https://decksofkeyforge.com/decks/b62f1ec2-ba83-4c63-85ab-006cd54eb0f0",
        },
        {
            username: "SlimSlamSnaga",
            name: "Drekring, the Gangleader of Innocence",
            url: "https://decksofkeyforge.com/decks/ee650fbb-d76c-4aa9-89e1-17ba5cca2936",
        },
        {
            username: "SlimSlamSnaga",
            name: "Клирик Аберкромби",
            url: "https://decksofkeyforge.com/decks/b10d40f7-370e-4878-9306-216a073c7b0e",
        },
        {
            username: "dr_gluck",
            name: "Murkveil, the Minister Rogue",
            url: "https://decksofkeyforge.com/decks/2aeacefb-0873-4c5d-bfad-8983eb74f494",
        }, {
            username: "dr_gluck",
            name: "Ionflinch Walsh, the Mouthy and Molten",
            url: "https://decksofkeyforge.com/decks/10d6e36e-f5ec-49b7-80cc-1a9196553bbd",
        },
        {
            username: "dr_gluck",
            name: "Cultee, the Countess Count",
            url: "https://decksofkeyforge.com/decks/39cf78f8-7448-4d2c-83dd-242639981902",
        },
        {
            username: "dr_gluck",
            name: "Аферистка Макгрегор",
            url: "https://decksofkeyforge.com/decks/df4be04d-6f18-4745-b4cd-07623b7c5e62",
        },
        {
            username: "dr_gluck",
            name: "Iridescence “Tramp” Daredet",
            url: "https://decksofkeyforge.com/decks/6ae81a09-d408-4b40-b9f3-79a3920810ee",
        },
        {
            username: "dr_gluck",
            name: "Ksenia, Rzemieślniczka Azylu",
            url: "https://decksofkeyforge.com/decks/bfe6c6fd-6ade-495a-9672-b4a343e31023",
        },
        {
            username: "dr_gluck",
            name: "Юный хакер Фредди",
            url: "https://decksofkeyforge.com/decks/9702d42d-13e0-43a6-a804-c60999d819a3",
        },
        {
            username: "dr_gluck",
            name: "The Ayya of Runstock",
            url: "https://decksofkeyforge.com/decks/5645da99-1bab-4763-b13e-1d5915ecfb98",
        },
        {
            username: "korzhikspb",
            name: "McElligott, Caringmoon Canyon's Butcher",
            url: "https://decksofkeyforge.com/decks/1757860f-8ffb-436e-930e-74c8876d5c85",
        },
        {
            username: "korzhikspb",
            name: "Sire Firebane, the Ornate Buccaneer",
            url: "https://decksofkeyforge.com/decks/8e17ac4b-c271-4f6b-999e-dae446144c49",
        }, {
            username: "korzhikspb",
            name: "Грязная Стелла Эскобар",
            url: "https://decksofkeyforge.com/decks/ab07d3b1-4aeb-4edd-9838-a13f0932e422",
        },
        {
            username: "korzhikspb",
            name: "Everlasting Discoquill, the Aimless Spy",
            url: "https://decksofkeyforge.com/decks/0d4b4101-7645-4d42-83a2-480ff2a77c9b",
        },
        {
            username: "korzhikspb",
            name: "Nihilspore, the Officer Wastrel",
            url: "https://decksofkeyforge.com/decks/8505c633-da50-4695-9323-00d0adc3eb32",
        }, {
            username: "artem_chistyakov",
            name: "Morilyon of the Guardian’s Camp",
            url: "https://decksofkeyforge.com/decks/691a345e-a4c3-4a60-b60f-00c6df9d0772",
        },
        {
            username: "artem_chistyakov",
            name: "The Acolyte that Plants Helmets",
            url: "https://decksofkeyforge.com/decks/69f99bde-3f15-4912-a590-40f4790cebe1",
        },
        {
            username: "artem_chistyakov",
            name: "Woestar Blitz, the Uncouth and Honest",
            url: "https://decksofkeyforge.com/decks/81e13f0c-a1c4-4305-b390-dff10b9574bb",
        }, {
            username: "artem_chistyakov",
            name: "The Master of Hammerford",
            url: "https://decksofkeyforge.com/decks/8bef7985-d368-488b-b1a7-251bebf6ec43",
        },
        {
            username: "artem_chistyakov",
            name: "Adalius Onizog from the Gambler's Pub",
            url: "https://decksofkeyforge.com/decks/124f0e9c-439d-4f0d-baa4-21dd662dc5af",
        },
        {
            username: "artem_chistyakov",
            name: "Adair “Parsec” Metaherring",
            url: "https://decksofkeyforge.com/decks/ad4a4fb7-9bb4-4f18-b79e-e04f17a6357a",
        }, {
            username: "artem_chistyakov",
            name: "Priestess Diaz",
            url: "https://decksofkeyforge.com/decks/735b77a4-ec90-469f-ae4e-f4874488d4de",
        },
        {
            username: "artem_chistyakov",
            name: "Waverly, Warazan's Convict",
            url: "https://decksofkeyforge.com/decks/e2e24cab-28b0-4080-9203-35d53fb71d2e",
        },
        {
            username: "CocteauTwins",
            name: "Валет из гиблых топей",
            url: "https://decksofkeyforge.com/decks/eaedf297-abb3-471f-9380-9436008f651f",
        }, {
            username: "CocteauTwins",
            name: "Eccentric Beelzebub of the Orpheum",
            url: "https://decksofkeyforge.com/decks/882be792-f3c7-4f83-a08e-756dc97a4559",
        },
        {
            username: "CocteauTwins",
            name: "Luxa of Hydrobis Bay",
            url: "https://decksofkeyforge.com/decks/31f82615-bb62-408b-a18c-0b50ff38085b",
        },
        {
            username: "CocteauTwins",
            name: "Empress Octocan, the Spiky Worm",
            url: "https://decksofkeyforge.com/decks/e1a78df4-fb11-4ce6-a46f-3a25c1aeb54e",
        }, {
            username: "CocteauTwins",
            name: "Сутулая Бриджит Хаус",
            url: "https://decksofkeyforge.com/decks/65877b1c-fa18-454b-b0db-d59ca7509faf",
        },

    ])
};

main();