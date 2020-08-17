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
            name: "Plautius, the Abductor of Radiation",
            url: "https://decksofkeyforge.com/decks/657de1a4-0dd3-4a48-8e78-fc76016c8281",
        }, {
            username: "dr_gluck",
            name: "Следопыт Моралес",
            url: "https://decksofkeyforge.com/decks/d0fd650f-55e6-4374-8bc1-a1c9fe47ca86",
        },
        {
            username: "dr_gluck",
            name: "Мохнатая Шкура Адамс",
            url: "https://decksofkeyforge.com/decks/138e7d26-efba-4348-9a9f-659db0f7531e",
        },
        {
            username: "dr_gluck",
            name: "Forest Keeper Luna",
            url: "https://decksofkeyforge.com/decks/fb1b36ab-0f56-47d5-aea2-87a63a5daf9a",
        },
        {
            username: "dr_gluck",
            name: "Riona F. Marrowbad, the Second",
            url: "https://decksofkeyforge.com/decks/dd1b17fa-079b-4f68-86cb-c7ca2f621005",
        },

        {
            username: "TwoCorbies",
            name: "Плешивая Соня Симпсон",
            url: "https://decksofkeyforge.com/decks/e97eec27-ed45-4f10-be93-526785f26cff",
        }, {
            username: "TwoCorbies",
            name: "The Stone Rogue of Devilton",
            url: "https://decksofkeyforge.com/decks/2c865a00-af3b-4c10-8aad-1aa7b9abc8a2",
        },
        {
            username: "TwoCorbies",
            name: "Derigible of Browncot Lair",
            url: "https://decksofkeyforge.com/decks/a9229d5f-fa5c-4388-9450-4c8f9d5bec60",
        },
        {
            username: "TwoCorbies",
            name: "Синьора Гиббонс",
            url: "https://decksofkeyforge.com/decks/c86e4955-aa1c-4f75-85b2-d9399ac10cab",
        },
        {
            username: "TwoCorbies",
            name: "Navigator Oyama",
            url: "https://decksofkeyforge.com/decks/5d183b01-41ab-4a2e-825e-4a75c102a695",
        },
        {
            username: "a_s_shepelev",
            name: "Master “Spud” Maurya",
            url: "https://decksofkeyforge.com/decks/95b7bb29-c5d4-4504-9c5f-3851f78e63b6",
        },
        {
            username: "a_s_shepelev",
            name: "Newloser, Forest Lady",
            url: "https://decksofkeyforge.com/decks/46435981-f291-4bbc-9ae4-dad77411668b",
        },
        {
            username: "a_s_shepelev",
            url: "https://decksofkeyforge.com/decks/b420df26-79a4-4516-b810-e8f9b77e5511",
            name: "Stargazer, Causespring's Bailiff",
        },
        {
            username: "a_s_shepelev",
            url: "https://decksofkeyforge.com/decks/778669fd-06d7-4088-9eed-7a97461b431c",
            name: "I. Overson, Tilliness’s Aimless Midwife",
        },
        {
            username: "a_s_shepelev",
            url: "https://decksofkeyforge.com/decks/ad98be2f-009f-4f54-ac88-aaf4b8065bf2",
            name: "“Rubacuori”, Delegato di Sonnobrullo",
        },
        {
            username: "AzamatValeev",
            name: "Normando D. Atphon, the Ninth",
            url: "https://decksofkeyforge.com/decks/59918b8c-1adc-4670-bc71-efb9fb4280fc",
        },
        {
            username: "AzamatValeev",
            name: "Владычица Бабай",
            url: "https://decksofkeyforge.com/decks/e3e8411c-a85b-439c-bf03-48b2a888506c",
        },
        {
            username: "AzamatValeev",
            name: "Spc. A. Boroburst",
            url: "https://decksofkeyforge.com/decks/d746affb-ae5f-441c-a626-88c07532934a",
        },
        {
            username: "AzamatValeev",
            name: "Роботряс Вентура",
            url: "https://decksofkeyforge.com/decks/b0188a30-6a1e-4fa3-b4dc-64c44e325ab5",
        },
        {
            username: "AzamatValeev",
            name: "Napopress, the Fleet Arena Crook",
            url: "https://decksofkeyforge.com/decks/9a5fe596-6e2b-4560-87b3-8ef2b2ca65e6",
        },

        {
            username: "SlimSlamSnaga",
            name: "Zotspine, Mausoleum Rioter",
            url: "https://decksofkeyforge.com/decks/ffaae682-0917-4efe-a75f-b62bc7bd6909",
        },
        {
            username: "SlimSlamSnaga",
            name: "The Nightmarish Barrister of Vileville",
            url: "https://decksofkeyforge.com/decks/c102b739-362e-49fd-9371-3cd175677390",
        },
        {
            username: "SlimSlamSnaga",
            name: "Z. Hill, Lieutenant de l'Utopie des Bouffons",
            url: "https://decksofkeyforge.com/decks/c2883a53-4420-47dd-bcfc-3b22c42b7d89",
        },
        {
            username: "SlimSlamSnaga",
            name: "Chancellor Barcloud Dhiu",
            url: "https://decksofkeyforge.com/decks/ad07d6a0-282e-4486-82e5-db4c465a07d6",
        },
        {
            username: "SlimSlamSnaga",
            name: "V. Hill, Ziojerg's Obedient Companion",
            url: "https://decksofkeyforge.com/decks/e8fa7a88-f69b-460b-b038-c3485448dfb4",
        },
        {
            username: "korzhikspb",
            name: "Роза, маркиза из ларца",
            url: "https://decksofkeyforge.com/decks/4faf2b9b-eb64-44c1-af8f-1284ffbafe45",
        },
        {
            username: "korzhikspb",
            name: "Regiwojek, Cathedral Tracker",
            url: "https://decksofkeyforge.com/decks/b14e9f9b-1c7f-4ad9-bedc-749f15e0e21a",
        }, {
            username: "korzhikspb",
            name: "Drywyrm Rhodes, the Warded and Hungry",
            url: "https://decksofkeyforge.com/decks/eee9bc72-2b21-42e8-aa1f-a4d60ef87072",
        },
        {
            username: "korzhikspb",
            name: "Shrewdly Obtuse Buck",
            url: "https://decksofkeyforge.com/decks/4c995afa-4091-4d7a-b76f-a2a6e5a3062c",
        },
        {
            username: "korzhikspb",
            name: "Wealthy Frazier of the Stairwell",
            url: "https://decksofkeyforge.com/decks/6d576b0e-f162-4f1c-9f85-5f5ae9071da4",
        },
        {
            username: "superalek",
            name: "Discreetly Acrobatic Arjan",
            url: "https://decksofkeyforge.com/decks/e2ae72df-adb4-409b-931d-a1854f8e03dd",
        }, {
            username: "superalek",
            name: "Sword, Winterworld’s Harrier",
            url: "https://decksofkeyforge.com/decks/b9ad5a08-d081-4854-aebe-a33024a52bc0",
        },
        {
            username: "superalek",
            name: "Dr. Bexxonine Vandre",
            url: "https://decksofkeyforge.com/decks/06f88c79-f8a4-4499-aaf1-55daa536fe78",
        },
        {
            username: "superalek",
            name: "Everdemon, the Vizier Bookkeeper",
            url: "https://decksofkeyforge.com/decks/e2ae72df-adb4-409b-931d-a1854f8e03dd",
        }, {
            username: "superalek",
            name: "Fraujaz “Freya” Fjalarsson",
            url: "https://decksofkeyforge.com/decks/83853a4d-8ebe-4a1d-9080-06e8820bfbe8",
        },
        {
            username: "Elademri",
            name: "Хромой рыцарь Жюль",
            url: "https://decksofkeyforge.com/decks/7f6f0a5b-c4a2-47ba-a10c-b0a109dc60b4",
        }, {
            username: "Elademri",
            name: "Nagwood, the Ranger Acolyte",
            url: "https://decksofkeyforge.com/decks/39ec1924-596a-4a44-a3c1-81692af52440",
        },
        {
            username: "Elademri",
            name: "Нечестивый барон Рой",
            url: "https://decksofkeyforge.com/decks/ce2794a9-fd7c-40c2-be92-45a3c92aeab5",
        },
        {
            username: "Elademri",
            name: "Frostshank, Spawn of Dwarfna",
            url: "https://decksofkeyforge.com/decks/dee340cb-0d07-4a2e-973b-b4fdd0fc7aa3",
        }, {
            username: "Elademri",
            name: "Alexahurt, the Ratcatcher of Eagles",
            url: "https://decksofkeyforge.com/decks/c7a06631-cf2e-4c54-b8c2-310065a37ac8",
        },

    ])
};

main();
