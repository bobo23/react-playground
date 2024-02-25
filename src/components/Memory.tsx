import { useState } from 'react';
import MemoryCard from './MemoryCard';
import memoryCards from '../data/memoryCardsData';

interface Card {
  cardId: number;
  isFlipped: boolean;
  isMatched: boolean;
  image: string;
}

export default function Memory() {
  const loadedCards = memoryCards(16);
  const [cards, setCards] = useState<Card[]>(loadedCards);
  const [isSecondFlip , setIsSecondFlip] = useState<boolean>(false);
  const [firstFlippedCardIndex, setFirstFlippedCardIndex] = useState<number | null>(null);
  const [secondFlippedCardIndex, setSecondFlippedCardIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);

  function handleCardClick(cardId: number) {
    const cardsCopy = [...cards];
    const clickedCardIndex = cardsCopy.findIndex((card) => card.cardId === cardId);

    if (!clickedCardIndex || cards[clickedCardIndex].isFlipped || cards[clickedCardIndex].isMatched) {
      return;
    }

    cardsCopy[clickedCardIndex].isFlipped = true;

    if (isSecondFlip) {
      setSecondFlippedCardIndex(clickedCardIndex);
      checkIfCardsMatch(cardsCopy);
      return;
    }
    console.log('after first flip: ', cardsCopy);
    setFirstFlippedCardIndex(clickedCardIndex);
    setIsSecondFlip(true);
    setCards(cardsCopy);
  }

  function checkIfCardsMatch(cardsCopy: Card[]) {
    if (cardsCopy[firstFlippedCardIndex!].image === cardsCopy[secondFlippedCardIndex!].image) {
      cardsCopy[firstFlippedCardIndex!].isMatched = true;
      cardsCopy[secondFlippedCardIndex!].isMatched = true;

      setPoints(points + 1);
      console.log('after match: ', cardsCopy, points);
    } else {
      cardsCopy[firstFlippedCardIndex!].isFlipped = false;
      cardsCopy[secondFlippedCardIndex!].isFlipped = false;
    }

    setIsSecondFlip(false);
    setCards(cardsCopy);
    console.log('after second flip: ', cardsCopy)
  }

  return (
    <div className="memory">
      <h2>Memory</h2>
      <div className="memory__board">
        {cards.map((card) => (
          <MemoryCard
            key={card.cardId}
            image={card.image}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onCardClick={() => handleCardClick(card.cardId)}
          />
        ))}
      </div>
    </div>
  );
}