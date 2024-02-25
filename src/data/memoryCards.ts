export default function memoryCards (count: number) {
    const cards = [...Array(count).keys()].map((index) => ({
        cardId: index,
        isFlipped: false,
        image: `./assets/memory/${Math.floor(index / 2)}.png`
    }));

    return cards.sort(() => Math.random() - 0.5);
};