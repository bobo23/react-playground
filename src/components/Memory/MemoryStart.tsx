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
      return;
    } else {
      setIsErrorPlayerOne(false);
    }
    if (!playerTwo) {
      setIsErrorPlayerTwo(true);
      return;
    } else {
      setIsErrorPlayerTwo(false);
    }

    startGame(playerOne, playerTwo);
  };

  return (
    <div className="memory-start">
      <p>Start a new game!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name..."
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
          className={isErrorPlayerOne ? 'memory-error' : ''}
          maxLength={15}
        />
        <input
          type="text"
          placeholder="Enter Name..."
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
          className={isErrorPlayerTwo ? 'memory-error' : ''}
          maxLength={15}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}