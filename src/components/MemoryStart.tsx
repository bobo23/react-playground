interface MemoryStartProps {
  startGame: () => void;
}

export default function MemoryStart({ startGame }: MemoryStartProps) {
  return (
    <div className="memory-start">
      <p>Start a new game!</p>
      <form>
        <input type="text" placeholder="Player 1" />
        <input type="text" placeholder="Player 2" />
        <button type="submit" onClick={startGame}>Start</button>
      </form>
    </div>
  );
}