import { useState } from 'react';

interface MemoryStartProps {
  startGame: (playerOne: string, playerTwo: string) => void;
}

export default function MemoryStart({ startGame }: MemoryStartProps) {
  const [playerOne, setPlayerOne] = useState<string>('');
  const [playerTwo, setPlayerTwo] = useState<string>('');
  const [isErrorPlayerOne, setIsErrorPlayerOne] = useState<boolean>(false);
  const [isErrorPlayerTwo, setIsErrorPlayerTwo] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!playerOne) {
      setIsErrorPlayerOne(true);
    } else {
      setIsErrorPlayerOne(false);
    }
    if (!playerTwo) {
      setIsErrorPlayerTwo(true);
    } else {
      setIsErrorPlayerTwo(false);
    }
    if (!playerOne || !playerTwo) {
      return;
    }

    startGame(playerOne, playerTwo);
  };

  return (
    <div className="memory-start">
      <p>Start a new game!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player 1"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
          className={isErrorPlayerOne ? 'memory-error' : ''}
        />
        <input
          type="text"
          placeholder="Player 2"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
          className={isErrorPlayerTwo ? 'memory-error' : ''}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}