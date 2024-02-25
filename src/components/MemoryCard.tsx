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
    <div className="memory__card">
      <div className="memory__card__inner" onClick={onCardClick}>
        {(isFlipped && !isMatched) && (
          <div className="memory__card__back">
            <img src={image} alt="memory card" />
          </div>
        )}
        {isMatched && (
          <div className="memory__card__back__matched">
            <img src={image} alt="memory card" />
          </div>
        )}
        {(!isFlipped && !isMatched) && (
          <div className="memory__card__front">?</div>
        )}
      </div>
    </div>
  );
}