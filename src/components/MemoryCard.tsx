interface MemoryCardProps {
  onCardClick: () => void;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryCard({ 
  onCardClick,
  image,
  isFlipped,
  isMatched
}: MemoryCardProps) {
  return (
    <div className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}>
      <div className="memory-card-inner" onClick={onCardClick}>
        <div className="memory-card-front">
          <img src="./src/assets/memory/nfl.webp"/>
        </div>
        <div className="memory-card-back">
          <img src={image}/>
        </div>
      </div>
    </div>
  );
}