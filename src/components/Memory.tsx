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
  const [isCheckingMatch, setIsCheckingMatch] = useState<boolean>(false);
  const [firstFlippedCardIndex, setFirstFlippedCardIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);

  function handleCardClick(cardId: number) {
    const cardsCopy = [...cards];
    const clickedCardIndex = cardsCopy.findIndex((card) => card.cardId === cardId);

    if (cardsCopy[clickedCardIndex].isFlipped || cardsCopy[clickedCardIndex].isMatched || isCheckingMatch) {
      return;
    }

    cardsCopy[clickedCardIndex].isFlipped = true;

    if (isSecondFlip) {
      setIsCheckingMatch(true);
      checkIfCardsMatch(cardsCopy, clickedCardIndex);
      return;
    }
    
    setFirstFlippedCardIndex(clickedCardIndex);
    setIsSecondFlip(true);
    setCards(cardsCopy);
  }

  function checkIfCardsMatch(cardsCopy: Card[], secondFlippedCardIndex: number) {
    if (firstFlippedCardIndex == null) return;

    if (cardsCopy[firstFlippedCardIndex].image === cardsCopy[secondFlippedCardIndex].image) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[firstFlippedCardIndex].isMatched = true;
        newCards[secondFlippedCardIndex].isMatched = true;
        return newCards;
      });

      setPoints((prevPoints) => prevPoints + 1);
      setIsCheckingMatch(false);
    } else {
      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[firstFlippedCardIndex].isFlipped = false;
          newCards[secondFlippedCardIndex].isFlipped = false;
          return newCards;
        });
        setIsCheckingMatch(false);
      }, 2000);
    }

    setIsSecondFlip(false);
  }

  return (
    <div className="memory">
      <h2>Memory</h2>
      <div className="memory-board">
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