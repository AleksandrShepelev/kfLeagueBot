const config = require('../config');
const logger = require('../config/logger');
const MongoConnector = require('../db/mongo');
const Deck = require('../db/deck');

const main = async () => {
    await new MongoConnector(config, logger).connectToMongo();

    await Deck.deleteMany({});

    await Deck.insertMany([
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
            name: "Iridescence “Tramp” Daredet",
            url: "https://decksofkeyforge.com/decks/6ae81a09-d408-4b40-b9f3-79a3920810ee",
        },
        {
            username: "dr_gluck",
            name: "Юный хакер Фредди",
            url: "https://decksofkeyforge.com/decks/9702d42d-13e0-43a6-a804-c60999d819a3",
        },

        {
            username: "TwoCorbies",
            name: "“Mister Big”, Sourcière de Firstover",
            url: "https://decksofkeyforge.com/decks/73882a50-72c3-4a2f-a4fc-749c0148e45a",
        }, {
            username: "TwoCorbies",
            name: "The Hunter that Audits Clubs",
            url: "https://decksofkeyforge.com/decks/e50a1b5e-0c81-4852-983f-4b6a9327f7a4",
        },
        {
            username: "TwoCorbies",
            name: "K. Dargor, Scaleview's Automatic Guru",
            url: "https://decksofkeyforge.com/decks/88af4289-b2ac-4931-9a68-bd999f0a63e6",
        },
        {
            username: "TwoCorbies",
            name: "K. Thorn, the Crypt Turncoat",
            url: "https://decksofkeyforge.com/decks/5a143b74-3460-4fd9-aa73-7a6742dc293b",
        },
        {
            username: "TwoCorbies",
            name: "The Stone Rogue of Devilton",
            url: "https://decksofkeyforge.com/decks/2c865a00-af3b-4c10-8aad-1aa7b9abc8a2",
        },

        {
            username: "a_s_shepelev",
            name: "The Hierophant that Shatters Epic Poems",
            url: "https://decksofkeyforge.com/decks/638f0ce4-c388-45cd-84b7-8e7b519f31d6",
        },
        {
            username: "a_s_shepelev",
            name: "Father Y. Torvaral",
            url: "https://decksofkeyforge.com/decks/7b1cd39f-6937-4933-ba07-f8cd4530d9ea",
        },
        {
            username: "a_s_shepelev",
            name: "Darachess, the Irregular Harbor Citizen",
            url: "https://decksofkeyforge.com/decks/d0d22f74-c174-4a11-91cd-da83f37b4361",
        },
        {
            username: "a_s_shepelev",
            name: "Omega, Flowerrealm Mother",
            url: "https://decksofkeyforge.com/decks/70050b26-bcfa-4d87-a497-9048a7e3158b",
        },
        {
            username: "a_s_shepelev",
            name: "Ming the Privately Opinionated",
            url: "https://decksofkeyforge.com/decks/79c1c24b-ca34-4073-80f5-43cfc31525b8",
        },

        {
            username: "AzamatValeev",
            name: "Downoid, the Dragon of The Empire",
            url: "https://decksofkeyforge.com/decks/9d2b6d9f-fd31-4e7a-ac39-507676c8e8d0",
        },
        {
            username: "AzamatValeev",
            name: "Frostattack, Repository Desperado",
            url: "https://decksofkeyforge.com/decks/3601f002-03b7-4675-a7f2-cf943534b5c1",
        },
        {
            username: "AzamatValeev",
            name: "Quenby, Duelist of the Riskless Cabin",
            url: "https://decksofkeyforge.com/decks/50c6ee47-4bd0-4f26-938c-1880d31196e3",
        },
        {
            username: "AzamatValeev",
            name: "Disinticanic, the Infiltrator Rogue",
            url: "https://decksofkeyforge.com/decks/334bdfd6-7018-4cc0-b3ed-76b138580df1",
        },
        {
            username: "AzamatValeev",
            name: "Ximan “Champion Dexter” Einstein",
            url: "https://decksofkeyforge.com/decks/f15de3a5-cf00-4400-b785-b25aed9f098b",
        },

        {
            username: "SlimSlamSnaga",
            name: "“Lion” X, Town Square Turncoat",
            url: "https://decksofkeyforge.com/decks/72fa62d3-5c80-4795-8654-c5b689bebec4",
        },
        {
            username: "SlimSlamSnaga",
            name: "Hungerblaze, the Elder of Humanity",
            url: "https://decksofkeyforge.com/decks/c20dc483-8b8a-415b-b305-fed2d37e8d5e",
        },
        {
            username: "SlimSlamSnaga",
            name: "https://decksofkeyforge.com/decks/e974c0aa-12e0-45f4-9df9-36ff20eeed76",
            url: "Honorable “Chaucer” Oppenheimer",
        },
        {
            username: "SlimSlamSnaga",
            name: "Drekring, the Gangleader of Innocence",
            url: "https://decksofkeyforge.com/decks/ee650fbb-d76c-4aa9-89e1-17ba5cca2936",
        },
        {
            username: "SlimSlamSnaga",
            name: "Payton Bottomink from the Critic’s Cabin",
            url: "https://decksofkeyforge.com/decks/dac7a436-9dec-4427-a643-6cc31854edb7",
        },
        {
            username: "korzhikspb",
            name: "Жрица Ван Хорн",
            url: "https://decksofkeyforge.com/decks/e7dcf558-6ec4-4568-bb93-2e53950c8067",
        },
        {
            username: "korzhikspb",
            name: "Cryshart, the Ripper of The Abyss",
            url: "https://decksofkeyforge.com/decks/ad3aebf2-c188-4861-b972-451b1bb6a31e",
        }, {
            username: "korzhikspb",
            name: "Fecksly, the Investigator of Poison",
            url: "https://decksofkeyforge.com/decks/1af897f7-1e3b-46a9-ac64-a47477fecea3",
        },
        {
            username: "korzhikspb",
            name: "Charline, the Mayor of Hegemony",
            url: "https://decksofkeyforge.com/decks/f2eb595f-a4ad-4e53-ad78-918116405502",
        },
        {
            username: "korzhikspb",
            name: "Danjuma the Grey",
            url: "https://decksofkeyforge.com/decks/d0a77de8-d9db-4c7c-92c6-2f93d0bf5cfc",
        },
        {
            username: "superalek",
            name: "Nanodath of the Warlock’s Gateway",
            url: "https://decksofkeyforge.com/decks/eb30b607-8c4a-4fc8-ba28-b906367a3e0d",
        }, {
            username: "superalek",
            name: "Disproportionately Burning Octavio",
            url: "https://decksofkeyforge.com/decks/e7eb2ef3-4d90-4304-97fe-aa326bdfe2bb",
        },
        {
            username: "superalek",
            name: "Mr. U. Echocard",
            url: "https://decksofkeyforge.com/decks/614797ec-bd75-4248-9ebf-e3f7a66e25a9",
        },
        {
            username: "superalek",
            name: "Д. Сноу, Кровавый бандит",
            url: "https://decksofkeyforge.com/decks/a28cbb4f-8d5c-472e-93d5-d098d9713311",
        }, {
            username: "superalek",
            name: "Harmony “Sgt. Crusher” Kingston",
            url: "https://decksofkeyforge.com/decks/7580aa31-da0c-46ea-a29d-d997866d7cb8",
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