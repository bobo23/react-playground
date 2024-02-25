import MemoryCard from './MemoryCard';

export default function Memory() {
  const cards = [...Array(16).keys()];

  return (
    <div className="memory">
      <h2>Memory</h2>
      <div className="memory__board">
        {cards.map((card) => (
          <MemoryCard key={card} />
        ))}
      </div>
    </div>
  );
}