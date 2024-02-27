import { useState } from 'react';

interface MemoryStartProps {
  startGame: (playerOne: string, playerTwo: string) => void;
}

export default function MemoryStart({ startGame }: MemoryStartProps) {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startGame(playerOne, playerTwo);
  };

  return (
    <div className="memory-start">
      <p>Start a new game!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Player 1" value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} />
        <input type="text" placeholder="Player 2" value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}