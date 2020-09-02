const simpleDeck = [
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},

    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},

    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},

];

const drawDeck = [
    {house: "Dis", amber: 1, draw: 1},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},
    {house: "Dis", amber: 1, draw: 0},

    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},
    {house: "Logos", amber: 1, draw: 0},

    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
    {house: "Shadows", amber: 1, draw: 0},
];

const refillHand = (hand, deck, discard, size) => {
    while ((hand.length < size) || (!deck.length && !discard.length)) {
        if (deck.length > 0) {
            const card = deck.pop();
            hand.push(card);
        } else if (discard.length > 0) {
            moveDiscardToDeck(deck, discard)
        }
    }

    return hand;
};

const moveDiscardToDeck = (deck, discard) => {
    while (discard.length) {
        deck.push(discard.pop());
    }
    shuffleDeck(deck);
};

const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

const chooseHouse = (hand) => {
    const housesValues = new Map();
    for (const card of hand) {
        const houseInfo = housesValues.get(card.house);
        if (houseInfo) {
            houseInfo.cards++;
            houseInfo.value += card.amber;
            houseInfo.value += card.draw * 0.5;
        } else {
            const newHouseInfo = {
                cards: 1,
                value: card.amber + card.draw * 0.5,
            };
            housesValues.set(card.house, newHouseInfo);
        }
    }
    //console.log(housesValues);
    let chosenHouse = '';
    let value = 0;
    for (const [house, info] of housesValues.entries()) {
        if (info.value > value) {
            chosenHouse = house;
            value = info.value;
        }
    }

    return chosenHouse;
};

const getCardsToPlay = (hand, house) => {
    const cardsToPlay = [];
    for (let i = hand.length-1; i>=0; i--) {
        const card = hand[i];
        if (card.house === house) {
            cardsToPlay.push(card);
            hand.splice(i, 1);
        }
    }

    return cardsToPlay;
};

const drawCardFromDeck = (deck, discard) => {
    if (deck.length) {
        return deck.pop();
    } else {
        moveDiscardToDeck(deck, discard);

        if (deck.length) {
            return deck.pop();
        } else {
            console.log("ACHTUNG");
            return null;
        }

    }
};

const runGame = (deck, turns) => {
    const hand = [];
    const discard = [];
    let amberGained = 0;
    let cardsPlayed = 0;

    shuffleDeck(deck);
    //console.log(deck);

    refillHand(hand, deck, discard, 6);

    //console.log(hand);

    for (let turn = 1; turn <= turns; turn++) {
        const activeHouse = chooseHouse(hand);

        //console.log(activeHouse);

        const cardsToPlay = getCardsToPlay(hand, activeHouse);

        //console.log(cardsToPlay);
        //console.log(hand);

        while (cardsToPlay.length > 0) {
            const card = cardsToPlay.pop();
            discard.push(card);
            amberGained += card.amber;

            if (card.draw) {
                const drawnCards = [];
                for (let cardNum = 1; cardNum <= card.draw; cardNum++) {
                    drawnCards.push(drawCardFromDeck(deck, discard));
                }

                for (const drawnCard of drawnCards) {
                    if (drawnCard.house === activeHouse) {
                        cardsToPlay.push(drawnCard);
                    } else {
                        hand.push(drawnCard);
                    }
                }
            }

            cardsPlayed++;
        }

        refillHand(hand, deck, discard, 6);
        //console.log(hand);
        //console.log(`turn ${turn}, cards in hand ${hand.length}, cards in deck ${deck.length}, cards in discard ${discard.length}`)

    }

    return {
        amberGained,
        cardsPlayed,
    };
};

const analyzeResults = (gameResults, turns) => {
    const totalResults = gameResults.length;
    let totalAmber = 0;
    let totalCards = 0;
    for (const result of gameResults) {
        totalAmber+=result.amberGained;
        totalCards+=result.cardsPlayed;
    }
    console.log(`average amber gained ${(totalAmber / totalResults).toFixed(2)}`);
    console.log(`average amber gained per turn ${(totalAmber / turns / totalResults).toFixed(2)}`);
    console.log(`average number of cards played ${(totalCards / totalResults).toFixed(2)}`);
    console.log(`average number of cards played per turn ${(totalCards / turns / totalResults).toFixed(2)}`);
};

const main = () => {
    const gameResults = [];
    const games = 2000000;
    const turns = 10;
    console.log(`simulation run for ${games}, turns ${turns}`);
    for (let i = 0; i < games; i++) {
        //const deck = [...drawDeck];
        const deck = [...simpleDeck];
        const gameResult = runGame(deck, turns);
        //console.log(gameResult);
        gameResults.push(gameResult);
    }

    analyzeResults(gameResults, turns);
    return;
};


main();
