interface MemoryCardProps {
  onCardClick: () => void;
  image: string;
  isFlipped: boolean;
  ownedBy: string | undefined;
}

export default function MemoryCard({ 
  onCardClick,
  image,
  isFlipped,
  ownedBy
}: MemoryCardProps) {
  return (
    <div className={`memory-card ${isFlipped ? 'flipped' : ''} ${ownedBy ? 'matched' : ''}`}>
      <div className="memory-card-inner" onClick={onCardClick}>
        <div className="memory-card-front">
          <img src="./src/assets/memory/nfl.webp"/>
        </div>
        <div className="memory-card-back">
          <img src={image}  className={ownedBy}/>
        </div>
      </div>
    </div>
  );
}