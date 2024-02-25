import MemoryCard from './MemoryCard';
import memoryCards from '../data/memoryCards';

export default function Memory() {
  const cards = memoryCards(16);
  console.log(cards);

  return (
    <div className="memory">
      <h2>Memory</h2>
      <div className="memory__board">
        {cards.map((card) => (
          <MemoryCard key={card.cardId} />
        ))}
      </div>
    </div>
  );
}