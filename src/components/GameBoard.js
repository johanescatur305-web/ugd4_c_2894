import Card from "./Card";

export default function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedCards.includes(card.pairId)}
          onClick={() => onFlip(index)}
        />
      ))}
    </div>
  );
}