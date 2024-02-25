export default function memoryCards (count: number) {
    const cards = [...Array(count).keys()].map((index) => ({
        cardId: index,
        isFlipped: false,
        isMatched: false,
        // add every image twice
        image: `./src/assets/memory/${Math.floor(index / 2)}.png`
    }));

    return cards.sort(() => Math.random() - 0.5);
};