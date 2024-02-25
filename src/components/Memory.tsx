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
  const [points, setPoints] = useState<number>(0);

  function handleCardClick(cardId: number) {
    const cardsCopy = [...cards];
    const clickedCardIndex = cardsCopy.findIndex((card) => card.cardId === cardId);

    if (cardsCopy[clickedCardIndex].isFlipped || cardsCopy[clickedCardIndex].isMatched) {
      return;
    }

    cardsCopy[clickedCardIndex].isFlipped = true;

    if (isSecondFlip) {
      checkIfCardsMatch(cardsCopy, clickedCardIndex);
      return;
    }
    
    setFirstFlippedCardIndex(clickedCardIndex);
    setIsSecondFlip(true);
    setCards(cardsCopy);
  }

  function checkIfCardsMatch(cardsCopy: Card[], secondFlippedCardIndex: number) {
    if (cardsCopy[firstFlippedCardIndex!].image === cardsCopy[secondFlippedCardIndex].image) {
      cardsCopy[firstFlippedCardIndex!].isMatched = true;
      cardsCopy[secondFlippedCardIndex].isMatched = true;

      setPoints(points + 1);
    } else {
      cardsCopy[firstFlippedCardIndex!].isFlipped = false;
      cardsCopy[secondFlippedCardIndex].isFlipped = false;
    }

    setIsSecondFlip(false);
    setCards(cardsCopy);
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