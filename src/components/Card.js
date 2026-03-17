export default function Card({ card, isFlipped, isMatched, onClick }) {
  const Icon = card.icon;

  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center rounded-xl cursor-pointer transition transform 
      ${isFlipped || isMatched ? "bg-white" : "bg-purple-500 hover:scale-110"}
      `}
    >
      {(isFlipped || isMatched) && (
        <Icon className={`text-2xl ${card.color}`} />
      )}
    </div>
  );
}