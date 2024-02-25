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
        <div className="memory__card__front">?</div>
      </div>
    </div>
  );
}