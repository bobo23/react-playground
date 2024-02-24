

export default function Memory() {
  const cards = [...Array(16).keys()];

  return (
    <div className="memory">
      <h2>Memory</h2>
      <div className="memory__board">
        {cards.map((card) => (
          <div key={card} className="memory__card">
            <div className="memory__card__inner">
              <div className="memory__card__front">?</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}