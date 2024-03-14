import { useState, useEffect, useCallback } from 'react';
import memoryCards from '../../data/memoryCardsData';
import Layout from '../Layout';
import MemoryCard from './MemoryCard';
import MemoryStart from './MemoryStart';
import './Memory.css';

interface Card {
  cardId: number;
  isFlipped: boolean;
  image: string;
  ownedBy: string | undefined;
}

export default function Memory() {
  const loadedCards = memoryCards(16);
  const [cards, setCards] = useState<Card[]>(loadedCards);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isSecondFlip , setIsSecondFlip] = useState<boolean>(false);
  const [isCheckingMatch, setIsCheckingMatch] = useState<boolean>(false);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [firstFlippedCardIndex, setFirstFlippedCardIndex] = useState<number | null>(null);
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [playerOnePoints, setPlayerOnePoints] = useState<number>(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState<number>(0);

  useEffect(() => {
    if(cards.every((card) => card.ownedBy !== undefined)) {
      setIsGameOver(true);
    }
  }, [cards]);

  function handleGameOver() {
    if (playerOnePoints === playerTwoPoints) {
      return <p>It's a tie!</p>;
    }
    if (playerOnePoints > playerTwoPoints) {
      return <p className="winner-player-one">{playerOne} wins!</p>;
    }

    return <p className="winner-player-two">{playerTwo} wins!</p>;
  }

  const handleStartGame = useCallback((playerOneName: string, playerTwoName: string) => {
    setPlayerOne(playerOneName);
    setPlayerTwo(playerTwoName);
    setIsGameStarted(true);
  }, []);

  const handleMatch = useCallback((secondFlippedCardIndex: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];

      newCards[firstFlippedCardIndex!].ownedBy = isPlayerOneTurn ? 'player-one' : 'player-two';
      newCards[secondFlippedCardIndex].ownedBy = isPlayerOneTurn ? 'player-one' : 'player-two';

      return newCards;
    });

    if (isPlayerOneTurn) setPlayerOnePoints((prevPoints) => prevPoints + 1);
    else setPlayerTwoPoints((prevPoints) => prevPoints + 1);
    
    setIsCheckingMatch(false);
  }, [firstFlippedCardIndex, isPlayerOneTurn]);

  const handleNoMatch = useCallback((secondFlippedCardIndex: number) => {
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[firstFlippedCardIndex!].isFlipped = false;
        newCards[secondFlippedCardIndex].isFlipped = false;
        return newCards;
      });

      setIsPlayerOneTurn((prevTurn) => !prevTurn);
      setIsCheckingMatch(false);
    }, 2000);
  }, [firstFlippedCardIndex]);

  const checkIfCardsMatch = useCallback((cardsCopy: Card[], secondFlippedCardIndex: number) => {
    if (firstFlippedCardIndex == null) return;

    if (cardsCopy[firstFlippedCardIndex].image === cardsCopy[secondFlippedCardIndex].image) {
      handleMatch(secondFlippedCardIndex);
    } else {
      handleNoMatch(secondFlippedCardIndex);
    }

    setIsSecondFlip(false);
  }, [firstFlippedCardIndex, handleMatch, handleNoMatch]);

  const handleCardClick = useCallback((cardId: number) => {
    const cardsCopy = [...cards];
    const clickedCardIndex = cardsCopy.findIndex((card) => card.cardId === cardId);

    if (cardsCopy[clickedCardIndex].isFlipped || cardsCopy[clickedCardIndex].ownedBy || isCheckingMatch) {
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
  }, [cards, isCheckingMatch, isSecondFlip, checkIfCardsMatch]);

  function resetGame() {
    setCards(memoryCards(16));
    setPlayerOnePoints(0);
    setPlayerTwoPoints(0);
    setIsSecondFlip(false);
    setIsCheckingMatch(false);
    setFirstFlippedCardIndex(null);
    setIsPlayerOneTurn(true);
    setIsGameOver(false);
  }

  function resetFullGame() {
    setCards(memoryCards(16));
    setPlayerOnePoints(0);
    setPlayerTwoPoints(0);
    setIsGameStarted(false);
    setIsSecondFlip(false);
    setIsCheckingMatch(false);
    setFirstFlippedCardIndex(null);
    setIsPlayerOneTurn(true);
    setIsGameOver(false);
    setPlayerOne('');
    setPlayerTwo('');
  }

  return (
    <Layout>
      <div className="memory">
        <h2>Memory</h2>
        {!isGameStarted ? (
          <MemoryStart startGame={handleStartGame}/>
        ) : (
          <div className="memory-container">
            <div className="memory-info">
              <p className={`memory-player ${isPlayerOneTurn ? 'turn-player-one' : ''}`}>{playerOne}: 
                <span>{playerOnePoints}</span> 
                point{playerOnePoints === 0 || playerOnePoints > 1 ? 's' : ''}
              </p>
              <p className={`memory-player ${!isPlayerOneTurn ? 'turn-player-two' : ''}`}>{playerTwo}: 
                <span>{playerTwoPoints}</span> 
                point{playerTwoPoints === 0 || playerTwoPoints > 1 ? 's' : ''}
              </p>
            </div>
            <div className="memory-board">
              {cards.map((card) => (
                <MemoryCard
                  key={card.cardId}
                  image={card.image}
                  isFlipped={card.isFlipped}
                  ownedBy={card.ownedBy}
                  onCardClick={() => handleCardClick(card.cardId)}
                />
              ))}
            </div>
            <div className="memory-over">
              {isGameOver && (
                <div className="memory-winner">
                  {handleGameOver()}
                  <button onClick={resetGame}>New Game</button>
                  <button onClick={resetFullGame}>New Players</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}